process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { Client } = require('pg');
const fs = require('fs');
const { allCountries } = require('country-telephone-data');

const envContent = fs.readFileSync('.env.local', 'utf8');
let dbUrl = '';
const lines = envContent.split('\n');
for (const line of lines) {
  if (line.startsWith('POSTGRES_URL=')) {
    dbUrl = line.split('=')[1].trim().replace(/['"]/g, '');
    break;
  }
}

function normalizeCountryAndPhone(countryInput, phoneInput) {
  let formattedCountry = countryInput ? countryInput.trim() : '';
  let formattedPhone = phoneInput ? phoneInput.trim() : '';
  let dialCode = '';

  const match = allCountries.find(
    c => c.iso2.toUpperCase() === (countryInput || '').toUpperCase().trim() ||
         c.name.toLowerCase() === (countryInput || '').toLowerCase().trim() ||
         c.name.replace(/\s*\([^)]*\)/g, '').trim().toLowerCase() === (countryInput || '').toLowerCase().trim()
  );

  if (match) {
    const cleanName = match.name.replace(/\s*\([^)]*\)/g, '').trim();
    formattedCountry = `${cleanName} (+${match.dialCode})`;
    dialCode = `+${match.dialCode}`;
  } else if (countryInput && countryInput.includes('(+')) {
    const codeMatch = countryInput.match(/\(\+([0-9]+)\)/);
    if (codeMatch) {
      dialCode = `+${codeMatch[1]}`;
    }
  }

  if (dialCode && formattedPhone && !formattedPhone.startsWith('+')) {
    formattedPhone = `${dialCode} ${formattedPhone}`;
  }

  return { formattedCountry, formattedPhone };
}

async function main() {
  const client = new Client({ connectionString: dbUrl });
  await client.connect();

  console.log('--- Migrating waiting_list table data ---');
  const res = await client.query('SELECT * FROM waiting_list ORDER BY created_at ASC');
  
  for (const row of res.rows) {
    const { formattedCountry, formattedPhone } = normalizeCountryAndPhone(row.country, row.phone);
    console.log(`Row [${row.name}]:`);
    console.log(`  Country: '${row.country}' -> '${formattedCountry}'`);
    console.log(`  Phone:   '${row.phone}' -> '${formattedPhone}'`);

    await client.query(
      'UPDATE waiting_list SET country = $1, phone = $2 WHERE id = $3',
      [formattedCountry, formattedPhone, row.id]
    );
  }

  console.log('\n--- Verification: Current data in waiting_list ---');
  const updatedRes = await client.query('SELECT id, name, country, phone, plan, email FROM waiting_list ORDER BY created_at ASC');
  console.log(JSON.stringify(updatedRes.rows, null, 2));

  await client.end();
}

main().catch(console.error);
