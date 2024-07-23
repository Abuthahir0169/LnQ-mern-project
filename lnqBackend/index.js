import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2";

//config
dotenv.config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
    res.send("LOVE & QUEST");
    console.log("DB connected ");
});

//DB connection
const db = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function checkDbConnection() {
  try {
    await db.query("show databases");
    app.listen(process.env.PORT, () => {
      console.log(`Server started on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

checkDbConnection();
