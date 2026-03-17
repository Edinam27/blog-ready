import { Post, posts, getPostBySlug, categories as localCategories } from "@/data/blogData";

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'author';
  photoUrl?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  location?: string;
  website?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

const BASE = "/api";

export async function fetchPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${BASE}/posts`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return await res.json();
  } catch (e) {
    console.error("API connection failed, using local data", e);
    return posts;
  }
}

export async function fetchPostBySlug(slug: string): Promise<Post> {
  try {
    const res = await fetch(`${BASE}/posts/${slug}`);
    if (res.status === 404) throw new Error('Not found');
    if (!res.ok) throw new Error('Failed to fetch post');
    return await res.json();
  } catch (e) {
    console.error(`API connection failed for post ${slug}, using local data`, e);
    const local = getPostBySlug(slug);
    if (!local) throw new Error('Not found');
    return local;
  }
}

export async function createPost(payload: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  images?: string[];
  date?: string;
  authorName?: string;
  categorySlug?: string;
  tags?: string[];
  isTrending?: boolean;
  isFeatured?: boolean;
  readTime?: number;
}): Promise<Post> {
  try {
    const res = await fetch(`${BASE}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create post');
    return await res.json();
  } catch (e) {
    console.warn("API connection failed, simulating post creation locally", e);
    // Simulate creation locally
    const newPost: Post = {
      id: Math.random().toString(36).substring(7),
      title: payload.title,
      slug: payload.slug,
      excerpt: payload.excerpt,
      content: payload.content,
      coverImage: payload.coverImage || '',
      date: payload.date || new Date().toISOString().split('T')[0],
      author: { id: '1', name: payload.authorName || 'Admin' },
      category: localCategories.find(c => c.slug === payload.categorySlug) || localCategories[0],
      tags: payload.tags || [],
      isTrending: payload.isTrending || false,
      isFeatured: payload.isFeatured || false,
      readTime: payload.readTime || 5,
      views: 0
    };
    posts.unshift(newPost);
    return newPost;
  }
}

export async function updatePost(slug: string, payload: Partial<{
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  images: string[];
  authorName: string;
  categorySlug: string;
  tags: string[];
  isTrending: boolean;
  isFeatured: boolean;
  readTime: number;
}>): Promise<Post> {
  try {
    const res = await fetch(`${BASE}/posts/${slug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    if (res.status === 404) {
      // Upsert: create the post if it doesn't exist yet in the DB
      const createPayload = {
        title: payload.title || slug,
        slug,
        excerpt: payload.excerpt || '',
        content: payload.content || '',
        coverImage: payload.coverImage,
        images: payload.images,
        authorName: payload.authorName,
        categorySlug: payload.categorySlug,
        tags: payload.tags,
        isTrending: payload.isTrending,
        isFeatured: payload.isFeatured,
        readTime: payload.readTime,
      } as any;
      return await createPost(createPayload);
    }
    
    if (!res.ok) throw new Error('Failed to update post');
    return await res.json();
  } catch (e) {
    console.warn(`API connection failed for post ${slug}, simulating update locally`, e);
    // Simulate update locally
    const existingIndex = posts.findIndex(p => p.slug === slug);
    if (existingIndex >= 0) {
      const existing = posts[existingIndex];
      const updatedPost = {
        ...existing,
        ...payload,
        category: payload.categorySlug 
          ? (localCategories.find(c => c.slug === payload.categorySlug) || existing.category)
          : existing.category,
        author: payload.authorName 
          ? { ...existing.author, name: payload.authorName }
          : existing.author
      };
      posts[existingIndex] = updatedPost;
      return updatedPost;
    }
    
    // If not found locally, simulate creation
    const createPayload = {
      title: payload.title || slug,
      slug,
      excerpt: payload.excerpt || '',
      content: payload.content || '',
      ...payload
    } as any;
    return await createPost(createPayload);
  }
}

export async function deletePost(slug: string): Promise<void> {
  try {
    const res = await fetch(`${BASE}/posts/${slug}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete post');
  } catch (e) {
    console.warn(`API connection failed for post ${slug}, simulating deletion locally`, e);
    const index = posts.findIndex(p => p.slug === slug);
    if (index >= 0) {
      posts.splice(index, 1);
    }
  }
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${BASE}/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`${BASE}/users/${id}`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

export async function createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  const res = await fetch(`${BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User> {
  const res = await fetch(`${BASE}/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update user');
  return res.json();
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${BASE}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return await res.json();
  } catch (e) {
    console.error("API connection failed, using local categories", e);
    return localCategories.map(c => ({ id: c.slug, name: c.name, slug: c.slug }));
  }
}

export async function createCategory(payload: { name: string; slug: string; }): Promise<Category> {
  const res = await fetch(`${BASE}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create category');
  return res.json();
}

export async function updateCategory(id: string, payload: Partial<{ name: string; slug: string; }>): Promise<Category> {
  const res = await fetch(`${BASE}/categories/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update category');
  return res.json();
}

