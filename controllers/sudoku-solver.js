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

    return true;

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
        if (rowValues.includes(Number(value)) && puzzleBoard[row][row + column] == value) {
          return true;
        }else if (rowValues.includes(Number(value)) && puzzleBoard[row][row + column] !== value) {
          return false;
        }else if (rowValues.includes(Number(value)) == false) {
          return true;
        }else {
          return false;
        }
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    puzzleString = puzzleString.split("");

    let puzzleObject = {};

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
    }

    let columns = {};
    let finalColumn = {};
    let num = 1;
    

    function columnLooper() {

      for (let j = 1; j <=9; j++) {
        for (let i = 0; i < 9; i++) {
          let rowLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    
          columns[rowLetter[i] + num] = puzzleObject[rowLetter[i] + num];
        }
      }
    }

    columnLooper();

    for (let j = 0; j < 9; j++) {
      if (Object.keys(columns).length == 9) {
        finalColumn["column" + num] = columns;
        columns = {};
        num = num + 1;
        columnLooper();
      }
    }

    //console.log(finalColumn);

    if (finalColumn["column" + column].hasOwnProperty(row + column)) {
      let columnValues = Object.values(finalColumn["column" + column]);

      if (columnValues.includes(Number(value)) && finalColumn["column" + column][row + column] == value) {
        return true;
      }else if (columnValues.includes(Number(value)) && finalColumn["column" + column][row + column] !== value) {
        return false
      }else if (!columnValues.includes(Number(value))) {
        return true
      }else {
        return false;
      }
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    puzzleString = puzzleString.split("");

    let puzzleObject = {};
    let regionBoard = {};

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
        regionBoard[rowLetter] = puzzleObject;
        puzzleObject = {};
      }
    }

    let region = {

      region1: {
        A1: regionBoard.A.A1, 
        A2: regionBoard.A.A2, 
        A3: regionBoard.A.A3, 
        B1: regionBoard.B.B1, 
        B2: regionBoard.B.B2, 
        B3: regionBoard.B.B3, 
        C1: regionBoard.C.C1,
        C2: regionBoard.C.C2,
        C3: regionBoard.C.C3
      },
      region2: {
        A4: regionBoard.A.A4, 
        A5: regionBoard.A.A5, 
        A6: regionBoard.A.A6, 
        B4: regionBoard.B.B4, 
        B5: regionBoard.B.B5, 
        B6: regionBoard.B.B6, 
        C4: regionBoard.C.C4,
        C5: regionBoard.C.C5,
        C6: regionBoard.C.C6
      },
      region3: {
        A7: regionBoard.A.A7, 
        A8: regionBoard.A.A8, 
        A9: regionBoard.A.A9, 
        B7: regionBoard.B.B7, 
        B8: regionBoard.B.B8, 
        B9: regionBoard.B.B9, 
        C7: regionBoard.C.C7,
        C8: regionBoard.C.C8,
        C9: regionBoard.C.C9
      },
      region4: {
        D1: regionBoard.D.D1, 
        D2: regionBoard.D.D2, 
        D3: regionBoard.D.D3, 
        E1: regionBoard.E.E1, 
        E2: regionBoard.E.E2, 
        E3: regionBoard.E.E3, 
        F1: regionBoard.F.F1,
        F2: regionBoard.F.F2,
        F3: regionBoard.F.F3
      },
      region5: {
        D4: regionBoard.D.D4, 
        D5: regionBoard.D.D5, 
        D6: regionBoard.D.D6, 
        E4: regionBoard.E.E4, 
        E5: regionBoard.E.E5, 
        E6: regionBoard.E.E6, 
        F4: regionBoard.F.F4,
        F5: regionBoard.F.F5,
        F6: regionBoard.F.F6
      },
      region6: {
        D7: regionBoard.D.D7, 
        D8: regionBoard.D.D8, 
        D9: regionBoard.D.D9, 
        E7: regionBoard.E.E7, 
        E8: regionBoard.E.E8, 
        E9: regionBoard.E.E9, 
        F7: regionBoard.F.F7,
        F8: regionBoard.F.F8,
        F9: regionBoard.F.F9
      },
      region7: {
        G1: regionBoard.G.G1, 
        G2: regionBoard.G.G2, 
        G3: regionBoard.G.G3, 
        H1: regionBoard.H.H1, 
        H2: regionBoard.H.H2, 
        H3: regionBoard.H.H3, 
        I1: regionBoard.I.I1,
        I2: regionBoard.I.I2,
        I3: regionBoard.I.I3
      },
      region8: {
        G4: regionBoard.G.G4, 
        G5: regionBoard.G.G5, 
        G6: regionBoard.G.G6, 
        H4: regionBoard.H.H4, 
        H5: regionBoard.H.H5, 
        H6: regionBoard.H.H6, 
        I4: regionBoard.I.I4,
        I5: regionBoard.I.I5,
        I6: regionBoard.I.I6
      },
      region9: {
        G7: regionBoard.G.G7, 
        G8: regionBoard.G.G8, 
        G9: regionBoard.G.G9, 
        H7: regionBoard.H.H7, 
        H8: regionBoard.H.H8, 
        H9: regionBoard.H.H9, 
        I7: regionBoard.I.I7,
        I8: regionBoard.I.I8,
        I9: regionBoard.I.I9
      }

    };

    //console.log(region);

    let coordinate = row + column;
    let regionValue;

    if (region.region1.hasOwnProperty(coordinate)) {
      regionValue = "region1";
    }else if (region.region2.hasOwnProperty(coordinate)) {
      regionValue = "region2";
    }else if (region.region3.hasOwnProperty(coordinate)) {
      regionValue = "region3";
    }else if (region.region4.hasOwnProperty(coordinate)) {
      regionValue = "region4";
    }else if (region.region5.hasOwnProperty(coordinate)) {
      regionValue = "region5";
    }else if (region.region6.hasOwnProperty(coordinate)) {
      regionValue = "region6";
    }else if (region.region7.hasOwnProperty(coordinate)) {
      regionValue = "region7";
    }else if (region.region8.hasOwnProperty(coordinate)) {
      regionValue = "region8";
    }else if (region.region9.hasOwnProperty(coordinate)) {
      regionValue = "region9";
    }

    if (region[regionValue].hasOwnProperty(row + column)) {
      let regionValues = Object.values(region[regionValue]);

      if (regionValues.includes(Number(value)) && region[regionValue][row + column] == value) {
        return true;
      }else if (regionValues.includes(Number(value)) && region[regionValue][row + column] !== value) {
        return false;
      }else if (!regionValues.includes(Number(value))) {
        return true
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

  let invalidCharacter = /[^\d.]/g;

  if (this.validate(solution) == 'Invalid characters in puzzle') {
    return 'Invalid characters in puzzle';
  }else if (solution.includes(0)) {
    return 'Puzzle cannot be solved';
  }else {
    return solution;
  }

  }
}

module.exports = SudokuSolver;

