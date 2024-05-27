function ConvertHandler() {
  this.getNum = function (input) {
    const numRegex = /^([.\d\/]*)([a-zA-Z]*)$/;
    const match = input.match(numRegex);

    if (!match) return 'invalid number';

    let numStr = match[1];

    // If there is no number part, default to 1
    if (numStr === '') return 1;

    if (numStr.includes('/')) {
      const parts = numStr.split('/');
      if (parts.length != 2) {
        return 'invalid number';
      }
      return parseFloat(parts[0]) / parseFloat(parts[1]);
    } else {
      return parseFloat(numStr);
    }
  };

  this.getUnit = function (input) {
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);

    if (!match) return 'invalid unit';

    const unit = match[0].toLowerCase() === 'l' ? 'L' : match[0].toLowerCase();

    if (!['gal', 'L', 'lbs', 'kg', 'mi', 'km'].includes(unit)) {
      return 'invalid unit';
    }

    return unit;
  };

  this.getReturnUnit = function (initUnit) {
    const unitPairs = {
      gal: 'L',
      L: 'gal',
      lbs: 'kg',
      kg: 'lbs',
      mi: 'km',
      km: 'mi',
    };
    return unitPairs[initUnit] || 'invalid unit';
  };

  this.spellOutUnit = function (unit) {
    const unitNames = {
      gal: 'gallons',
      L: 'liters',
      lbs: 'pounds',
      kg: 'kilograms',
      mi: 'miles',
      km: 'kilometers',
    };
    return unitNames[unit];
  };

  this.convert = function (initNum, initUnit) {
    const conversionRates = {
      gal: 3.78541,
      L: 1 / 3.78541,
      lbs: 0.453592,
      kg: 1 / 0.453592,
      mi: 1.60934,
      km: 1 / 1.60934,
    };

    const result = initNum * conversionRates[initUnit];
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
