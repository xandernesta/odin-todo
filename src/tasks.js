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
            this.previousID = this.taskID-1;

        }
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
    }
    function removeTask(projectID,taskID){
        let projectsFromStorage = projects.getAllProjects();
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