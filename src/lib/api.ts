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
  // Always return local data to ensure new posts are visible
  return posts;
}

export async function fetchPostBySlug(slug: string): Promise<Post> {
  const local = getPostBySlug(slug);
  if (!local) throw new Error('Not found');
  return local;
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
  // Always return local data to ensure new categories are visible
  return localCategories.map(c => ({ id: c.slug, name: c.name, slug: c.slug }));
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

