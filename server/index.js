import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set in environment');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

// Auto-migrate: create posts table if not exists
async function migrate() {
  // Ensure pgcrypto is available for gen_random_uuid()
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto;`;
  } catch (e) {
    console.warn('Warning: could not create pgcrypto extension (may already exist or lack permissions). Proceeding...');
  }
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT,
      content TEXT,
      cover_image TEXT,
      images JSONB DEFAULT '[]'::jsonb,
      date TIMESTAMP WITH TIME ZONE DEFAULT now(),
      author_name TEXT,
      category_slug TEXT,
      tags TEXT[] DEFAULT ARRAY[]::TEXT[],
      is_trending BOOLEAN DEFAULT false,
      is_featured BOOLEAN DEFAULT false,
      read_time INTEGER DEFAULT 0,
      views INTEGER DEFAULT 0
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('admin','editor','author')),
      photo_url TEXT,
      bio TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL
    );
  `;
}

// Helpers
function mapRow(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image,
    images: Array.isArray(row.images) ? row.images : [],
    date: row.date,
    author: { id: '', name: row.author_name },
    category: {
      id: row.category_id || '',
      name: row.category_name || row.category_slug || '',
      slug: row.category_slug || '',
    },
    tags: row.tags || [],
    isTrending: row.is_trending,
    isFeatured: row.is_featured,
    readTime: row.read_time,
    views: row.views,
  };
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/api/posts', async (req, res) => {
  try {
    const rows = await sql`
      SELECT p.*, c.id as category_id, c.name as category_name, c.slug as category_slug
      FROM posts p
      LEFT JOIN categories c ON p.category_slug = c.slug
      ORDER BY p.date DESC
    `;
    res.json(rows.map(mapRow));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.get('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const rows = await sql`
      SELECT p.*, c.id as category_id, c.name as category_name, c.slug as category_slug
      FROM posts p
      LEFT JOIN categories c ON p.category_slug = c.slug
      WHERE p.slug = ${slug}
      LIMIT 1
    `;
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(mapRow(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      images = [],
      date,
      authorName,
      categorySlug,
      tags = [],
      isTrending = false,
      isFeatured = false,
      readTime = 0,
    } = req.body;

    const inserted = await sql`
      INSERT INTO posts (
        title, slug, excerpt, content, cover_image, images, date, author_name, category_slug, tags, is_trending, is_featured, read_time
      ) VALUES (
        ${title}, ${slug}, ${excerpt}, ${content}, ${coverImage}, ${JSON.stringify(images)}, ${date || new Date()}, ${authorName}, ${categorySlug}, ${tags}, ${isTrending}, ${isFeatured}, ${readTime}
      ) RETURNING *
    `;
    res.status(201).json(mapRow(inserted[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Update post by slug
app.patch('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    // Normalize incoming fields; use null for unchanged values so COALESCE preserves existing data
    const b = req.body || {};
    const title = b.title ?? null;
    const excerpt = b.excerpt ?? null;
    const content = b.content ?? null;
    const coverImage = b.coverImage ?? null;
    const imagesJson = b.images === undefined ? null : JSON.stringify(b.images || []);
    const authorName = b.authorName ?? null;
    const categorySlug = b.categorySlug ?? null;
    const tagsParam = b.tags === undefined ? null : (Array.isArray(b.tags) ? b.tags : []);
    const isTrending = b.isTrending ?? null;
    const isFeatured = b.isFeatured ?? null;
    const readTime = b.readTime ?? null;

    const rows = await sql`
      UPDATE posts SET
        title = COALESCE(${title}, title),
        excerpt = COALESCE(${excerpt}, excerpt),
        content = COALESCE(${content}, content),
        cover_image = COALESCE(${coverImage}, cover_image),
        images = COALESCE(${imagesJson}::jsonb, images),
        author_name = COALESCE(${authorName}, author_name),
        category_slug = COALESCE(${categorySlug}, category_slug),
        tags = COALESCE(${tagsParam}::text[], tags),
        is_trending = COALESCE(${isTrending}, is_trending),
        is_featured = COALESCE(${isFeatured}, is_featured),
        read_time = COALESCE(${readTime}, read_time)
      WHERE slug = ${slug}
      RETURNING *
    `;
    if (rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.json(mapRow(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

app.delete('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const rows = await sql`
      DELETE FROM posts
      WHERE slug = ${slug}
      RETURNING *
    `;
    if (rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Categories routes
app.get('/api/categories', async (req, res) => {
  try {
    const rows = await sql`SELECT * FROM categories ORDER BY name ASC`;
    res.json(rows.map(c => ({ id: c.id, name: c.name, slug: c.slug })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { name, slug } = req.body;
    if (!name || !slug) return res.status(400).json({ error: 'name and slug are required' });
    const inserted = await sql`INSERT INTO categories (name, slug) VALUES (${name}, ${slug}) RETURNING *`;
    const c = inserted[0];
    res.status(201).json({ id: c.id, name: c.name, slug: c.slug });
  } catch (err) {
    console.error(err);
    if (err && err.code === '23505') {
      return res.status(409).json({ error: 'Category slug already exists' });
    }
    res.status(500).json({ error: 'Failed to create category' });
  }
});

app.patch('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;
    const fields = [];
    const values = [];
    if (name !== undefined) { fields.push('name'); values.push(name); }
    if (slug !== undefined) { fields.push('slug'); values.push(slug); }
    if (fields.length === 0) return res.status(400).json({ error: 'No fields to update' });
    const setClauses = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
    const query = `UPDATE categories SET ${setClauses} WHERE id = $${fields.length + 1} RETURNING *`;
    const rows = await sql(query, ...values, id);
    if (rows.length === 0) return res.status(404).json({ error: 'Category not found' });
    const c = rows[0];
    res.json({ id: c.id, name: c.name, slug: c.slug });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Users routes
app.get('/api/users', async (req, res) => {
  try {
    const rows = await sql`SELECT * FROM users ORDER BY created_at DESC`;
    res.json(rows.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      photoUrl: u.photo_url || null,
      bio: u.bio || null,
      createdAt: u.created_at,
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email || !role) {
      return res.status(400).json({ error: 'name, email, and role are required' });
    }
    const inserted = await sql`
      INSERT INTO users (name, email, role) VALUES (${name}, ${email}, ${role}) RETURNING *
    `;
    const u = inserted[0];
    res.status(201).json({ id: u.id, name: u.name, email: u.email, role: u.role, createdAt: u.created_at });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update user profile
app.patch('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, photoUrl, bio } = req.body;

    // Build dynamic update set
    const fields = [];
    const values = [];
    if (name !== undefined) { fields.push('name'); values.push(name); }
    if (email !== undefined) { fields.push('email'); values.push(email); }
    if (role !== undefined) { fields.push('role'); values.push(role); }
    if (photoUrl !== undefined) { fields.push('photo_url'); values.push(photoUrl); }
    if (bio !== undefined) { fields.push('bio'); values.push(bio); }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    // Construct SQL set fragment
    const setClauses = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
    const query = `UPDATE users SET ${setClauses} WHERE id = $${fields.length + 1} RETURNING *`;
    const rows = await sql(query, ...values, id);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    const u = rows[0];
    res.json({ id: u.id, name: u.name, email: u.email, role: u.role, photoUrl: u.photo_url || null, bio: u.bio || null, createdAt: u.created_at });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = process.env.BASE_URL || 'http://localhost:8080';
    
    // Fetch posts
    const postRows = await sql`SELECT slug, date FROM posts ORDER BY date DESC`;
    const postUrls = postRows.map(r => `
  <url>
    <loc>${baseUrl}/blog/${r.slug}</loc>
    <lastmod>${new Date(r.date).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

    // Fetch categories
    const categoryRows = await sql`SELECT slug FROM categories`;
    const categoryUrls = categoryRows.map(r => `
  <url>
    <loc>${baseUrl}/category/${r.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>${categoryUrls}${postUrls}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating sitemap');
  }
});

const port = process.env.API_PORT || 3001;

migrate()
  .then(() => {
    console.log('Migration complete. Starting server...');
    app.listen(port, () => {
      console.log(`API server listening on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Migration failed', err);
    process.exit(1);
  });