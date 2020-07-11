// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

const Engineer = function(userName){
    Employee.call(this);
    this.github = userName;
};

Engineer.prototype.getGithub = function() {
    return `https://www.github.com/${this.github}`;
};
Engineer.prototype.getRole = function() {
    return "Engineer";
};

module.exports = Engineer;