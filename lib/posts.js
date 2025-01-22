import sql from "better-sqlite3";

const db = sql('blog.db');

export async function getPosts() {
  return db.prepare('SELECT * FROM posts').all();
}
