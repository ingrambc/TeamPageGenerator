const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { type } = require("os");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = [];
const empRoles = ["Manager", "Engineer", "Intern"];

function getEmployeeInfo(){
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "what is the Team Member's name: "
    },{
      type: "input",
      name: "id",
      message: "what is the Team Member's id: "
    },{
      type: "input",
      name: "email",
      message: "what is the Team Member's email: "
    }
  ])
}

async function createEmployeeObj(role){
  //get basic employee information
  let inputs = await getEmployeeInfo();

  //get role specific info and create object
  switch (role){
    case "Manager":
      await inquirer.prompt({
        type: "input",
        name: "officeNumber",
        message: "What is the managers office number: "
      }).then(function(data){
        employee = new Manager(inputs.name, inputs.id, inputs.email, data.officeNumber);
      });
    return employee;

    case "Engineer":
      await inquirer.prompt({
        type: "input",
        name: "github",
        message: "What is the engineers github username: "
      }).then(function(data){
        employee = new Engineer(inputs.name, inputs.id, inputs.email, data.github);
      });
      return employee;

    case "Intern":
      await inquirer.prompt({
        type: "input",
        name: "school",
        message: "What school does the intern attend: "
      }).then(function(data){
        employee = new Intern(inputs.name, inputs.id, inputs.email, data.school);
      });
    return employee;
  }
}

async function init(){
  let moreEmps = true;

  //If there is no employees in array, get manager
  if(employees.length < 1){
    console.log("Create your team,")
    console.log("Enter the managers info");
    let employee = await createEmployeeObj("Manager");
    employees.push(employee);
  }

  while(moreEmps){
    //prompt for and add the rest of the team
    await inquirer.prompt({
      type: "confirm",
      name: "choice",
      message: "Do you have more team members to enter?"
    }).then(async function(data) {
      //If there are more team members to add, create the employee object, push into array
      if(data.choice){
        await inquirer.prompt({
          type: "list",
          name: "role",
          message: "what role is the Team Member: ",
          choices: empRoles
        }).then(async function(data) {
          let employee = await createEmployeeObj(data.role);
          employees.push(employee);
        })
       //if there are no more ream members, call render function  
      }else{
        moreEmps = false;
        render(employees);
      }
    })
  }
}


init();
  


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

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
