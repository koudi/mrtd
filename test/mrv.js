var assert = require('assert')
var mrtd = require('../src/index.js')

var t1a =  "V<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<\n"
    t1a += "L8988901C4XXX4009078F96121096ZE184226B<<<<<<"

var t1b =  "V<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<\n"
    t1b += "L8988901C4XXX4009078F9612109<<<<<<<<"

var t1ae = t1be = {
  _type: 'td3',
  documentType: 'V',
  documentSubType: null,
  issuer: 'UTO',
  optionalData: '',
  documentNumber: 'L8988901C',
  sex: 'F',
  birthday: {day: '07', month: '09', year: '40'},
  expiry: {day: 10, month: 12, year: 96},
  nationality: 'XXX',
  name: {primary: 'ERIKSSON', secondary: 'ANNA MARIA'}
}


describe('MRV-A', function() {

  it('should parse document type', function() {
    var td1 = mrtd.parse(t1a)
    assert.equal(td1.documentType, t1ae.documentType)
  })

  it('should parse document subtype', function() {
    var td1 = mrtd.parse(t1a)
    assert.equal(td1.documentSubType, t1ae.documentSubType)
  })

  it('should parse issuer', function() {
    var td1 = mrtd.parse(t1a)
    assert.equal(td1.issuer, t1ae.issuer)
  })

  it('should parse document number', function() {
    var td1 = mrtd.parse(t1a)
    assert.equal(td1.documentNumber, t1ae.documentNumber)
  })

  it('should parse sex', function() {
    var td1 = mrtd.parse(t1a)
    assert.equal(td1.sex, t1ae.sex)
  })

  it('should parse nationality', function() {
    var td1 = mrtd.parse(t1a)
    assert.equal(td1.nationality, t1ae.nationality)
  })

  it('should parse birthday', function() {
    var td1 = mrtd.parse(t1a)
    assert.deepEqual(td1.birthday, t1ae.birthday)
  })

  it('should parse expiry', function() {
    var td1 = mrtd.parse(t1a)
    assert.deepEqual(td1.expiry, t1ae.expiry)
  })

  it('should parse name', function() {
    var td1 = mrtd.parse(t1a)
    assert.deepEqual(td1.name, t1ae.name)
  })

  it('should parse optionalData', function() {
    var td1 = mrtd.parse(t1a)
    t1a += "L898902C36UTO7408122F1204159ZE184226B<<<<<10"
    assert.equal(td1.personalNumber, t1ae.personalNumber)
  })

})


describe('MRV-B', function() {

  it('should parse document type', function() {
    var td1 = mrtd.parse(t1b)
    assert.equal(td1.documentType, t1be.documentType)
  })

  it('should parse document subtype', function() {
    var td1 = mrtd.parse(t1b)
    assert.equal(td1.documentSubType, t1be.documentSubType)
  })

  it('should parse issuer', function() {
    var td1 = mrtd.parse(t1b)
    assert.equal(td1.issuer, t1be.issuer)
  })

  it('should parse document number', function() {
    var td1 = mrtd.parse(t1b)
    assert.equal(td1.documentNumber, t1be.documentNumber)
  })

  it('should parse sex', function() {
    var td1 = mrtd.parse(t1b)
    assert.equal(td1.sex, t1be.sex)
  })

  it('should parse nationality', function() {
    var td1 = mrtd.parse(t1b)
    assert.equal(td1.nationality, t1be.nationality)
  })

  it('should parse birthday', function() {
    var td1 = mrtd.parse(t1b)
    assert.deepEqual(td1.birthday, t1be.birthday)
  })

  it('should parse expiry', function() {
    var td1 = mrtd.parse(t1b)
    assert.deepEqual(td1.expiry, t1be.expiry)
  })

  it('should parse name', function() {
    var td1 = mrtd.parse(t1b)
    assert.deepEqual(td1.name, t1be.name)
  })

  it('should parse optionalData', function() {
    var td1 = mrtd.parse(t1b)
    t1b += "L898902C36UTO7408122F1204159ZE184226B<<<<<10"
    assert.equal(td1.personalNumber, t1be.personalNumber)
  })

})
