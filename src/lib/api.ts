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

const BASE = import.meta.env.VITE_API_URL || "https://mordernblog.com/api";

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
  const res = await fetch(`${BASE}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
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
    const created = await createPost(createPayload);
    return created;
  }
  if (!res.ok) throw new Error('Failed to update post');
  return res.json();
}

export async function deletePost(slug: string): Promise<void> {
  const res = await fetch(`${BASE}/posts/${slug}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete post');
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

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function uploadImage(file: File): Promise<{ url: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const base64 = arrayBufferToBase64(arrayBuffer);
  const payload = {
    filename: file.name,
    data: `data:${file.type};base64,${base64}`,
  };
  const res = await fetch(`${BASE}/upload-image`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to upload image');
  return res.json();
}
