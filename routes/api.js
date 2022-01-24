'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const { response } = require("../server");


module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzleString = req.body.puzzle;

      if (!puzzleString) {
        res.json({error: 'Required field missing'});
      }

      let invalidCharacter = /[^\d.]/g;

      if (invalidCharacter.test(puzzleString)) {
        res.json({ error: 'Invalid characters in puzzle' });
      }

      if (puzzleString.length !== 81) {
        res.json({ error: 'Expected puzzle to be 81 characters long' });
      }

    });
};
