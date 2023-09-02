const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("server/public"));

let taskRouter = require("./public/task-router");
app.use("/tasks", taskRouter);

app.get("/tasks", (req, res) => {
  console.log("we are inside the get request");
});

app.post("/tasks", (req, res) => {
  console.log("we are inside the post ");

  let taskAttempt = req.body;
  console.log("this should be the taskAttempt:", taskAttempt);

  console.log("task to send:", taskAttempt);
  console.log("req.body:", req.body);
});

let port = 5001;
app.listen(5001, function () {
  console.log(`You started the server! It is running on ${port} .`);
});
