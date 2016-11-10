'use strict'

var common = require('./common')


var parse = function (data) {

  var l = common.splitLines(data)
  var r = {}

  // Line 1

  r.documentType = l[0].substr(0, 1)

  if (r.documentType != 'A' && r.documentType != 'C' && r.documentType != 'I') {
    throw `Invalid document type ${r.documentType}`
  }

  r.documentSubType = l[0].substr(1, 1)

  if (l[0].substr(1, 1) != common.FILLER) {
    if (r.documentSubType == 'V') {
      throw 'V is not valid document subtype'
    }
  } else {
    r.documentSubType = null
  }

  r.issuer = l[0].substr(2, 3)

  var optional = l[0].substr(15)

  r.documentNumber = l[0].substr(5, 9)
  var numberCheck = l[0].substr(14, 1)


  if (numberCheck == common.FILLER) {
    var end = optional.indexOf(common.FILLER)
    numberCheck = optional[end - 1]
    r.documentNumber += optional.substr(0, end - 2)
    optional = optional.substr(end)
  }

  if (common.getCheckDigit(r.documentNumber) != numberCheck) {
    throw 'Invalid check digit for document number'
  }

  r.optionalData = [optional]

  // Line 2

  var birthday = l[1].substr(0, 6)

  if (common.getCheckDigit(birthday) != l[1].substr(6, 1)) {
    throw 'Invalid check digit for birthday'
  }

  // There is no date parsing into date object, not even parsing numbers.
  // This is because the standard allow date of birt to have unknown parts.
  // Handling these situtions is up to data comsumer.
  r.birthday = {
    day: birthday.substr(4, 2),
    month: birthday.substr(2, 2),
    year: birthday.substr(0, 2)
  }

  r.sex = l[1].substr(7, 1)

  if (r.sex == common.FILLER) {
    r.sex = 'unknown'
  }

  var expiry = l[1].substr(8, 6)

  if (common.getCheckDigit(expiry) != l[1].substr(14, 1)) {
    throw 'Invalid check digit for expiry date'
  }

  r.expiry = {
    day: parseInt(expiry.substr(4, 2)),
    month: parseInt(expiry.substr(2, 2)),
    year: parseInt(expiry.substr(0, 2))
  }

  r.nationality = l[1].substr(15, 3)
  r.optionalData.push(l[1].substr(18, 11))

  var compositeCheck = l[0].substr(5) + l[1].substr(0, 7) + l[1].substr(8, 7) +
    l[1].substr(18, 11)

  if (common.getCheckDigit(compositeCheck) != l[1].substr(29, 1)) {
      throw 'Invalid composite check digit'
  }

  r.name = common.parseName(l[2])

  return r

}

module.exports = parse
