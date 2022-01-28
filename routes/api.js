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

      solver.validate(puzzleString);
      solver.solve(puzzleString);

      let validate = solver.validate(puzzleString);

      if (validate == 'Required field missing') {
      return res.json({error: 'Required field missing'});
    }

    if (validate == 'Invalid characters in puzzle') {
      return res.json({error: 'Invalid characters in puzzle'});
    }

    if (validate == 'Expected puzzle to be 81 characters long') {
      return res.json({error: 'Expected puzzle to be 81 characters long'});
    }

    solver.solve(puzzleString);

      let SolutionString = solver.solve(puzzleString);

      if (SolutionString == 'Puzzle cannot be solved') {
        return res.json({ error: 'Puzzle cannot be solved' });
      }else {
        return res.json({solution: SolutionString});
      }

    });
};
