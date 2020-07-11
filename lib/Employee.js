// TODO: Write code to define and export the Employee class
const Employee = function(name, position, email) {
    this.name = name;
    this.id = position;
    this.email = email;
}
Employee.prototype.getName = function() {
    return this.name;
}
Employee.prototype.getId = function() {
    return this.id;
}
Employee.prototype.getEmail = function() {
    return this.email;
}
Employee.prototype.getRole = function() {
    return "Employee";
}

module.exports = Employee;