const { isValidPhoneNumber } = require("libphonenumber-js");
console.log(isValidPhoneNumber("8360915532", "in"));
console.log(isValidPhoneNumber("8360915532", "IN"));
