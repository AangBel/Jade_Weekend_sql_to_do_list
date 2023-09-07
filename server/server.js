require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("server/public"));

let taskRouter = require("./public/task-router");
app.use("/tasks", taskRouter);

app.post("/tasks", (req, res) => {
  console.log("we are inside the post ");

  let taskAttempt = req.body;
  console.log("this should be the taskAttempt:", taskAttempt);

  console.log("task to send:", taskAttempt);
  console.log("req.body:", req.body);
});

//=====================================================
// app.js
const postgres = require('postgres');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const sql = postgres(URL, { ssl: 'require' });

async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

getPgVersion();



const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`You started the server! It is running on ${PORT} .`);
});
