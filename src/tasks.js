import localStorage from './localstorage.js'
import projects from './projects.js'
import {format, compareAsc, differenceInDays} from 'date-fns';

const tasks = (() => {
    format(new Date(1900, 1, 11), 'MM/dd/yyyy') // +> '01/11/1900'

    class Task {
        constructor(title, details, dueDate, priority, projectIndex, taskIndex) {
            this.title = title;
            this.details = details;
            this.dueDate = dueDate; 
            this.priority = priority;
            this.projectIndex = projectIndex;
            this.taskIndex = taskIndex;
        }
    }
    function addTask(title, details, dueDate, priority, projectIndex, taskIndex){
        let task = new Task(title, details, dueDate, priority, projectIndex, taskIndex);
        
        projects.projectsList[projectIndex].taskArr.push(task);
        localStorage.addToStorage(projects.projectsList);
    }
    function editTask(title, details, dueDate, priority, projectIndex, taskIndex){
        projects.projectsList[projectIndex].taskArr[taskIndex].title = title;
        projects.projectsList[projectIndex].taskArr[taskIndex].details = details;
        projects.projectsList[projectIndex].taskArr[taskIndex].dueDate = dueDate;
        projects.projectsList[projectIndex].taskArr[taskIndex].priority = priority;
        localStorage.addToStorage(projects.projectsList);
        //add domshow tasks or project
    }
    function getAllTasks(){
        let projectsFromStorage = projects.getAllProjects();
        let tasksList = [];
        let projectsArr = [];
        for (let i=0; i < projectsFromStorage.length; i++){
            projectsArr.push(projectsFromStorage[i]);
            for(let j=0; j <projectsArr[i].taskArr.length; j++){
                tasksList.push(projectsArr[i].taskArr[j])
            }
        }
        return tasksList;
    }
    //Testing Area
    projects.addProject('Project1', 0);
    addTask('first Task', 'this is my first todo', new Date(12/14/2022), 'low',0,0);
    addTask('second Task', 'this is my second todo', new Date(12/15/2022), 'low',0,1);
    projects.addProject('2ndProject', 1);
    editTask('still first task', 'this is my first todo',new Date(12/14/2022), 'medium',0,0);
    addTask('third Task', 'this is my 3rd todo', new Date(12/15/2022), 'high',1,1);
    console.log("printing list of all tasks")
    console.table(getAllTasks());

    return {
        addTask,
        editTask,
        getAllTasks
    }
})();

export default tasks;