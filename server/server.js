const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("server/public"));

let taskRouter = require("./public/task-router");
app.use("/tasks", taskRouter);

// app.get("/tasks", (req, res) => {
//   console.log("we are inside the get request");
// });

app.post("/tasks", (req, res) => {
  console.log("we are inside the post ");

  let taskAttempt = req.body;
  console.log("this should be the taskAttempt:", taskAttempt);

  console.log("task to send:", taskAttempt);
  console.log("req.body:", req.body);
});


// app.put('/songs/rank/:id', (req, res) => {
//   let taskIdentification = req.params.id;
//   // Direction will come from the request body
//   // Expected to be up or down
//   let direction = req.body.direction;
//   let sqlText = '';

//   if (direction === 'up'){
//     // use rank-1, so it get's closer to the awesome rank of 1
//     sqlText = `UPDATE songs SET rank=rank-1 WHERE id=$1`;
//   } else if (direction == 'down'){
//     sqlText = `UPDATE songs SET rank=rank+1 WHERE id=$1`;
//   } else {
//     // If we don't get an expected direction, send back bad status
//     res.sendStatus(500);
//     return; // Do it now, don't run code below
//   }

//   pool.query(sqlText, [songId])
//     .then((dbResponse) => {
//       res.send(dbResponse.rows);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.sendStatus(500);
//     });
// });




let port = 5001;
app.listen(5001, function () {
  console.log(`You started the server! It is running on ${port} .`);
});
