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
      let puzzleString = res.body.puzzle;
      console.log(puzzleString);
      //solver.validate()
    });
};
