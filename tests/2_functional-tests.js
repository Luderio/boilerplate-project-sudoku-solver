const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let inputString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

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

    suite('Routing Test - POST request to /api/check', function() {

        //Test 6: Check a puzzle placement with all fields: POST request to /api/check.
        test('Check a puzzle placement with all fields', function(done) {
            chai.request(server)
            .post('/api/check')
            .send({
                'puzzle': inputString,
                'coordinate': 'A1',
                'value': '7'
            })
            .end(function(error, response) {
                assert.equal(response.status, 200);
                assert.isObject(response.body);
                assert.equal(response.body.valid, true);
                done();
            });
        });

        //Test 7: Check a puzzle placement with single placement conflict: POST request to /api/check.
        test('Check a puzzle placement with single placement conflict', function(done) {
            chai.request(server)
            .post('/api/check')
            .send({
                'puzzle': inputString,
                'coordinate': 'A4',
                'value': '3'
            })
            .end(function(error, response) {
                assert.equal(response.status, 200);
                assert.isObject(response.body);
                assert.equal(response.body.valid, false);
                assert.equal(response.body.conflict[0], 'column');
                done();
            });
        });

        //Test 8: Check a puzzle placement with multiple placement conflicts: POST request to /api/check.
        test('Check a puzzle placement with multiple placement conflicts', function(done) {
            chai.request(server)
            .post('/api/check')
            .send({
                'puzzle': inputString,
                'coordinate': 'A1',
                'value': '1'
            })
            .end(function(error, response) {
                assert.equal(response.status, 200);
                assert.isObject(response.body);
                assert.equal(response.body.valid, false);
                assert.equal(response.body.conflict[0], 'row');
                assert.equal(response.body.conflict[1], 'column');
                done();
            });
        });
        

        //Test 9: Check a puzzle placement with all placement conflicts: POST request to /api/check.
        test('Check a puzzle placement with all placement conflicts', function(done) {
            chai.request(server)
            .post('/api/check')
            .send({
                'puzzle': inputString,
                'coordinate': 'A1',
                'value': '5'
            })
            .end(function(error, response) {
                assert.equal(response.status, 200);
                assert.isObject(response.body);
                assert.equal(response.body.valid, false);
                assert.equal(response.body.conflict[0], 'row');
                assert.equal(response.body.conflict[1], 'column');
                assert.equal(response.body.conflict[2], 'region');
                done();
            });
        });
        

        //Test 10: Check a puzzle placement with missing required fields: POST request to /api/check.
        test('Check a puzzle placement with missing required fields: POST request to /api/check', function(done) {
            chai.request(server)
            .post('/api/check')
            .send({
                'puzzle': inputString,
                'coordinate': 'A1'
            })
            .end(function(error, response) {
                assert.equal(response.status, 200);
                assert.isObject(response.body);
                assert.equal(response.body.error, 'Required field(s) missing');
                done();
            });
        });
        

        //Test 11: Check a puzzle placement with invalid characters: POST request to /api/check.
        test('Check a puzzle placement with invalid characters', function(done) {
            let inputString = 'g.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            chai.request(server)
            .post('/api/check')
            .send({
                'puzzle': inputString,
                'coordinate': 'A1',
                'value': '7'
            })
            .end(function(error, response) {
                assert.equal(response.status, 200);
                assert.isObject(response.body);
                assert.equal(response.body.error, 'Invalid characters in puzzle');
                done();
            });
        });
        

        //Test 12: Check a puzzle placement with incorrect length: POST request to /api/check.
        test('Check a puzzle placement with incorrect length', function(done) {
            let inputString = '.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
            chai.request(server)
            .post('/api/check')
            .send({
                'puzzle': inputString,
                'coordinate': 'A1',
                'value': '7'
            })
            .end(function(error, response) {
                assert.equal(response.status, 200);
                assert.isObject(response.body);
                assert.equal(response.body.error, 'Expected puzzle to be 81 characters long');
                done();
            });
        });
        

        //Test 13: Check a puzzle placement with invalid placement coordinate: POST request to /api/check.
        test('Check a puzzle placement with invalid placement coordinate', function(done) {
            chai.request(server)
            .post('/api/check')
            .send({
                'puzzle': inputString,
                'coordinate': 'A11',
                'value': '7'
            })
            .end(function(error, response) {
                assert.equal(response.status, 200);
                assert.isObject(response.body);
                assert.equal(response.body.error, 'Invalid coordinate');
                done();
            });
        });
        

        //Test 14: Check a puzzle placement with invalid placement value: POST request to /api/check.
        test('Check a puzzle placement with invalid placement value', function(done) {
            chai.request(server)
            .post('/api/check')
            .send({
                'puzzle': inputString,
                'coordinate': 'A1',
                'value': '11'
            })
            .end(function(error, response) {
                assert.equal(response.status, 200);
                assert.isObject(response.body);
                assert.equal(response.body.error, 'Invalid value');
                done();
            });
        });
        

    });
});

