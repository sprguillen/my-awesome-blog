"use server";
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

    const result = stmt.run({
      title,
      slug,
      excerpt,
      content,
      author,
      publishedDate,
    });

    return {
      success: true,
      lastInsertRowId: result.lastInsertRowid,
    };
  } catch (error) {
    throw error;
  }
}