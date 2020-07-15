const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { parse } = require("path");
const util = require("util");

// const writeFileAsync = util.promisify(fs.writeFile)
// function emailValidation(email) {
//     const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

//     if (valid) {
//         return true;
//     } else {
//         return "Please enter a valid email";
//     }
// }

async function getTeamData() {

    const engineeringTeam = [];
    const questions = [
    {
        type: 'input',
        message: 'What is their name',
        name: 'name',
        validate: (input) => {
            if (typeof input !== "undefined") {
                return true;
            } else {
                return "Please enter a value";
            }
        },
    },
    {
        type: 'list',
        message: 'What is their role?',
        name: 'role',
        choices: [
            "Engineer",
            "Intern",
        ]
    },
    {
        type: 'input',
        message: 'What is their GitHub username?',
        name: 'github',
        when: function(answers){
            return answers.role === "Engineer";
        },
        validate: (input) => {
            if (typeof input !== "undefined") {
                return true;
            } else {
                return "Please enter a value";
            }
        },
    },
    {
        type: 'input',
        message: 'What school do they attend?',
        name: 'school',
        when: function(answers){
            return answers.role === "Intern";
        },
        validate: (input) => {
            if (typeof input !== "undefined") {
                return true;
            } else {
                return "Please enter a value";
            }
        },
    },
    {
        type: 'input',
        message: 'What is their email?',
        name: "email",
        default: () => {},
        validate: (email) => {
            const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

            if (valid) {
                return true;
            } else {
                return "Please enter a valid email";
            }
        },
    }
    ];
    // manager required for team, so run first with question asking how many employees additionally will be added
    var {teamSize, name, email, officeNumber } = await inquirer.prompt([
        {
            type: 'input',
            message: 'How big is the engineering team?',
            name: "teamSize",
            default: "0",
            validate: (teamSize)=> {
                if (!isNaN(parseInt(teamSize)) && parseInt(teamSize) >= 0){
                    return true
                } else {
                    return "Please enter a positive integer"
                }
            }
        },
        {
            type: 'input',
            message: "What is the manager's name",
            name: "name",
            validate: (name) => {
                if (name.trim() === ""){
                    return "Please enter a name"
                } else {
                    return true
                }
            },
        },
        {
            type: 'input',
            message: 'What is their email?',
            name: "email",
            default: () => {},
            validate: (email) => {
                const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

                if (valid) {
                    return true;
                } else {
                    return "Please enter a valid email";
                }
            }
        },
        {
            type: 'input',
            message: 'What is their office number?',
            name: 'officeNumber',
            validate: (number)=> {
                if (!isNaN(parseInt(number)) && parseInt(number) > 0){
                    return true
                } else {
                    return "Please enter a positive integer";
                }
            } 
        },
    ]);
    engineeringTeam.push(new Manager(name, 1, email, officeNumber));
    
    // for teamsize given, make employee objects
    console.log("\nNow asking some questions about the rest of the team:\n")
    for (var i = 0; i < parseInt(teamSize); i++){

        // assign iteration variables to use with new obj
        var {name, email, role, school, github} = await inquirer.prompt(questions);
        // console.log(name, email, school, github);

        // verify role to add correct obj
        if (role === "Engineer"){
            engineeringTeam.push(new Engineer(name, i+2,email,github));
        } else if (role === "Intern") {
            engineeringTeam.push(new Intern(name, i+2, email, school));
        } else {
            console.log("error with adding member");
        }
        console.log('\n');
    }
    // console.log(engineeringTeam);
    return engineeringTeam;
}
 
getTeamData().then(async function(teamArray){
    // console.log(teamArray);
    const htmlBlock = await render(teamArray)
    // console.log(htmlBlock);
    // console.log("=".repeat(20))
    fs.writeFileSync(outputPath,htmlBlock,"utf8")
})