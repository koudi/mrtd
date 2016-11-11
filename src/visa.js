'use strict'

var common = require('./common')

function visaType(val) {
  if (val != 'V') {
    throw 'Invalid document type != V'
  }
  return val
}

function optional(val) {
  return common.replaceFiller(val, ' ').trim()
}

function documentNumber(value) {
  return common.replaceFiller(value, ' ').trim()
}

function makeParser(len) {
  var def = {
    documentType: [0, 0, 1, visaType],
    documentSubType: [0, 1, 1, common.documentSubType],
    issuer: [0, 2, 3],
    name: [0, 5, len - 5, common.parseName],
    documentNumber: [1, 0, 9, documentNumber],
    documentNumberCheck: [1, 9, 1, common.checkDigit([1, 0, 9]), false],
    nationality: [1, 10, 3],
    birthday: [1, 13, 6, common.parseDate],
    birthdayCheckDigit: [1, 19, 1, common.checkDigit([1, 13, 6]), false],
    sex: [1, 20, 1, common.parseSex],
    expiry: [1, 21, 6, common.parseIntDate],
    expiryCheckDigit: [1, 27, 1, common.checkDigit([1, 21, 6]), false],
    optionalData: [1, 28, len - 28, optional],
  }

  return function(data) {
    return common.parse(data, def)
  }
}

module.exports = {
  a: makeParser(44),
  b: makeParser(36),

}
