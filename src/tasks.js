import localStorage from './localstorage.js'
import projects from './projects.js'
import {format, compareAsc, differenceInDays} from 'date-fns';

const tasks = (() => {
    format(new Date(1900, 1, 11), 'MM/dd/yyyy') // +> '01/11/1900'

    const taskFactory = (title, details, dueDate, priority, project, index) => {
        //generate index?
        return {title, details, dueDate, priority, project, index};
    }

    function createTask(){
        const task = taskFactory('task1','these are task1 details', new Date(2023, 1, 11), 'low', 'Project1', 0); //test task, inputs will come from dom
        const project = projects.projectFactory(`${task.project}`, 0);
        project.taskArr.push(task);
        localStorage.addToStorage(project);
    }
    createTask();
})();

export default tasks;