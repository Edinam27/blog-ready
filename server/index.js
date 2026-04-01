import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import fetch from 'node-fetch'; // Needed for IndexNow

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Global middleware to handle preflight and CORS explicitly
app.use((req, res, next) => {
  const allowedOrigins = ['https://mordernblog.com', 'https://www.mordernblog.com', 'http://localhost:8080'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
});

// Configure CORS using the package as a fallback
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://mordernblog.com', 'https://www.mordernblog.com'] 
    : '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// In production on Vercel, static files are served by Vercel's CDN.
// In local dev, Vite serves the frontend. 
// We only serve uploads locally if needed.
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
}

// IndexNow configuration
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'blog-ready-indexnow-key-12345';
const HOSTNAME = process.env.HOST_URL || 'https://mordernblog.com';

// Serve the IndexNow key file dynamically
app.get(`/${INDEXNOW_KEY}.txt`, (req, res) => {
  res.type('text/plain').send(INDEXNOW_KEY);
});

async function notifyIndexNow(urlList) {
  if (!Array.isArray(urlList)) urlList = [urlList];
  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOSTNAME.replace(/^https?:\/\//, ''),
        key: INDEXNOW_KEY,
        keyLocation: `${HOSTNAME}/${INDEXNOW_KEY}.txt`,
        urlList: urlList.map(u => `${HOSTNAME}${u}`)
      })
    });
    if (response.ok) {
      console.log(`✅ IndexNow notification sent for ${urlList.length} URLs`);
    } else {
      console.error(`❌ IndexNow error: ${response.status} - ${await response.text()}`);
    }
  } catch (error) {
    console.error('❌ Failed to notify IndexNow:', error);
  }
}

let sql;
if (process.env.DATABASE_URL) {
  try {
    sql = neon(process.env.DATABASE_URL);
  } catch (e) {
    console.error("Failed to initialize Neon database connection:", e);
  }
} else {
  console.warn("DATABASE_URL is not defined. API will run in degraded mode without database access.");
}

// Auto-migrate: create posts table if not exists
async function migrate() {
  if (!sql) return;
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
      social_links JSONB DEFAULT '{}'::jsonb,
      location TEXT,
      website TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  `;
  
  // Add columns if they don't exist (for existing tables)
  try {
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS photo_url TEXT`;
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}'::jsonb`;
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS location TEXT`;
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS website TEXT`;
  } catch (e) {
    console.warn('Migration warning: could not alter users table', e);
  }

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
    author: { id: '', name: row.author_name, avatar: row.author_photo },
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
  res.json({ ok: true, database: !!sql });
});

