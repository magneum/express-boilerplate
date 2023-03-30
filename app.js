import express from "express";
import cors from "cors";
import { encrypt, decrypt } from "./hash.js";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

const app = express();
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join("views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dbPromise = open({
  filename: path.join("users.db"),
  driver: sqlite3.Database,
});

const db = await dbPromise;
await db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
)`);

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/error", (req, res) => {
  res.render("error");
});

app.get("/dashboard", (req, res) => {
  res.redirect("/dashboard");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  try {
    const db = await dbPromise;
    const user = await db.get(
      "SELECT * FROM users WHERE username = ?",
      username
    );

    if (!user) {
      return res.redirect("/register");
    }

    const decryptedPassword = decrypt(user.password);

    if (password !== decryptedPassword) {
      return res.redirect("/error");
    }

    const encryptedPassword = encrypt(password);

    await db.run(
      "UPDATE users SET password = ? WHERE username = ?",
      encryptedPassword,
      username
    );

    res.redirect("/dashboard");
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal server error");
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  try {
    const db = await dbPromise;

    const existingUser = await db.get(
      "SELECT * FROM users WHERE username = ?",
      username
    );

    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const encryptedPassword = encrypt(password);

    await db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      encryptedPassword,
    ]);

    res.redirect("/login");
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal server error");
  }
});

const PORT = process.env.PORT || 2344;

app.listen(PORT, () => {
  console.log(`Server started http://localhost:${PORT}`);
});
