'use strict'

const FILLER = '<'
const check = [7,3,1]

function getCheckDigit(input) {
  let sum = 0;

  for (let i = 0; i < input.length; i++) {

    let val = parseInt(input[i]);

    if (Number.isNaN(val)) {
      if (input[i] == FILLER) {
        val = 0;
      } else {
        val = input[i].toUpperCase().charCodeAt(0) - 55; //A starts as 10
      }
    }
    sum += val * check[i % 3];
  }
  return sum % 10;
}

function splitLines(data) {
  return data.split(/\r?\n/)
}

function parseName(name) {

  var parts = name.split(FILLER + FILLER, 2)

  return {
    primary: replaceFiller(parts[0], ' ').trim(),
    secondary: replaceFiller(parts[1], ' ').trim()
  }

}

function parseDate(date) {
  return {
    day: date.substr(4, 2),
    month: date.substr(2, 2),
    year: date.substr(0, 2)
  }
}

function parseIntDate(date) {
  return {
    day: parseInt(date.substr(4, 2)),
    month: parseInt(date.substr(2, 2)),
    year: parseInt(date.substr(0, 2))
  }
}

function parseSex(sex) {
  if (sex == FILLER) {
    return 'unknown'
  }
  return sex
}

function documentType(type) {
  if (type != 'A' && type != 'C' && type != 'I') {
    throw `Invalid document type ${type}`
  }

  return type
}

function documentSubType(type) {
  if (type != FILLER) {
    if (type == 'V') {
      throw 'V is not valid document subtype'
    }
    return type
  }

  return null
}

function checkDigit() {

  var where = arguments

  return function(value, full) {
    var data = ""
    for (var i = 0; i < where.length; i++) {
      data += full[where[i][0]].substr(where[i][1], where[i][2])
    }

    var check = getCheckDigit(data)

    if (check != value) {
      throw `Invalid check digit ${check}, got ${value}`
    }
  }
}

function documentNumber(opt) {

  return function(value, full) {

    var optional = full[opt[0]].substr(opt[1], opt[2])
    var numberCheck = value.substr(-1)
    var value = value.substr(0, value.length - 1)

    if (numberCheck == FILLER) {
      var end = optional.indexOf(FILLER)
      numberCheck = optional[end - 1]
      value += optional.substr(0, end - 1)
    }

    if (getCheckDigit(value) != numberCheck) {
      throw 'Invalid check digit for document number'
    }

    return replaceFiller(value, ' ').trim()
  }

}

function replaceFiller(data, replacement) {
  return data.replace(new RegExp(FILLER, 'g'), replacement)
}

function parse(data, def) {
  var l = splitLines(data)
  var r = {}

  for (var key in def) {
    var attr = def[key]
    var value = l[attr[0]].substr(attr[1], attr[2])

    if (typeof(attr[3]) == 'function') {
      value = attr[3].apply(null, [value, l])
    }

    if (attr[4] == undefined || attr[4] == true) {
      r[key] = value
    }
  }

  return r
}


module.exports = {
  FILLER: FILLER,
  getCheckDigit: getCheckDigit,
  parseName: parseName,
  parseDate: parseDate,
  splitLines: splitLines,
  replaceFiller: replaceFiller,
  parseDate: parseDate,
  parseIntDate: parseIntDate,
  parseSex: parseSex,
  documentType: documentType,
  documentSubType: documentSubType,
  documentNumber: documentNumber,
  parse: parse,
  checkDigit: checkDigit
}



/*
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


*/
