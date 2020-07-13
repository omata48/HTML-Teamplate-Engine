const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)



async function getTeamData() {

    const engineeringTeam = [];
    const questions = [
    {
        type: 'input',
        message: 'What is their name',
        name: 'name'
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
    },
    {
        type: 'input',
        message: 'What school do they attend?',
        name: 'school',
        when: function(answers){
            return answers.role === "Intern";
        },
    },
    {
        type: 'input',
        message: 'What is their email?',
        name: "email",
    }
    ];
    // manager required for team, so run first with question asking how many employees additionally will be added
    var {teamSize, name, email, officeNumber } = await inquirer.prompt([
        {
            type: 'number',
            message: 'How big is the engineering team?',
            name: "teamSize",
        },
        {
            type: 'input',
            message: "What is the manager's name",
            name: "name",
        },
        {
            type: 'input',
            message: 'What is their email?',
            name: "email",
        },
        {
            type: 'input',
            message: 'What is their office number?',
            name: 'officeNumber',
        },
    ]);
    engineeringTeam.push(new Manager(name, 1, email, officeNumber));
    
    for (var i = 0; i < teamSize; i++){

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
    }

    // add manager obj to list 
    // console.log(engineeringTeam);

    // console.log(engineeringTeam);
    return engineeringTeam;

}
 
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
getTeamData().then(function(teamArray){
    console.log(teamArray);
})


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
