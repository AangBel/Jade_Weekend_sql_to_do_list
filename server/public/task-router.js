const pool = require("./pool");
let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  let queryText = 'SELECT * FROM "tasks";';

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

router.post("/", (req, res) => {
  const taskAttempt = req.body;
  const queryText = `
  INSERT INTO tasks (task)
  VALUES ($1);
  `;

  console.log("The query we're sending to postico:", queryText);

  pool
    .query(queryText, [taskAttempt.task])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
