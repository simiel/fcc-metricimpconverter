const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  suite('Function convertHandler.getNum(input)', function () {
    test('Whole number input', function () {
      assert.equal(convertHandler.getNum('32L'), 32);
    });
    test('Decimal number input', function () {
      assert.equal(convertHandler.getNum('32.5L'), 32.5);
    });
    test('Fractional input', function () {
      assert.equal(convertHandler.getNum('1/2L'), 0.5);
    });
    test('Fractional input with decimal', function () {
      assert.equal(convertHandler.getNum('1.5/2L'), 0.75);
    });
    test('Invalid input (double fraction)', function () {
      assert.equal(convertHandler.getNum('1/2/3L'), 'invalid number');
    });
    test('No number input', function () {
      assert.equal(convertHandler.getNum('L'), 1);
    });
  });

  suite('Function convertHandler.getUnit(input)', function () {
    test('For each valid unit inputs', function () {
      assert.equal(convertHandler.getUnit('32L'), 'L');
      assert.equal(convertHandler.getUnit('32gal'), 'gal');
      assert.equal(convertHandler.getUnit('32mi'), 'mi');
      assert.equal(convertHandler.getUnit('32km'), 'km');
      assert.equal(convertHandler.getUnit('32lbs'), 'lbs');
      assert.equal(convertHandler.getUnit('32kg'), 'kg');
    });
    test('Invalid unit input', function () {
      assert.equal(convertHandler.getUnit('32invalid'), 'invalid unit');
    });
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function () {
    test('For each valid unit inputs', function () {
      assert.equal(convertHandler.getReturnUnit('L'), 'gal');
      assert.equal(convertHandler.getReturnUnit('gal'), 'L');
      assert.equal(convertHandler.getReturnUnit('mi'), 'km');
      assert.equal(convertHandler.getReturnUnit('km'), 'mi');
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    });
    test('Invalid unit input', function () {
      assert.equal(convertHandler.getReturnUnit('invalid'), 'invalid unit');
    });
  });

  suite('Function convertHandler.spellOutUnit(unit)', function () {
    test('For each valid unit inputs', function () {
      assert.equal(convertHandler.spellOutUnit('L'), 'liters');
      assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
      assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
      assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
      assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
      assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    });
  });
});
