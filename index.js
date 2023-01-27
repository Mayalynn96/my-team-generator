const generateHtml = require("./assets/util/generateHtml.js")
const Engineer = require("./assets/lib/Engineer.js")
const Intern = require("./assets/lib/Intern.js")
const Manager = require("./assets/lib/Manager.js")
const inquirer = require("inquirer")
const fs = require("fs")

const team = [];
let manager = '';
const engineers = [];
const interns = [];


const start = async () => {
    try {
        const userInput = await inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "Let's get started creating your team profile! Enter your mangers name"
            },
            {
                type: "input",
                name: "managerId",
                message: "Enter the managers employee id"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "Enter the managers email address"
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "Enter the managers Office Number"
            }
        ])
        team.push(new Manager(userInput.managerName, userInput.managerId, userInput.managerEmail, userInput.managerOfficeNumber))
        manager = userInput.managerName
        console.log(manager);
        await addTeamMembers()

    }
    catch (err) {
        console.log(err)
    }
}

start()

// gives the user the choice to add an engineer, add an intern or quite and generate html
const addTeamMembers = async () => {
    const employee = await inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            message: 'What kind of employee would you like to add to your team?',
            choices: ["Engineer", "Intern", "None, I'm all done building my team!"]
        },
    ])
    if (employee.type === "None, I'm all done building my team!") {
        doneCreatingTeam()
    } else if (employee.type === "Engineer") {
        addEngineer()
    } else if (employee.type === "Intern") {
        addIntern()
    }
}

// makes sure the user is done, shows the current list and generates html or returns to addTeamMember
const doneCreatingTeam = async () => {
    const question = await showCurrentList()
    const user = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'choice',
            message: 
`Are you sure? \n
${question} \n
`
        }
    ])
    const text = generateHtml(team)
    if (user.choice) {
        console.log('Goodbye!');
        fs.writeFile('./dist/index.html', text, (err) => {
            if(err){
                console.log(err)
            }
        })
    } else {
        addTeamMembers()
    }
}

// promts questions and adds engineer
const addEngineer = async () => {
    console.log("You chose to add and Engineer")
    const employee = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is their name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is their Id?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is their Email?',
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is their GitHub username?',
        },
    ])
    team.push(new Engineer(employee.name, employee.id, employee.email, employee.github))
    engineers.push((employee.name))
    const currentList = await showCurrentList();
    console.log(currentList);
    addTeamMembers()
}

// promts questions and adds intern
const addIntern = async () => {
    console.log("You chose to add and Intern")
    const employee = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is their name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is their Id?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is their Email?',
        },
        {
            type: 'input',
            name: 'school',
            message: 'What School do they go to?',
        },
    ])
    team.push(new Intern(employee.name, employee.id, employee.email, employee.school))
    interns.push((employee.name))
    const currentList = await showCurrentList();
    console.log(currentList);
    addTeamMembers()
}

// Generating a nice list of all current teammembers
const showCurrentList = async () => {
    let allEngineers = engineers.join(', ');
    let allInterns = interns.join(', ');
    text = 
`Here is a list of your current members: \n
Manager: ${manager}
Engineers: ${allEngineers}
Interns:  ${allInterns}
`
    return text
}


