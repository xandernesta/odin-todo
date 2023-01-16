import dom from './dom';
import tasks from './tasks.js';
import {format, endOfDay, endOfWeek} from 'date-fns'

const handlers = (() => {
    
    function listenClicks(){
        //Variables to keep track of indexes and tasks
        let projectIndex;
        let taskIndex;    

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
                form.reset();
            }
            //Clicks in Modal on task icon for each task-div
            if (target.classList.contains('task-icon')) {
                let projectIndex = parseInt(target.getAttribute('data-project-index'),10);
                let taskIndex = parseInt(target.getAttribute('data-task-index'),10);
                
                if (target.classList.contains('edit-task')){
                    
                    console.log(JSON.stringify(tasks.retrieveTask(projectIndex,taskIndex)))
                    let [{title,details,dueDate,priority}] = tasks.retrieveTask(projectIndex,taskIndex);
                    console.log(dueDate);
                    let modalTitleInput = document.getElementById('modal-title');
                    modalTitleInput.value = title;
                    
                    let modalTaskDetail = document.querySelector('.task-details');
                    modalTaskDetail.value = details;
                    let dueDateInput = document.getElementById('due-date');
                    dueDateInput.valueAsDate = new Date(dueDate); //.valueAsDate is a unique property for <input type=date> elements
                    let prioInput = document.querySelector('.task-priority');
                    prioInput.value = priority;
                    
                }
            /*  if (target.classList.contains('delete-task')){
                //TODO
                return
            }
            if (target.classList.contains('delete-task')){
                //TODO
                return
            }
            */
            } 



        })

        
        
    }

    return {
        listenClicks
/*         handleTaskIconClick,
        editTask */
    };
})();

export default handlers