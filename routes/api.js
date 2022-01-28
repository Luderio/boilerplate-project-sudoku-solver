'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const { response } = require("../server");


module.exports = function (app) {
  
  // solver method comes from /controllers/sudoku-solver.js
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let puzzleString = req.body.puzzle;
      let coordinate = req.body.coordinate;
      let value = req.body.value;

      solver.validate(puzzleString);
      let validate = solver.validate(puzzleString);

      let validCoordinate = [];//contains valid coordinates.

      let len = 81;
      for (let i = 0; i < len; i++) {
        let rowLetter = String.fromCharCode('A'.charCodeAt(0) + Math.floor(i / 9));
        let col = (i % 9) + 1; 
        validCoordinate.push(rowLetter + col);
      }

      if (!validCoordinate.includes(coordinate)) {
        return res.json({ error: 'Invalid coordinate'});
      }

      if (value < 1 || value > 9) {
        return res.json({ error: 'Invalid value' });
      }


      if (validate == 'Invalid characters in puzzle') {
        return res.json({error: 'Invalid characters in puzzle'});
      }

      if (validate == 'Expected puzzle to be 81 characters long') {
        return res.json({error: 'Expected puzzle to be 81 characters long'});
      }

      if (validate == 'Required field missing' || coordinate == '' || value == '') {
        return res.json({error: 'Required field(s) missing'});
      }

      
    });
    
    app.route('/api/solve')
    .post((req, res) => {
      let puzzleString = req.body.puzzle;

      solver.validate(puzzleString);

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
