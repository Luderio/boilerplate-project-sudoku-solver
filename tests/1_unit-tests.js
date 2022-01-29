const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', function() {
    suite('Routing Tests - Unit Tests', function() {
        
        //Test 1: Logic handles a valid puzzle string of 81 characters.
        test('String should be 81 characters long', function(done) {
            let inputString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.equal(solver.solve(inputString).length, 81);
            assert.equal(solver.validate(inputString), true);
            done();
        });

        //Test 2: Logic handles a puzzle string with invalid characters (not 1-9 or .)
        test('Invalid Characters', function(done) {
            let inputString = 'g.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.equal(solver.validate(inputString), 'Invalid characters in puzzle');
            done();
        });

        //Test 3: Logic handles a puzzle string that is not 81 characters in length.
        test('String not equal to 81 characters (80 characters)', function(done) {
            let inputString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.';
            assert.equal(solver.validate(inputString), 'Expected puzzle to be 81 characters long');
            done();
        });

        //TEST 4: Logic handles a valid row placement.
        test('Logic handles a valid row placement', function(done) {
            let puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            let row = 'A';
            let column = '1';
            let value = '7';
            assert.equal(solver.checkRowPlacement(puzzle, row, column, value), true);
            done();
        });

        //Test 5: Logic handles an invalid row placement.
        test('Logic handles an invalid row placement', function(done) {
            let puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            let row = 'A';
            let column = '1';
            let value = '1';
            assert.equal(solver.checkRowPlacement(puzzle, row, column, value), false);
            done();
        });

        //Test 6: Logic handles a valid column placement.
        test('Logic handles a valid column placement', function(done) {
            let puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            let row = 'A';
            let column = '1';
            let value = '7';
            assert.equal(solver.checkColPlacement(puzzle, row, column, value), true);
            done();
        });

        //Test 7: Logic handles an invalid column placement.
        test('Logic handles an invalid column placement', function(done) {
            let puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            let row = 'A';
            let column = '1';
            let value = '1';
            assert.equal(solver.checkColPlacement(puzzle, row, column, value), false);
            done();
        });

        //Test 8: Logic handles a valid region (3x3 grid) placement
        test('Logic handles a valid region (3x3 grid) placement', function(done) {
            let puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            let row = 'A';
            let column = '1';
            let value = '7';
            assert.equal(solver.checkRegionPlacement(puzzle, row, column, value), true);
            done();
        });

        //Test 9: Logic handles an invalid region (3x3 grid) placement
        test('Logic handles an invalid region (3x3 grid) placement', function(done) {
            let puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            let row = 'A';
            let column = '1';
            let value = '2';
            assert.equal(solver.checkRegionPlacement(puzzle, row, column, value), false);
            done();
        });

        //Test 10: Valid puzzle strings pass the solver.
        test('Valid puzzle strings pass the solver.', function(done) {
            let inputString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            assert.equal(solver.solve(inputString), '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
            done();
        });

        //Test 11: Invalid puzzle strings fail the solver.
        test('Invalid puzzle strings fail the solver.', function(done) {
            let inputString = '115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            assert.equal(solver.solve(inputString), 'Puzzle cannot be solved');
            done();
        });

        //Test 12: Solver returns the expected solution for an incomplete puzzle.
        test('Solver returns the expected solution for an incomplete puzzle', function(done) {
            let inputString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            assert.equal(solver.solve(inputString), '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
            done();
        });

    });
});