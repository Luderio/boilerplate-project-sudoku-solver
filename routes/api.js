'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const { response } = require("../server");


module.exports = function (app) {
  
  // solver method comes from /controllers/sudoku-solver.js
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzleString = req.body.puzzle;

      let inputValidator = solver.validate(puzzleString);

      if (inputValidator === 'Required field missing') {
        res.json({error: 'Required field missing'});
      }else if (inputValidator === 'Invalid characters in puzzle') {
        res.json({error: 'Invalid characters in puzzle'});
      }else if (inputValidator === 'Expected puzzle to be 81 characters long') {
        res.json({error: 'Expected puzzle to be 81 characters long'});
      }else {
        solver.solve(puzzleString);
      }

    });
};
