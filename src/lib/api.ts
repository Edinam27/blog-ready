import { Post, posts, getPostBySlug, categories as localCategories } from "@/data/blogData";

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'author';
  photoUrl?: string | null;
  bio?: string | null;
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
    // Fallback to local sample data during development or when backend is unavailable
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
  try {
    const res = await fetch(`${BASE}/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return await res.json();
  } catch (e) {
    // Fallback to empty list when backend is unavailable in development
    return [];
  }
}

export async function createUser(payload: { name: string; email: string; role: User['role']; }): Promise<User> {
  const res = await fetch(`${BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${BASE}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return await res.json();
  } catch (e) {
    // Fallback to local sample categories
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

export async function updateUser(id: string, payload: Partial<{
  name: string;
  email: string;
  role: User['role'];
  photoUrl: string | null;
  bio: string | null;
}>): Promise<User> {
  const res = await fetch(`${BASE}/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update user');
  return res.json();
}