const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  suite('Integration tests with chai-http', function () {
    test('Convert 10L to gal', function (done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: '10L' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          assert.equal(
            res.body.string,
            '10 liters converts to 2.64172 gallons'
          );
          done();
        });
    });

    test('Convert 32g to lbs', function (done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: '32g' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, undefined);
          assert.equal(res.body.initUnit, undefined);
          assert.equal(res.body.returnNum, undefined);
          assert.equal(res.body.returnUnit, undefined);
          assert.equal(
            res.body.string,
            '32 grams converts to 0.0705479 pounds'
          );
          done();
        });
    });

    test('Convert 3/7.2/4kg to lbs', function (done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: '3/7.2/4kg' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 'invalid number');
          assert.equal(res.body.initUnit, 'kg');
          assert.equal(res.body.returnNum, 'invalid number');
          assert.equal(res.body.returnUnit, 'invalid unit');
          assert.equal(res.body.string, 'invalid number and unit');
          done();
        });
    });

    test('Convert 3/7.2/4kilomegagram to lbs', function (done) {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: '3/7.2/4kilomegagram' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 'invalid number');
          assert.equal(res.body.initUnit, 'kilomegagram');
          assert.equal(res.body.returnNum, 'invalid number');
          assert.equal(res.body.returnUnit, 'invalid unit');
          assert.equal(res.body.string, 'invalid number and unit');
          done();
        });
    });
  });
});