app.get('/api/posts', async (req, res) => {
  try {
    if (!sql) throw new Error('No database connection');
    const rows = await sql`
      SELECT p.*, c.id as category_id, c.name as category_name, c.slug as category_slug, u.photo_url as author_photo
      FROM posts p
      LEFT JOIN categories c ON p.category_slug = c.slug
      LEFT JOIN users u ON p.author_name = u.name
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
    if (!sql) throw new Error('No database connection');
    const { slug } = req.params;
    const rows = await sql`
      SELECT p.*, c.id as category_id, c.name as category_name, c.slug as category_slug, u.photo_url as author_photo
      FROM posts p
      LEFT JOIN categories c ON p.category_slug = c.slug
      LEFT JOIN users u ON p.author_name = u.name
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
    if (!sql) throw new Error('No database connection');
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
    
    // Notify Bing IndexNow about the new post
    if (inserted[0]) {
      notifyIndexNow([`/blog/${inserted[0].slug}`]);
    }
    
    res.status(201).json(mapRow(inserted[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Update post by slug
app.patch('/api/posts/:slug', async (req, res) => {
  try {
    if (!sql) throw new Error('No database connection');
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
    
    // Notify Bing IndexNow about the updated post
    notifyIndexNow([`/blog/${rows[0].slug}`]);
    
    res.json(mapRow(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

app.delete('/api/posts/:slug', async (req, res) => {
  try {
    if (!sql) throw new Error('No database connection');
    const { slug } = req.params;
    const rows = await sql`
      DELETE FROM posts
      WHERE slug = ${slug}
      RETURNING *
    `;
    if (rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    
    // Notify Bing IndexNow about the removed post
    notifyIndexNow([`/blog/${slug}`]);
    
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Categories routes
app.get('/api/categories', async (req, res) => {
  try {
    if (!sql) throw new Error('No database connection');
    const rows = await sql`SELECT * FROM categories ORDER BY name ASC`;
    res.json(rows.map(c => ({ id: c.id, name: c.name, slug: c.slug })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    if (!sql) throw new Error('No database connection');
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
    if (!sql) throw new Error('No database connection');
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

app.delete('/api/categories/:id', async (req, res) => {
  try {
    if (!sql) throw new Error('No database connection');
    const { id } = req.params;
    const rows = await sql`DELETE FROM categories WHERE id = ${id} RETURNING id`;
    if (rows.length === 0) return res.status(404).json({ error: 'Category not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// Users routes
app.get('/api/users', async (req, res) => {
  try {
    if (!sql) throw new Error('No database connection');
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

app.get('/api/users/:id', async (req, res) => {
  try {
    if (!sql) throw new Error('No database connection');
    const { id } = req.params;
    const rows = await sql`SELECT * FROM users WHERE id = ${id}`;
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    const u = rows[0];
    res.json({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      photoUrl: u.photo_url || null,
      bio: u.bio || null,
      socialLinks: u.social_links || {},
      location: u.location || null,
      website: u.website || null,
      createdAt: u.created_at
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    if (!sql) throw new Error('No database connection');
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
    if (!sql) throw new Error('No database connection');
    const { id } = req.params;
    const { name, email, role, photoUrl, bio, socialLinks, location, website } = req.body;

    // Build dynamic update set
    const fields = [];
    const values = [];
    if (name !== undefined) { fields.push('name'); values.push(name); }
    if (email !== undefined) { fields.push('email'); values.push(email); }
    if (role !== undefined) { fields.push('role'); values.push(role); }
    if (photoUrl !== undefined) { fields.push('photo_url'); values.push(photoUrl); }
    if (bio !== undefined) { fields.push('bio'); values.push(bio); }
    if (socialLinks !== undefined) { fields.push('social_links'); values.push(socialLinks); }
    if (location !== undefined) { fields.push('location'); values.push(location); }
    if (website !== undefined) { fields.push('website'); values.push(website); }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    // Construct SQL set fragment
    const setClauses = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
    const query = `UPDATE users SET ${setClauses} WHERE id = $${fields.length + 1} RETURNING *`;
    const rows = await sql(query, ...values, id);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    const u = rows[0];
    res.json({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      photoUrl: u.photo_url || null,
      bio: u.bio || null,
      socialLinks: u.social_links || {},
      location: u.location || null,
      website: u.website || null,
      createdAt: u.created_at
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.get(['/api/sitemap.xml', '/sitemap.xml'], async (req, res) => {
  try {
    // Force the production URL for sitemap generation
    const baseUrl = 'https://mordernblog.com';
    
    // Static routes
    const staticRoutes = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/resources', priority: '0.8', changefreq: 'weekly' },
      { url: '/admin/login', priority: '0.1', changefreq: 'monthly' }
    ];

    const staticUrls = staticRoutes.map(route => `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('');
    
    let postUrls = '';
    let categoryUrls = '';

    if (sql) {
      // Fetch posts
      const postRows = await sql`SELECT slug, date FROM posts ORDER BY date DESC`;
      postUrls = postRows.map(r => `
  <url>
    <loc>${baseUrl}/blog/${r.slug}</loc>
    <lastmod>${new Date(r.date).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

      // Fetch categories
      const categoryRows = await sql`SELECT slug FROM categories`;
      categoryUrls = categoryRows.map(r => `
  <url>
    <loc>${baseUrl}/category/${r.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('');
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}${categoryUrls}${postUrls}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating sitemap');
  }
});

app.post('/api/upload-image', async (req, res) => {
  try {
    const { filename, data } = req.body || {};
    if (!filename || !data) return res.status(400).json({ error: 'filename and data are required' });
    const dir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const safe = filename.replace(/[^a-zA-Z0-9._-]/g, '');
    const stamp = Date.now();
    const out = path.join(dir, `${stamp}-${safe}`);
    const base64 = data.split(',').pop();
    const buff = Buffer.from(base64, 'base64');
    fs.writeFileSync(out, buff);
    const url = `/uploads/${stamp}-${safe}`;
    res.status(201).json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// 404 handler for API routes
app.use((req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

const port = process.env.API_PORT || 3001;

// Only listen if not running in Vercel (Vercel exports the app)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
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
}

export default app;
