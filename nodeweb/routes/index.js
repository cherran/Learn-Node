const express = require('express');

const router = express.Router();
const storeController = require('../controllers/storeController');

// Do work here
// (req, res) => {callback function}
// router.get('/', (req, res) => {
//   // res.json('Hey! It works!');
//   // Render a Pug template and pass parameters to it
//   res.render('hello', {
//     name: 'Carlos',
//     planet: 'Jupiter'
//   });
// });

// getting parameters from the route
router.get('/reverse/:name', (req, res) => {
  // using those paremeters (ES6 sintax for the array?)
  const reverse = [...req.params.name].reverse().join('');
  res.send(reverse);
});

// main route --> everything is done in the controller
router.get('/', storeController.myMiddleware, storeController.homePage);

module.exports = router;
