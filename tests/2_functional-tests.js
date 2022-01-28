const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    suite('Routing Test - POST request to /api/solve', function() {

        //Test 1: Solve a puzzle with valid puzzle string: POST request to /api/solve.
        test('Solve a puzzle with valid puzzle string', function(done) {
            let inputString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            chai.request(server)
                .post('/api/solve')
                .send({'puzzle': inputString})
                .end(function(error, response) {
                    assert.equal(response.status, 200);
                    assert.isObject(response.body);
                    assert.property(response.body, 'solution');
                    done();
                });
        });

        //Test 2: Solve a puzzle with missing puzzle string: POST request to /api/solve.
        test('Solve a puzzle with missing puzzle string', function(done) {
            chai.request(server)
                .post('/api/solve')
                .send({})
                .end(function(error, response) {
                    assert.equal(response.status, 200);
                    assert.isObject(response.body);
                    assert.equal(response.body.error, "Required field missing");
                    done();
                });
        });

        //Test 3: Solve a puzzle with invalid characters: POST request to /api/solve.
        test('Solve a puzzle with invalid characters', function(done) {
            let inputString = 'g.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            chai.request(server)
                .post('/api/solve')
                .send({'puzzle': inputString})
                .end(function(error, response) {
                    assert.equal(response.status, 200);
                    assert.isObject(response.body);
                    assert.equal(response.body.error, 'Invalid characters in puzzle');
                    done();
                });
        });

        //Test 4: Solve a puzzle with incorrect length: POST request to /api/solve.
        test('Solve a puzzle with incorrect length (80 characters)', function(done) {
            let inputString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.';
            chai.request(server)
                .post('/api/solve')
                .send({'puzzle': inputString})
                .end(function(error, response) {
                    assert.equal(response.status, 200);
                    assert.isObject(response.body);
                    assert.equal(response.body.error, 'Expected puzzle to be 81 characters long');
                    done();
                });
        });
        
        //Test 4.1: Solve a puzzle with incorrect length: POST request to /api/solve.
        test('Solve a puzzle with incorrect length (82 characters)', function(done) {
            let inputString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...';
            chai.request(server)
                .post('/api/solve')
                .send({'puzzle': inputString})
                .end(function(error, response) {
                    assert.equal(response.status, 200);
                    assert.isObject(response.body);
                    assert.equal(response.body.error, 'Expected puzzle to be 81 characters long');
                    done();
                });
        });

        // Test 5: Solve a puzzle that cannot be solved: POST request to /api/solve.
        test('Solve a puzzle that cannot be solved', function(done) {
            let inputString = '1.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            chai.request(server)
                .post('/api/solve')
                .send({'puzzle': inputString})
                .end(function(error, response) {
                    assert.equal(response.status, 200);
                    assert.isObject(response.body);
                    assert.equal(response.body.error, 'Puzzle cannot be solved');
                    done();
                });
        });


    });
});

