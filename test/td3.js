var assert = require('assert')
var mrtd = require('../src/index.js')

var t1 =  "P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<\n"
    t1 += "L898902C36UTO7408122F1204159ZE184226B<<<<<10"

var t1e = {
  _type: 'td3',
  documentType: 'P',
  documentSubType: null,
  issuer: 'UTO',
  personalNumber: 'ZE184226B',
  documentNumber: 'L898902C3',
  sex: 'F',
  birthday: {day: '12', month: '08', year: '74'},
  expiry: {day: 15, month: 4, year: 12},
  nationality: 'UTO',
  name: {primary: 'ERIKSSON', secondary: 'ANNA MARIA'}
}



describe('TD3 Cards', function() {

  it('should parse document type', function() {
    var td1 = mrtd.parse(t1)
    assert.equal(td1.documentType, t1e.documentType)
  })

  it('should parse document subtype', function() {
    var td1 = mrtd.parse(t1)
    assert.equal(td1.documentSubType, t1e.documentSubType)
  })

  it('should parse issuer', function() {
    var td1 = mrtd.parse(t1)
    assert.equal(td1.issuer, t1e.issuer)
  })

  it('should parse document number', function() {
    var td1 = mrtd.parse(t1)
    assert.equal(td1.documentNumber, t1e.documentNumber)
  })

  it('should parse sex', function() {
    var td1 = mrtd.parse(t1)
    assert.equal(td1.sex, t1e.sex)
  })

  it('should parse nationality', function() {
    var td1 = mrtd.parse(t1)
    assert.equal(td1.nationality, t1e.nationality)
  })

  it('should parse birthday', function() {
    var td1 = mrtd.parse(t1)
    assert.deepEqual(td1.birthday, t1e.birthday)
  })

  it('should parse expiry', function() {
    var td1 = mrtd.parse(t1)
    assert.deepEqual(td1.expiry, t1e.expiry)
  })

  it('should parse name', function() {
    var td1 = mrtd.parse(t1)
    assert.deepEqual(td1.name, t1e.name)
  })

  it('should parse personal number', function() {
    var td1 = mrtd.parse(t1)
    assert.equal(td1.personalNumber, t1e.personalNumber)
  })

})
