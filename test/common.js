const assert = require('assert')

var t = require('../src/common.js')

describe('Common functionality', function() {

  describe('Check digit examples', function() {

    it('date field', function(){
      assert.equal(t.getCheckDigit('520727'), 3)
    })

    it('document number', function(){
      assert.equal(t.getCheckDigit('AB2134<<<'), 5)
    })

    it('TD1 composite check', function(){
      assert.equal(t.getCheckDigit('D231458907<<<<<<<<<<<<<<<34071279507122<<<<<<<<<<<'),2)
    })

    it('TD2 composite check', function(){
      assert.equal(t.getCheckDigit('HA672242<658022549601086<<<<<<<'),8)
    })


    it('TD3 composite check', function(){
      assert.equal(t.getCheckDigit('HA672242<658022549601086<<<<<<<<<<<<<<0'),8)
    })

 })


})
