function ConvertHandler() {
  // pattern to match an optional number/float/fraction then compulsory a unit
  const pattern = /^(\d*\.?\d*\/?\d*)?([a-zA-Z]+)$/;

  this.getNum = function (input) {
    const match = pattern.exec(input);
    if (!match) {
      return 'invalid number';
    }

    const fractionPattern = /^(\d*\.?\d*)?\/(\d*\.?\d*)$/;

    if (fractionPattern.test(match[1])) {
      const [numerator, denominator] = match[1].split('/');
      result = parseFloat(numerator) / parseFloat(denominator);
      return result;
    }

    console.log(match);
    result = match[1] || '1';

    return result;
  };

  this.getUnit = function (input) {
    const match = pattern.exec(input);

    if (!match) {
      return 'invalid unit';
    }

    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (!validUnits.includes(match[2].toLowerCase())) {
      return 'invalid unit';
    }

    // check L
    if (match[2].toLowerCase() === 'l') {
      return 'L';
    }

    result = match[2];

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = 'L';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      default:
        result = 'invalid unit';
    }

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    switch (unit.toLowerCase()) {
      case 'gal':
        result = 'gallons';
        break;
      case 'l':
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      default:
        result = 'invalid unit';
    }

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = 'invalid unit';
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;

    return result;
  };
}

module.exports = ConvertHandler;
