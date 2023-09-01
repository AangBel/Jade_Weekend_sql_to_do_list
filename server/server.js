const express = require("express");
const app = express();
app.use(express.static("server/public"));
// Routes go here
const pool = require("./public/pool");



app.get("/tasks", (req, res) => {
  console.log("we are inside the get request");
  let queryText = 'SELECT * FROM "tasks";'

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});

app.post("/tasks", (req, res) => {
  console.log("we are inside the post ");
//   let taskInput= req.body.task;

  let taskInput= req.body;
console.log('this should be the taskinput:', taskInput);

//   let taskToSend = req.body;
  console.log("task to send:", taskInput);
  console.log("req.body:", req.body);

  const queryText = `
            INSERT INTO "tasks" (task)
            VALUES ($1)
            `;

  console.log("The query we're sending to postico:", queryText);

  pool.query(queryText, [taskInput])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});

let port = 5001;
app.listen(5001, function () {
  console.log(`You started the server! It is running on ${port} .`);
});
