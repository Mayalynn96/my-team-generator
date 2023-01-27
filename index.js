const generateHtml = require("./util/generateHtml.js")
const Engineer = require("./lib/Engineer.js")
const Intern = require("./lib/Intern.js")
const Manager = require("./lib/Manager.js")
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
        // addEngineer()
    } else if (employee.type === "Intern") {
        // addIntern()
    }
}

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


