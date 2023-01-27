import localStorage from './localstorage.js'
import projects from './projects.js'
import {format, compareAsc, differenceInDays, endOfDay} from 'date-fns';
const tasks = (() => {
    //array to track all the tasks in order to generate their ID
    let allTasksArray = []; 
    class Task {
        constructor(title, details, dueDate, priority, projectID) {
            this.title = title;
            this.details = details;
            this.dueDate = dueDate; 
            this.priority = priority;
            this.completed = false;
            this.projectID = projectID;
            //no taskID as input
            this.taskID = Task.getNextAvailTaskID();
            //let onlyTaskIDsArray = allTasksArray.map(obj => obj.taskID).sort();
            this.previousID = this.taskID-1;

        }
/*         get taskID(){
            return this._taskID
        } */
/*         set taskID(newTaskID){
            allTasksArray = getAllTasks();
            let onlyTaskIDsArray = allTasksArray.map(obj => obj.taskID).sort();
            if (!Number.isInteger(newTaskID) || onlyTaskIDsArray.find[newTaskID]) {
                console.error("taskID not set correctly, already exists")
                return null;
            } else {
                console.log('taskID set to', newTaskID)
                this.taskID = newTaskID;
            }
        } */
/*         set projectID(newProjectID) {
            if (Number.isInteger(newProjectID)){
                this.projectID = newProjectID;
            } else {
                console.error('could not set projectID property for this task because it is not a number!')
            }
        } */
        static getNextAvailTaskID(){
            let allTasksArray = getAllTasks();
            let onlyTaskIDsArray = allTasksArray.map(obj => obj.taskID).sort();
            if (onlyTaskIDsArray.find[onlyTaskIDsArray.length-1]){
                return null;
            } else {
                let nextAvailTaskID = onlyTaskIDsArray.length;
                return nextAvailTaskID;
            }
        }
    }

    
    function addTask(title, details, dueDate, priority, projectID){
        let task = new Task(title, details, dueDate, priority, projectID);
        projects.addTaskToProject(projectID, task);
/*         let taskProjectsList = projects.getAllProjects();
        let task = new Task(title, details, dueDate, priority, projectID);

        taskProjectsList[projectID].taskArr.push(task);
        localStorage.addToStorage(taskProjectsList); */
    }
    function removeTask(projectID,taskID){
        let projectsFromStorage = projects.getAllProjects();
        //get project from projectID
        //search its taskArr for the taskID
        let taskToRemove = projectsFromStorage[projectID].taskArr.find(task => task.taskID === taskID)
        console.log('found the task to remove' , taskToRemove);
        let indexToRemove = projectsFromStorage[projectID].taskArr.indexOf(taskToRemove);
        console.log('index of the task we want to remove',  projectsFromStorage[projectID].taskArr.indexOf(taskToRemove)) //
        //remove it from that project
        if(indexToRemove > -1){
            projectsFromStorage[projectID].taskArr.splice(indexToRemove,1);
            localStorage.addToStorage(projectsFromStorage);
        } else {
            console.error('could not remove because indexToRemove = ', indexToRemove)
        }
        //add the new project array without that task to localstorage
        
    }
    function editTask(taskTitle, details, dueDate, priority, oldProjectID, newProjectID, taskID){
        let taskProjectsList = [];
        taskProjectsList = projects.getAllProjects();
        //Need to come up with a solution to move tasks between projects and have them maintain their project-link-index/task-link-index
        if( newProjectID === oldProjectID){
            //if they same then task should be the same task and can edit other form fields
            let foundTask = taskProjectsList[oldProjectID].taskArr.find(task => task.taskID === taskID);
            foundTask.title = String(taskTitle);
            foundTask.details = String(details);
            foundTask.dueDate = new Date(dueDate);
            foundTask.priority = String(priority);
            //old set statements taskProjectsList[oldProjectID].taskArr[taskID].title , .details ...etc
            localStorage.addToStorage(taskProjectsList);
        } else if(taskProjectsList[newProjectID].taskArr.find(obj => obj.taskID === taskID) === undefined){ 
            //should evaluate true since the .find function returns an undefined if the taskID is not found
            //adds to the end new project, do before Removing! 
            let taskToEdit = retrieveTask(oldProjectID,taskID);
            //needs an AddTaskToProject with a setter
            taskToEdit.projectID = newProjectID;
            projects.addTaskToProject(newProjectID,taskToEdit)
            //remove from old project -TODO
            removeTask(oldProjectID,taskID)
            //update the project and task indexes in the dom - TODO
        }
    }
    function getAllTasks(){
        let projectsFromStorage = projects.getAllProjects();
        let projectsArr = [];
        let allTasksArray = [];
        for (let i=0; i < projectsFromStorage.length; i++){
            projectsArr.push(projectsFromStorage[i]);
            for(let j=0; j <projectsArr[i].taskArr.length; j++){
                allTasksArray.push(projectsArr[i].taskArr[j])
            }
        }
        return allTasksArray;
    }
    function retrieveTask(dataProjectIndex, dataTaskIndex){
        let taskArr = getAllTasks();
        let foundTask = {};
        foundTask = taskArr.find(function(task){
            return parseInt(task.projectID,10) === dataProjectIndex && parseInt(task.taskID,10) === dataTaskIndex;
        })
        return foundTask;
    }
    //Testing Area
    /* const {format} = require('date-fns');
    format(new Date(1900, 1, 11), 'MM/dd/yyyy') // +> '01/11/1900'
    projects.addProject('Project1', 0);*/
    //addTask('first Task', 'this is my first todo', new Date('2/28/2023'), 'low',0);
    //addTask('second Task', 'this is my second todo', new Date('12/16/2022'), 'low',0);
    /*projects.addProject('2ndProject', 1);
    editTask('still first task', 'this is my first todo',new Date('2/28/2023'), 'medium',0); */
    //addTask('third Task', 'this is my 3rd todo', new Date('12/17/2022'), 'high',1);
    //addTask('Fourth Task', 'this is my 4th todo', new Date('2/18/2023'), 'high',0);
    /*console.log("printing list of all tasks")
    console.table(getAllTasks());
    let today = new Date();
    console.log(today);
    console.log(endOfDay(today));
    console.table(`retrieving Task 0,1: ${JSON.stringify(retrieveTask(0,1))}`); */
    /* console.log("I am getting all projects!:")
    console.table(projects.getAllProjects()); */
  

 /*    let taskToRemove = retrieveTask(0,0);
    console.log(taskToRemove);
    let arrayOfProjects = projects.getAllProjects();
    let indexToRemove = arrayOfProjects[0].taskArr.indexOf(taskToRemove);
    console.log('index of the task we want to remove',  arrayOfProjects[0].taskArr.indexOf(taskToRemove)) //
    console.log('before removing task', indexToRemove)
    console.table(arrayOfProjects[0].taskArr);
    removeTask(0,taskToRemove.taskID)
    console.log('after removing task ', indexToRemove)
    */

/*     
    removeTask(0,2);
    let taskToEdit = retrieveTask(0,1);
    
    console.log('getting all project now')
    console.table(projects.getAllProjects()) */
/*     console.log("arrayOfProjects's 1st Project'sTaskArr Array's length", arrayOfProjects[0].taskArr.length);
    console.log("arrayOfProjects's last task's index = ", arrayOfProjects[0].taskArr[2].taskID)
    console.log("this suggests that last task's ID should be 1 less than array.length") */
    //projects.findProjIDFromTitle("Testing Project 1")
    //const task3 = addTask('third Task', 'this is my third todo', new Date('2/28/2023'), 'low',0);
    let projectsList= projects.getAllProjects()
    console.log("prinnting new task array for project[0]:")
        console.table(projectsList[0].taskArr)
    //projects.addProject('2ndProject', 1);
        console.log("prinnting new task array for project[1]:")
        console.table(projectsList[1].taskArr)
        let projectLastIndex = projects.getAllProjects().length;
        console.log(projectLastIndex);
    //localStorage.clearStorage()
    
    return {
        addTask,
        removeTask,
        editTask,
        getAllTasks,
        retrieveTask
    }
})();

export default tasks;