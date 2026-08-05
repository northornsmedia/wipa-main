const fs = require('fs');
fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd')
  .then(res => res.json())
  .then(data => {
     let countries = data.map(c => {
       let dial = '';
       if (c.idd && c.idd.root) {
         dial = c.idd.root + (c.idd.suffixes && c.idd.suffixes.length === 1 ? c.idd.suffixes[0] : '');
       }
       return {
         code: c.cca2,
         name: c.name.common,
         dial: dial
       };
     }).filter(c => c.name && c.code).sort((a,b) => a.name.localeCompare(b.name));
     fs.writeFileSync('src/utils/countries.json', JSON.stringify(countries, null, 2));
  });
