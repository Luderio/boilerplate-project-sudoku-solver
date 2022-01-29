'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const { response } = require("../server");


module.exports = function (app) {
  
  // solver method comes from /controllers/sudoku-solver.js
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const {puzzle, coordinate, value} = req.body;

      solver.validate(puzzle);
      let validate = solver.validate(puzzle);

      let validCoordinate = [];//contains valid coordinates.
      let validValue = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      let len = 81;
      for (let i = 0; i < len; i++) {
        let rowLetter = String.fromCharCode('A'.charCodeAt(0) + Math.floor(i / 9));
        let col = (i % 9) + 1; 
        validCoordinate.push(rowLetter + col);
      }

      if (validate == 'Invalid characters in puzzle') {
        return res.json({error: 'Invalid characters in puzzle'});
      }

      if (validate == 'Expected puzzle to be 81 characters long') {
        return res.json({error: 'Expected puzzle to be 81 characters long'});
      }

      if (validate == 'Required field missing' || !coordinate || !value) {
        return res.json({error: 'Required field(s) missing'});
      }

      if (validCoordinate.includes(coordinate) == false) {
        return res.json({ error: 'Invalid coordinate'});
      }

      if (validValue.includes(Number(value)) == false) {
        return res.json({ error: 'Invalid value' });
      }

      const row = coordinate.split("")[0];
      const column = coordinate.split("")[1];

      let validRow = solver.checkRowPlacement(puzzle, row, column, value);
      let validColumn = solver.checkColPlacement(puzzle, row, column, value);
      let validRegion = solver.checkRegionPlacement(puzzle, row, column, value);

      let conflict = [];

      if (validRow && validColumn && validRegion) {
        return res.json({valid: true});
      }else {
        if (validRow == false) {
          conflict.push("row");
        }
        
        if (validColumn == false) {
          conflict.push("column");
        }
        
        if (validRegion == false) {
          conflict.push("region");
        }

        return res.json({valid: false, conflict: conflict});

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

        if (SolutionString == false) {
          return res.json({ error: 'Puzzle cannot be solved' });
        }else {
          return res.json({solution: SolutionString});
        }


    });
};
