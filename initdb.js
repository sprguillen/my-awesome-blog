const sql = require('better-sqlite3');
const bcrypt = require('bcrypt');
const db = sql('blog.db');

const saltRounds = 10;

const dummyPosts = [
  {
    slug: "nextjs-introduction",
    title: "Introduction to Next.js 13",
    excerpt: "Learn about the new App Router and how it simplifies your React projects.",
    content: `
      <p class="mb-4">This is a detailed blog post on Next.js 13...</p>
      <p class="mb-4">You can write HTML or use MDX in a real project.</p>
    `,
    author: "John Doe",
    published_date: "2025-01-01",
  },
  {
    slug: "react-server-components",
    title: "Understanding React Server Components",
    excerpt: "React Server Components can greatly reduce bundle size...",
    content: `
      <p class="mb-4">React Server Components allow you to...</p>
    `,
    author: "Jane Smith",
    published_date: "2025-01-05",
  },
]

const dummyUsers = [
  {
    id: 1,
    name: "Simon Admin",
    username: "admin",
    email: "simon.admin@gmail.com",
    password: bcrypt.hashSync("Test@123", saltRounds),
  }
];

db.prepare(`
  CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      author TEXT NOT NULL,
      published_date TEXT NOT NULL
   )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    password TEXT NOT NULL
  )
`).run();

async function initData() {
  const stmt = db.prepare(`
      INSERT INTO posts VALUES (
         null,
         @slug,
         @title,
         @excerpt,
         @content,
         @author,
         @published_date
      )
   `);

  for (const meal of dummyPosts) {
    stmt.run(meal);
  }

  const userStmt = db.prepare(`
    INSERT INTO users (
      id,
      name,
      username,
      email,
      password
    )
    VALUES (
      @id,
      @name,
      @username,
      @email,
      @password
    )
  `);

  for (const user of dummyUsers) {
    userStmt.run(user);
  }
}

initData();
