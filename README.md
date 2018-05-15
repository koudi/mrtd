# Machine Readable Travel Documents parser

This library provides parser for machine readable zones on various types of
travel documents (passports, visas, idcards) as specified by 
(ICAO Doc 9303)[http://www.icao.int/publications/pages/publication.aspx?docnum=9303].

## Installation

`npm install mrtd`

## Supported types of documents

- TD1
- TD2
- TD3
- MRV-A
- MRV-B

## Usage

```javascript

var MRZdata =  "I<UTOD231458907<<<<<<<<<<<<<<<\n"
    MRZdata += "7408122F1204159UTO<<<<<<<<<<<6\n"
    MRZdata += "ERIKSSON<<ANNA<MARIA<<<<<<<<<<";

var mrtd = require('mrtd')

try {
    var data = mrtd.parse(MRZdata)
    console.log(data)
} catch (e) {
    // handle your error
}

// outputs

{ documentType: 'I',
  documentSubType: null,
  issuer: 'UTO',
  documentNumber: 'D23145890',
  optionalData1: '<<<<<<<<<<<<<<<',
  birthday: { day: '12', month: '08', year: '74' },
  sex: 'F',
  expiry: { day: 15, month: 4, year: 12 },
  nationality: 'UTO',
  optionalData2: '<<<<<<<<<<<',
  name: { primary: 'ERIKSSON', secondary: 'ANNA MARIA' },
  _type: 'td1' }

```

