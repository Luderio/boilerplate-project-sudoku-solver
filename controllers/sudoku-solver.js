class SudokuSolver {

  validate(puzzleString) {

    if (!puzzleString) {
      return 'Required field missing';
    }

    let invalidCharacter = /[^\d.]/g;

    if (invalidCharacter.test(puzzleString)) {
      return 'Invalid characters in puzzle';
    }

    if (puzzleString.length !== 81) {
      return 'Expected puzzle to be 81 characters long';
    }
    
  }

  checkRowPlacement(puzzleString, row, column, value) {
    
  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

