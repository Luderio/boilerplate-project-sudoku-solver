const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', function() {
    suite('Routing Tests', function() {
        
        //Test 1: Logic handles a valid puzzle string of 81 characters.
        test('String should be 81 characters long', function(done) {
            assert.equal(solver.solve.length, 81);
        });
    });
});
