const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
const dbPath = path.join(__dirname, "goodreads.db");
let db = null;

const initDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initDBAndServer();

app.get("/books/", async (Request, Response) => {
  console.log("making response...");
  const getBooksQuery = `
    SELECT * 
    FROM book
    ORDER BY book_id;`;
  const booksArray = await db.all(getBooksQuery);
  Response.send(booksArray);
  console.log("response sent...");
});

app.get("/books/book", async (Request, Response) => {
  console.log("making response...");
  const getBooksQuery = `
    SELECT title,rating,rating_count,description,edition_language,price
    FROM book
    ORDER BY book_id;`;
  const booksArray = await db.all(getBooksQuery);
  Response.send(booksArray);
  console.log("response sent...");
});

app.get("/authors", async (Request, Response) => {
  console.log("making response...");
  const getBooksQuery = `
    SELECT *
    FROM author;`;
  const booksArray = await db.all(getBooksQuery);
  Response.send(booksArray);
  console.log("response sent...");
});
