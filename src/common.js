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

}

function replaceFiller(data, replacement) {
  return data.replace(new RegExp(FILLER, 'g'), replacement)
}

module.exports = {
  FILLER: FILLER,
  getCheckDigit: getCheckDigit,
  parseName: parseName,
  parseDate: parseDate,
  splitLines: splitLines,
  replaceFiller: replaceFiller
}

