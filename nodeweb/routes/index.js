const express = require('express');

const router = express.Router();

// Do work here
// (req, res) => {callback function}
router.get('/', (req, res) => {
  res.json('Hey! It works!');
});

// getting parameters from the route
router.get('/reverse/:name', (req, res) => {
  // using those paremeters (ES6 sintax for the array?)
  const reverse = [...req.params.name].reverse().join('');
  res.send(reverse);
});

module.exports = router;
