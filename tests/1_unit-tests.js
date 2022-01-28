const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', function() {
    suite('Routing Tests', function() {
        
        //Test 1: Logic handles a valid puzzle string of 81 characters.
        test('String should be 81 characters long', function(done) {
            let inputString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            assert.equal(solver.solve(inputString).length, 81);
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

        //Test 3.1: Logic handles a puzzle string that is not 81 characters in length.
        test('String not equal to 81 characters (82 characters)', function(done) {
            let inputString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...';
            assert.equal(solver.validate(inputString), 'Expected puzzle to be 81 characters long');
            done();
        });

    });
});