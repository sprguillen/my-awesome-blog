"use server";
import { redirect } from 'next/navigation';
import db from '@/initdb';
import { slugify } from '@/utils';

export async function createPost(prevState, formData) {
  try {
    const title = formData.get("title");
    const excerpt = formData.get("excerpt");
    const content = formData.get("content");
    const author = formData.get("author");
    const publishedDate = formData.get("publishedDate");
    const errors = {};

    if (!title) {
      errors.title = "Please enter a title.";
    }

    const slug = slugify(title);

    const hasSlug = db.prepare('SELECT COUNT(*) as count FROM posts WHERE slug = ?').get(slug).count > 0;

    if (hasSlug) {
      errors.slug = 'Slug already exists. Enter a different one.'
    }

    if (!excerpt) {
      errors.excerpt = "Please enter an excerpt.";
    }

    if (!content) {
      errors.content = "Please add a content.";
    }

    if (!author) {
      errors.author = "Please enter an author.";
    }

    if (!publishedDate) {
      errors.publishedDate = "Please add a publish date.";
    }

    if (Object.keys(errors).length > 0) {
      return { errors };
    }

    const stmt = db.prepare(`
      INSERT INTO posts (
        title,
        slug,
        excerpt,
        content,
        author,
        published_date
      )
      VALUES (
        @title,
        @slug,
        @excerpt,
        @content,
        @author,
        @publishedDate
      )
    `);

    result = stmt.run({
      title,
      slug,
      excerpt,
      content,
      author,
      publishedDate,
    });

    redirect("/");
  } catch (error) {
    throw error;
  }
}

export async function editPost(prevState, formData) {
  try {
    const id = formData.get("id"); // Hidden input for post ID
    const title = formData.get("title");
    const excerpt = formData.get("excerpt");
    const content = formData.get("content");
    const author = formData.get("author");
    const publishedDate = formData.get("publishedDate");
    const errors = {};

    // Validate required fields
    if (!id) {
      errors.id = "Post ID is missing.";
    }

    if (!title) {
      errors.title = "Please enter a title.";
    }

    if (!excerpt) {
      errors.excerpt = "Please enter an excerpt.";
    }

    if (!content) {
      errors.content = "Please add content.";
    }

    if (!author) {
      errors.author = "Please enter an author.";
    }

    if (!publishedDate) {
      errors.publishedDate = "Please add a publish date.";
    }

    // If there are validation errors, return them
    if (Object.keys(errors).length > 0) {
      return { errors };
    }

    // Fetch the existing post to compare the slug if the title has changed
    const existingPost = db.prepare('SELECT * FROM posts WHERE id = ?').get(id);

    if (!existingPost) {
      return { errors: { general: "Post not found." } };
    }

    let newSlug = existingPost.slug;

    if (title !== existingPost.title) {
      newSlug = slugify(title);

      const hasSlug = db.prepare('SELECT COUNT(*) as count FROM posts WHERE slug = ? AND id != ?').get(newSlug, id).count > 0;

      if (hasSlug) {
        errors.slug = 'Slug already exists. Enter a different one.';
      }
    }

    if (errors.slug) {
      return { errors };
    }

    const stmt = db.prepare(`
      UPDATE posts
      SET
        title = @title,
        slug = @slug,
        excerpt = @excerpt,
        content = @content,
        author = @author,
        published_date = @publishedDate
      WHERE id = @id
    `);

    stmt.run({
      id,
      title,
      slug: newSlug,
      excerpt,
      content,
      author,
      publishedDate,
    });

    redirect("/");
  } catch (error) {
    throw error;
  }
}