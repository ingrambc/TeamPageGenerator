const Employee = require("./Employee");

class Engineer extends  Employee{
  constructor(name, id, email, github){
    // create employee as superclass
    super(name, id, email);
    
    this.github = github;
  }

  getGithub(){
    return this.github;
  }

  getRole(){
    return "Engineer";
  }

}

module.exports = Engineer;