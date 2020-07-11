// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

const Manager = function(office){
    Employee.call(this);
    this.officeNumber = office;
};
Manager.prototype.getRole = function() {
    return "Manager";
};

module.exports = Manager;