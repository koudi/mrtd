'use strict'

var common = require('./common')

// [line, start, length, check/tranform, include=true]

var def = {
  documentType: [0, 0, 1, common.documentType],
  documentSubType: [0, 1, 1, common.documentSubType],
  issuer: [0, 2, 3],
  documentNumber: [0, 5, 10, common.documentNumber([0, 15, 15])],
  optionalData1: [0, 15, 15],
  birthday: [1, 0, 6, common.parseDate],
  birthdayCheckDigit: [1, 6, 1, common.checkDigit([1, 0, 6]), false],
  sex: [1, 7, 1, common.parseSex],
  expiry: [1, 8, 6, common.parseIntDate],
  expiryCheckDigit: [1, 14, 1, common.checkDigit([1, 8, 6]), false],
  nationality: [1, 15, 3],
  optionalData2: [1, 18, 11],
  compositeCheckDigit: [1, 29, 1, common.checkDigit([0, 5, 25], [1, 0, 7], [1, 8, 7], [1, 18, 11]), false],
  name: [2, 0, 30, common.parseName],
}

var parse = function (data) {
  return common.parse(data, def);
}

module.exports = parse
