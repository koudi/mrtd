'use strict'

var common = require('./common')

// [line, start, length, check/tranform, include=true]

var def = {
  documentType: [0, 0, 1, common.documentType],
  documentSubType: [0, 1, 1, common.documentSubType],
  issuer: [0, 2, 3],
  name: [0, 5, 31, common.parseName],
  documentNumber: [1, 0, 10, common.documentNumber([1, 28, 7])],
  nationality: [1, 10, 3],
  birthday: [1, 13, 6, common.parseDate],
  birthdayCheckDigit: [1, 19, 1, common.checkDigit([1, 13, 6]), false],
  sex: [1, 20, 1, common.parseSex],
  expiry: [1, 21, 6, common.parseIntDate],
  expiryCheckDigit: [1, 27, 1, common.checkDigit([1, 21, 6]), false],
  optionalData: [1, 28, 7],
  compositeCheckDigit: [1, 35, 1, common.checkDigit([1, 0, 10], [1, 13, 7], [1, 21, 14]), false]
}

var parse = function (data) {
  return common.parse(data, def);
}

module.exports = parse
