const { VirtualConsole } = require("jsdom");

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
    puzzleString = puzzleString.split("");

    let puzzleObject = {};
    let puzzleBoard = {};

    let len = puzzleString.length;
    for (let i = 0; i < len; i++) {
      let rowLetter = String.fromCharCode('A'.charCodeAt(0) + Math.floor(i / 9));
      let col = (i % 9) + 1; 

      if (puzzleString[i] == '.') {
        puzzleString[i] = '0';
      }

      if (typeof(puzzleString[i]) == "string") {
        puzzleString[i] = puzzleString[i] * 1;
      }

      puzzleObject[rowLetter + col] = puzzleString[i];
      if (Object.keys(puzzleObject).length == 9) {
        puzzleBoard[rowLetter] = puzzleObject;
        puzzleObject = {};
      }
    }

    if (puzzleBoard[row].hasOwnProperty(row + column)) {
        let rowValues = Object.values(puzzleBoard[row]);
        if (!rowValues.includes(Number(value))) {
          return true;
        }else if (rowValues.includes(Number(value)) && puzzleBoard[row][row + column] == value) {
          return true;
        }else {
          return false;
        }
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    puzzleString = puzzleString.split("");

    let puzzleObject = {};
    let puzzleBoard = {};

    let len = puzzleString.length;
    for (let i = 0; i < len; i++) {
      let rowLetter = String.fromCharCode('A'.charCodeAt(0) + Math.floor(i / 9));
      let col = (i % 9) + 1; 

      if (puzzleString[i] == '.') {
        puzzleString[i] = '0';
      }

      if (typeof(puzzleString[i]) == "string") {
        puzzleString[i] = puzzleString[i] * 1;
      }

      puzzleObject[rowLetter + col] = puzzleString[i];
      if (Object.keys(puzzleObject).length == 9) {
        puzzleBoard[rowLetter] = puzzleObject;
        puzzleObject = {};
      }
    }

    let columnCollector = [];
    let columns = [];

    for (let j = 1; j <= 9; j++) {
      for (let i = 0; i < 9; i++) {
        let rowLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
        columnCollector.push(puzzleBoard[rowLetter[i]][rowLetter[i] + j]);
        if (columnCollector.length == 9) {
          columns.push(columnCollector);
          columnCollector = [];
        }
      }
    }
    
    let columnString = columns.join("").split(",").join("").split("");

      let puzzleObjects = {};
      let columnBoard = {};
      
      let length = columnString.length;
    for (let i = 0; i < length; i++) {
      let rowLetter = String.fromCharCode('A'.charCodeAt(0) + Math.floor(i / 9));
      let col = (i % 9) + 1; 

      if (typeof(columnString[i]) == "string") {
        columnString[i] = columnString[i] * 1;
      }

      puzzleObjects[rowLetter + col] = columnString[i];
      if (Object.keys(puzzleObjects).length == 9) {
        columnBoard[rowLetter] = puzzleObjects;
        puzzleObjects = {};
      }
    }

    if (columnBoard[row].hasOwnProperty(row + column)) {
        let rowValues = Object.values(columnBoard[row]);
        if (!rowValues.includes(Number(value))) {
          return true;
        }else if (rowValues.includes(Number(value)) && columnBoard[row][row + column] == value) {
          return true;
        }else {
          return false;
        }
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    puzzleString = puzzleString.replace(/[.]/g, 0); // replaces the dots(.) with 0.
    puzzleString = puzzleString.split("") // converts the string to array of string. 

    puzzleString = puzzleString.map(number => {
      return Number(number);
    });

    //TO SPLIT the puzzleString TO REGION OF 9.
    let regionPartCollector = [];
    let regionPart = [];

    puzzleString.forEach(numbers => {
      regionPartCollector.push(numbers);

      if (regionPartCollector.length == 3) {
        regionPart.push(regionPartCollector.join(""));
        regionPartCollector = [];
      }
    });
    
      function regionOneToThree(regionPart) {
        let region = [];
        let sum = 0;
        let num = []
        num.push(regionPart[0])
        for (let i = 0; i < 8; i++) {
          num.push(regionPart[sum = sum + 3])
          if (num.length == 3) {
            region.push(num.join());
            num = [];
          }
        }
        let region1To3 = [region[0], region[1], region[2]]
        return region1To3;
      }

      function regionFourToSix(regionPart) {
        let region = [];
        let sum = 1;
        let num = []
        num.push(regionPart[1])
        for (let i = 0; i < 8; i++) {
          num.push(regionPart[sum = sum + 3])
          if (num.length == 3) {
            region.push(num.join());
            num = [];
          }
        }
        let region4To6 = [region[0], region[1], region[2]]
        return region4To6;
      }

      function regionSevenToNine(regionPart) {
        let region = [];
        let sum = 2;
        let num = []
        num.push(regionPart[2])
        for (let i = 0; i < 8; i++) {
          num.push(regionPart[sum = sum + 3])
          if (num.length == 3) {
            region.push(num.join());
            num = [];
          }
        }
        let region7To9 = [region[0], region[1], region[2]];
        return region7To9;
      }
      let regions = [regionOneToThree(regionPart), regionFourToSix(regionPart), regionSevenToNine(regionPart)];
      let region = [regions[0][0], regions[1][0], regions[2][0], regions[0][1], regions[1][1], regions[2][1], regions[0][2], regions[1][2], regions[2][2]];
      //--------------------------------------
      let regionString = region.join("").split(",").join("");
      regionString = regionString.split("");

      let puzzleObject = {};
      let regionBoard = {};
      
      let len = regionString.length;
    for (let i = 0; i < len; i++) {
      let rowLetter = String.fromCharCode('A'.charCodeAt(0) + Math.floor(i / 9));
      let col = (i % 9) + 1; 

      if (typeof(regionString[i]) == "string") {
        regionString[i] = regionString[i] * 1;
      }

      puzzleObject[rowLetter + col] = regionString[i];
      if (Object.keys(puzzleObject).length == 9) {
        regionBoard[rowLetter] = puzzleObject;
        puzzleObject = {};
      }
    }

    if (regionBoard[row].hasOwnProperty(row + column)) {
        let rowValues = Object.values(regionBoard[row]);
        if (!rowValues.includes(Number(value))) {
          return true;
        }else if (rowValues.includes(Number(value)) && regionBoard[row][row + column] == value) {
          return true;
        }else {
          return false;
        }
      
    }
  }

  solve(puzzleString) {
    let puzzlePattern = puzzleString.split("");
    
    let puzzlePatterntoNum = puzzlePattern.map(number => {
      if (number == ".") {
        number = '0';
      }
      return Number(number);
    });

    //TO SPLIT the puzzleString TO BOARD OF 9.
    let rowCollector = [];
    let board = [];
    puzzlePatterntoNum.forEach(numbers => {
      rowCollector.push(numbers);
      if (rowCollector.length == 9) {
        board.push(rowCollector);
        rowCollector = [];
      }
    });
    //--------------------------------------
    function nextEmptySpot(board) {
      for (var i = 0; i < 9; i++) {
          for (var j = 0; j < 9; j++) {
              if (board[i][j] === 0) 
                  return [i, j];
          }
      }
      return [-1, -1];
  }
  function checkRow(board, row, value){
    for(var i = 0; i < board[row].length; i++) {
        if(board[row][i] === value) {
            return false;
        }
    }
   
    return true;
}
function checkColumn(board, column, value){
  for(var i = 0; i < board.length; i++) {
      if(board[i][column] === value) {
          return false;
      }
  }

  return true;
};
function checkSquare(board, row, column, value){
  let boxRow = Math.floor(row / 3) * 3;
  let boxCol = Math.floor(column / 3) * 3;
  
  for (var r = 0; r < 3; r++){
      for (var c = 0; c < 3; c++){
          if (board[boxRow + r][boxCol + c] === value)
              return false;
      }
  }

  return true;
};
function checkValue(board, row, column, value) {
  if(checkRow(board, row, value) &&
    checkColumn(board, column, value) &&
    checkSquare(board, row, column, value)) {
      return true;
  }
  
  return false; 
};
function solve(board) {  
  let emptySpot = nextEmptySpot(board);
  let row = emptySpot[0];
  let col = emptySpot[1];

  // there is no more empty spots
  if (row === -1){
      return board;
  }

  for(let num = 1; num<=9; num++){
      if (checkValue(board, row, col, num)){
          board[row][col] = num;
          solve(board);
      }
  }

  if (nextEmptySpot(board)[0] !== -1)
      board[row][col] = 0;

  return board;
}

  let solution = solve(board)
  solution = solution.join().split(",").join("");

  if (solution.includes(0)) {
    return 'Puzzle cannot be solved';
  }else {
    return solution;
  }

  }
}

module.exports = SudokuSolver;

