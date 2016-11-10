'use strict';

var common = require('./common')
var td1Parser = require('./td1')

var parsers = {
  td1: td1Parser,
}

function simpleValidate(data) {
  var lines = common.splitLines(data)

  if (lines == 0 || lines > 3) {
    throw 'Invalid number of lines'
  }

  var len0 = lines[0]

  for (var i = 1; i < lines; i++) {
    if (len0 != lines[i].length) {
      throw 'Lines have different length'
    }

    len0 = lines[i].length
  }

}

function getType(data) {
  simpleValidate(data)
  var lines = common.splitLines(data)
  var len = lines[0].length
  var lineCount = lines.length

  if (lineCount == 3 && len == 30) {
    return 'td1'
  }
  else {
    throw 'Unable to detect document type'
  }
}

function parse(data) {
  simpleValidate(data)

  var type = getType(data)
  var res = parsers[type](data)
  res._type = type

  return res

}

module.exports = {
  parse: parse
};
