var inquirer = require('inquirer');

// function promptUser() {
//     return inquirer
//         .prompt(
//             {
//                 message: "Please enter your email",
//                 name: "email",
//                 type: "input",
//                 default: () => { },
//                 validate: function (email) {

//                     valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

//                     if (valid) {
//                         console.log("\tGreat job");
//                         return true;
//                     } else {
//                         console.log(".  Please enter a valid email")
//                         return false;
//                     }
//                 }
//             }
//         );
// }

//   promptUser();

const a = "1";
const b = ("-1");
const c = "a";

console.log(!isNaN(parseInt(a)))
console.log(!isNaN(parseInt(b)))
console.log(!isNaN(parseInt(c)))
console.log(parseInt(c) > 0)