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

      if (!puzzleString) {
      return res.json({error: 'Required field missing'});
    }

    let invalidCharacter = /[^\d.]/g;

    if (invalidCharacter.test(puzzleString)) {
      return res.json({error: 'Invalid characters in puzzle'});
    }

    if (puzzleString.length !== 81) {
      return res.json({error: 'Expected puzzle to be 81 characters long'});
    }
    
      let SolutionString = solver.solve(puzzleString);

      if (SolutionString) {
        return res.json({solution: SolutionString});
      }

      if (!SolutionString) {
        return res.json({ error: 'Puzzle cannot be solved' });
      }

    });
};
