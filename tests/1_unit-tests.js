const { assert } = require('chai');
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  test('convertHandler should correctly read a whole number input', function () {
    const input = '32';
    assert.equal(convertHandler.getNum(input), 32);
  });

  test('convertHandler should correctly read a decimal number input', function () {
    const input = '32.5';
    assert.equal(convertHandler.getNum(input), 32.5);
  });

  test('convertHandler should correctly read a fractional input', function () {
    const input = '3/2';
    assert.equal(convertHandler.getNum(input), 1.5);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function () {
    const input = '3.5/2';
    assert.equal(convertHandler.getNum(input), 1.75);
  });

  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function () {
    const input = '3/2/3';
    assert.equal(convertHandler.getNum(input), 'invalid number');
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function () {
    const input = 'mi';
    assert.equal(convertHandler.getNum(input), 1);
  });

  test('convertHandler should correctly read each valid input unit', function () {
    const input = 'gal';
    assert.equal(convertHandler.getUnit(input), 'gal');
  });

  test('convertHandler should correctly return an error for an invalid input unit', function () {
    const input = 'invalid';
    assert.equal(convertHandler.getUnit(input), 'invalid unit');
  });

  test('convertHandler should return the correct return unit for each valid input unit', function () {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
  });

  test('convertHandler should correctly convert gal to L', function () {
    const input = [5, 'gal'];
    const expected = 18.9271;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      expected,
      0.1
    );
  });

  test('convertHandler should correctly convert L to gal', function () {
    const input = [18.9271, 'L'];
    const expected = 5;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      expected,
      0.1
    );
  });

  test('convertHandler should correctly convert mi to km', function () {
    const input = [5, 'mi'];
    const expected = 8.0467;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      expected,
      0.1
    );
  });

  test('convertHandler should correctly convert km to mi', function () {
    const input = [8.0467, 'km'];
    const expected = 5;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      expected,
      0.1
    );
  });

  test('convertHandler should correctly convert lbs to kg', function () {
    const input = [5, 'lbs'];
    const expected = 2.26796;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      expected,
      0.1
    );
  });

  test('convertHandler should correctly convert kg to lbs', function () {
    const input = [2.26796, 'kg'];
    const expected = 5;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      expected,
      0.1
    );
  });
});
