const express = require('express');

const router = express.Router();
const storeController = require('../controllers/storeController');
// import only a functiuon of a module (ES6)
const { catchErrors } = require('../handlers/errorHandlers')

// (req, res) => {callback function}
// router.get('/', (req, res) => {
//   // res.json('Hey! It works!');
//   // Render a Pug template and pass parameters to it
//   res.render('hello', {
//     name: 'Carlos',
//     planet: 'Jupiter'
//   });
// });

// Do work here

// getting parameters from the route
router.get('/reverse/:name', (req, res) => {
  // using those paremeters (ES6 sintax for the array?)
  const reverse = [...req.params.name].reverse().join('');
  res.send(reverse);
});

// main route --> everything is done in the controller
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));
// : -> req.params
router.post('/add/:id', catchErrors(storeController.updateStore));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));

module.exports = router;
