'use strict'

var common = require('./common')

function passportType(val) {
  if (val != 'P') {
    throw 'Invalid document type != P'
  }
  return val
}

function personal(val) {
  return common.replaceFiller(val, '')
}

function documentNumber(value) {
  return common.replaceFiller(value, ' ').trim()
}

var def = {
  documentType: [0, 0, 1, passportType],
  documentSubType: [0, 1, 1, common.documentSubType],
  issuer: [0, 2, 3],
  name: [0, 5, 39, common.parseName],
  documentNumber: [1, 0, 9, documentNumber],
  documentNumberCheck: [1, 9, 1, common.checkDigit([1, 0, 9]), false],
  nationality: [1, 10, 3],
  birthday: [1, 13, 6, common.parseDate],
  birthdayCheckDigit: [1, 19, 1, common.checkDigit([1, 13, 6]), false],
  sex: [1, 20, 1, common.parseSex],
  expiry: [1, 21, 6, common.parseIntDate],
  expiryCheckDigit: [1, 27, 1, common.checkDigit([1, 21, 6]), false],
  personalNumber: [1, 28, 14, personal],
  personalCheckDigit: [1, 42, 1, common.checkDigit([1, 28, 14]), false],
  compositeCheckDigit: [1, 43, 1, common.checkDigit([1, 0, 10], [1, 13, 7], [1, 21, 22]), false],
}

var parse = function (data) {
  return common.parse(data, def);
}

module.exports = parse
