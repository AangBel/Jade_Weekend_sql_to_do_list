const express = require('express');
const app = express();
app.use(express.static('server/public'));
// Routes go here
let port = 5001;
app.listen(5001, function () {
console.log(`You started the server! It is running on ${port} .`);
})