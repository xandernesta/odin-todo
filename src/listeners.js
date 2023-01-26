import dom from './dom';
import tasks from './tasks.js';
import projects from './projects.js'
import {format, endOfDay, endOfWeek} from 'date-fns'

const handlers = (() => {
    
    function listenClicks(){
        //Variables to keep track of indexes and tasks
        let projectID;
        let taskID;    

        //Load selected Tasks from sidebar links
        document.addEventListener('click', (event) => {
            let {target} = event;
            const modalMainTitle = document.querySelector('.modal-main-title');
            const taskModal = document.querySelector('#task-modal');
            const form = document.querySelector('#form');
            let selectedLink = document.querySelector('.selected-link');
            let linkIndex = parseInt(target.getAttribute('data-link-index'), 10);
            //Adds selected class for styling and changing page Title
            if (target.classList.contains('select')){
                    dom.selectLink(target, linkIndex);
                    dom.changeMainTitle(target, linkIndex)
                    dom.changeTasksList(linkIndex)
            }
            //Click to reset form on click on add-task icon
            if(target.classList.contains('add-task')){
                //selects the .modal-header div and then the firstChild of that div which is the h2 that I want to change to Add Task
                let modalH2 = document.querySelector('.modal-header').firstChild;
                modalH2.textContent = "Add Task";
                let modalTaskButton = taskModal.querySelector('.modal-task-button');
                modalTaskButton.textContent = "Add";
                form.reset();
            }
            //Clicks in Modal on task icon for each task-div
            if (target.classList.contains('task-icon')) {
                projectID = parseInt(target.getAttribute('data-project-index'),10);
                taskID = parseInt(target.getAttribute('data-task-id'),10);
                
                if (target.classList.contains('edit-task')){
                    
                    console.log("retrieved task:", JSON.stringify(tasks.retrieveTask(projectID,taskID)))
                    let {title,details,dueDate,priority} = tasks.retrieveTask(projectID,taskID);
                    //selects the .modal-header div and then the firstChild of that div which is the h2 that I want to change to Edit Task
                    let modalH2 = document.querySelector('.modal-header').firstChild;
                    modalH2.textContent = "Edit Task";
                    //selects all the inputs and adds the task's info to the respective fields
                    let modalTitleInput = document.getElementById('modal-title');
                    modalTitleInput.value = title;
                    let modalTaskDetail = document.querySelector('.task-details');
                    modalTaskDetail.value = details;
                    let dueDateInput = document.getElementById('due-date');
                    dueDateInput.valueAsDate = new Date(dueDate); //.valueAsDate is a unique property for <input type=date> elements
                    let prioInput = document.querySelector('.task-priority');
                    prioInput.value = priority;
                    //changes the button from Add to Edit
                    let modalTaskButton = taskModal.querySelector('.modal-task-button');
                    modalTaskButton.textContent = "Edit";
                    modalTaskButton.classList.add('edit-submit');

                    //DISPLAYS THE PROJECT THE SELECTED TASK BELONGS TO
                    dom.selectProjectForTaskModal(projectID);
                }
                if (target.classList.contains('delete-task')){
                    projectID = parseInt(target.getAttribute('data-project-index'),10);
                    taskID = parseInt(target.getAttribute('data-task-id'),10);
                    let taskToDeleteTitle = document.querySelector('.task-to-delete-title');
                    let {title} = tasks.retrieveTask(projectID,taskID);
                    taskToDeleteTitle.textContent = ` "${title}"`;
                    /*  */

                }
            
            }
            //SUBMITTING EDITED TASK
            if (target.classList.contains('edit-submit')){
                let modalTitleInput = document.getElementById('modal-title');
                let modalTaskDetail = document.querySelector('.task-details');
                let dueDateInput = document.getElementById('due-date');
                let prioInput = document.querySelector('.task-priority');
                let projectSelector = document.querySelector('.project-titles');

                console.log("here is the task before edit:")
                console.table(tasks.retrieveTask(projectID,taskID))
                console.log(`here is modalTitleInput ${modalTitleInput.value}`);
                console.log(`here is projectInput ${modalTaskDetail.value}`)
                console.log(`here is projectInput ${projectID}`);
                console.log(`here is prirority Input ${prioInput.value}`);
                console.log(`here is taskInput ${taskID}`);
                tasks.editTask(String(modalTitleInput.value), String(modalTaskDetail.value), dueDateInput.valueAsDate, prioInput.value, parseInt(projectID), parseInt(projectSelector.value), parseInt(taskID));
                //dom.showAllTasks(selectedLink);
                //dom.selectLink(target, linkIndex)
            }
            // Click to Add task in Add-Task-Modal
            if (target.classList.contains('modal-task-button') && !target.classList.contains('edit-submit')){
                let modalTitleInput = document.getElementById('modal-title').value;
                let modalTaskDetail = document.querySelector('.task-details').value;
                let dueDateInput = document.getElementById('due-date').valueAsDate;
                let prioInput = document.querySelector('.task-priority').value;
                let projSelected =  document.querySelector('.project-titles');
                let projTitle = projSelected.options[projSelected.selectedIndex].text;
                let projectID = projects.findProjIndexFromTitle(projTitle);
                tasks.addTask(modalTitleInput, modalTaskDetail, dueDateInput, prioInput, projectID);
                //dom.showAllTasks(0);
            }
            //Deletion of Task only after selecting the delete button in modal
            if (target.classList.contains('modal-task-delete-button')){
                tasks.removeTask(projectID,taskID);
                dom.changeTasksList(selectedLink.getAttribute('data-link-index'));
            }


            //SELECTING EDIT PROJECT ICON
            if (target.classList.contains('edit-project')){
                let projectIconParent = (event.target.parentNode).parentNode;
                linkIndex = parseInt(projectIconParent.getAttribute('data-link-index'), 10);
                dom.selectLink(target, linkIndex, 'edit') //Trying to figure out why parts of the project buttons are not triggering the selected
            }

        })
    


        
    }

    return {
        listenClicks
/*         handleTaskIconClick,
        */
    };
})();

export default handlers