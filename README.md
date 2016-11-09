# Machine Readable Travel Documents parser

This library provides parser for machine readable zones on various types of
travel documents (passports, visas, idcards) as specified by 
[http://www.icao.int/publications/pages/publication.aspx?docnum=9303](ICAO Doc 9303).

## Installation

`npm install mrtd`

## Usage

```javascript
var mrtd = require('mrtd')

try {
    var data = mrtd.parse(MRZdata)
    console.log(data)
} catch (e) {
    // handle your error
}
```
