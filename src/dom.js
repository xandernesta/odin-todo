import projects from './projects.js'
import tasks from './tasks.js'
//import format from date-fns
import localStorage from './localstorage.js'

//DOM elements
//event listeners

const dom = (() => {
    //Dom Selectors
    const container = document.getElementById("projectContainer");
    const taskLinksDiv = document.querySelector('.task-links');
    let mainContainer = document.getElementById('main');
    let tasksListDiv = document.querySelector('.tasks-list');

    //creates header
    const header = (() => {
        const header = document.createElement('header');
        header.classList.add('header');
        const todoIcon = document.createElement('i');
        todoIcon.classList.add('fa-solid');
        todoIcon.classList.add('fa-list-check');
        header.appendChild(todoIcon);
        const logo = document.createElement('h1');
        logo.classList.add('logo');
        logo.textContent = 'To-Do';
        header.appendChild(logo);
    
        return header;
        
    })();
    //sidebar
    const sidebar = (() => {
        const sidebar = document.createElement('nav');
        sidebar.setAttribute('id', 'sidebar');

        //Create upper half of sidebar - Links to task pages
        const taskLinks = document.createElement('div');
        taskLinks.classList.add('task-links');
        //First link - All
        const link1 = document.createElement('a');
        link1.classList.add('link','task-link','select', 'selected-link'); //adding first selected for initial highlighting
        link1.href = "#";
        link1.setAttribute('data-link-index', '0');
        link1.setAttribute('data-title', 'all');
            const pLink1 = document.createElement('p');
            pLink1.classList.add('task-link-text','select');
            pLink1.textContent = "All";
        link1.appendChild(pLink1);
        //Second link - Today
        const link2 = document.createElement('a');
        link2.classList.add('link','task-link','select');
        link2.href = "#";
        link2.setAttribute('data-link-index', '1');
        link2.setAttribute('data-title', 'today');
            const pLink2 = document.createElement('p');
            pLink2.classList.add('task-link-text','select');
            pLink2.textContent = "Today";
        link2.appendChild(pLink2);
        //Third link - This Week
        const link3 = document.createElement('a');
        link3.classList.add('link','task-link','select');
        link3.href = "#";
        link3.setAttribute('data-link-index', '2');
        link3.setAttribute('data-title', 'week');
            const pLink3 = document.createElement('p');
            pLink3.classList.add('task-link-text','select');
            pLink3.textContent = "This Week";
        link3.appendChild(pLink3);
        //Fourth link - Completed
        const link4 = document.createElement('a');
        link4.classList.add('link','task-link','select');
        link4.href = "#";
        link4.setAttribute('data-link-index', '3');
        link4.setAttribute('data-title', 'completed');
            const pLink4 = document.createElement('p');
            pLink4.classList.add('task-link-text','select');
            pLink4.textContent = "Completed";
        link4.appendChild(pLink4);
        //append this to taskLinks div
        taskLinks.appendChild(link1);
        taskLinks.appendChild(link2);
        taskLinks.appendChild(link3);
        taskLinks.appendChild(link4);
        sidebar.appendChild(taskLinks);

        //Create lower half of sidebar - Links to Project pages
        const projectNavDiv = document.createElement('div');
        projectNavDiv.setAttribute('id','nav-projects');
            const projectLinksTitleDiv = document.createElement('div');
            projectLinksTitleDiv.classList.add('nav-projects-title');
                const projectsTitle = document.createElement('p');
                projectsTitle.textContent = `Projects `;
                const projectsCount = document.createElement('span');
                let count = 0;
                projectsCount.classList.add("projects-count");
                projectsCount.textContent = `(${count})`; //initialized to 0, should change with new projects added`
                projectsTitle.appendChild(projectsCount);
                //circle plus sign icon
                const projectAddIcon = document.createElement('i');
                projectAddIcon.classList.add('fa-solid','fa-circle-plus','add-project','hover-element','tooltip-icon');
                    const addProjectTooltip = document.createElement('span');
                    addProjectTooltip.classList.add('add-project', 'tooltip-text');
                    addProjectTooltip.textContent = 'Add a New Project';
                    projectAddIcon.appendChild(addProjectTooltip);
            projectLinksTitleDiv.appendChild(projectsTitle);
            projectLinksTitleDiv.appendChild(projectAddIcon);
        projectNavDiv.appendChild(projectLinksTitleDiv);
            const projectLinksDiv = document.createElement('div');
            projectLinksDiv.classList.add('project-links-div');
            projectNavDiv.appendChild(projectLinksDiv);

        sidebar.appendChild(projectNavDiv);
        
        return sidebar;

    })();
    //main
    const main = (() => {
        const main = document.createElement('main');
        main.setAttribute('id', 'main');
        //creating Two main Divs for main element, one being the title of the screen and the other being the list of task with it's own title of Tasks
        let mainTitleDiv = document.createElement('div');
        mainTitleDiv.classList.add('main-title-div');
        let mainTitleText = document.createElement('h1');
        mainTitleText.classList.add('main-title-text');
        mainTitleDiv.appendChild(mainTitleText); //Add h1 to main-title-div
        main.appendChild(mainTitleDiv); //Add main-title elements to main container
        //second of the two divs with it respective elements
        let mainTasksDiv = document.createElement('div');
        mainTasksDiv.classList.add('tasks-div');
        let tasksTitleDiv = document.createElement('div');
        tasksTitleDiv.classList.add('tasks-title-div');
        let tasksTitle = document.createElement('div');
        tasksTitle.classList.add('tasks-title');
        let tasksTitleP = document.createElement('p');
        tasksTitleP.textContent = 'Tasks';
        let tasksTitleCount = document.createElement('span');
        tasksTitleCount.classList.add('tasks-count');
        tasksTitleCount.textContent = '()';
        tasksTitleP.appendChild(tasksTitleCount);
        tasksTitle.appendChild(tasksTitleP);
        tasksTitleDiv.appendChild(tasksTitle);
        mainTasksDiv.appendChild(tasksTitleDiv);
        //creating the actual task list below the tasksTitleDiv
        let tasksListDiv = document.createElement('div');
        tasksListDiv.classList.add('tasks-list');
        mainTasksDiv.appendChild(tasksListDiv);

        main.appendChild(mainTasksDiv);



        //mainTitleDiv.appendChild(mainTitleText); //Add h1 to main-title-div
        //main.appendChild(mainTitleDiv); //Add main-title elements to main container

        
        return main;
    })();
    //footer
    const footer = (() => {
        const footer = document.createElement('footer');
        footer.classList.add('footer');

        const pFooter = document.createElement('p');
        pFooter.innerHtml = '&nbsp;';
        pFooter.textContent = "Xander";
        pFooter.innerHtml += '&nbsp;';
        pFooter.textContent +="© 2022";
        footer.appendChild(pFooter);
        //add link and icon after text
        const ghubLink = document.createElement('a');
        ghubLink.href = "https://github.com/xandernesta/odin-restaurant/";
        const ghubImg = document.createElement('i');
        ghubImg.classList.add('fa-github');
        ghubImg.classList.add('fa-brands');
        ghubImg.setAttribute('alt','github icon');
        ghubLink.appendChild(ghubImg);
        footer.appendChild(ghubLink);

        return footer;
    })();
    
    //Add main elements to container div
    container.appendChild(header);
    container.appendChild(sidebar);
    container.appendChild(main);
    container.appendChild(footer);


    function selectLink(target, index, action) {
        const allLinks = document.querySelectorAll('.link');
        allLinks.forEach((link) => { 
            link.classList.remove('selected-link');
        });
        // IF CLICKED DIRECTLY ON LINK (BOTH - MENU OR PROJECT)
        if (target.classList.contains('link')) {
            target.classList.add('selected-link');
        }
    }

    function showMainTitle(index){
        const allMenuLinkTexts = document.querySelectorAll('.task-link-text');
        const mainTitleText = document.querySelector('.main-title-text')
        mainTitleText.textContent = allMenuLinkTexts[index].textContent;
 
    }
    function changeMainTitle(target, index){
        //mainTitleIcon.className = '';

        // TITLE OF TASKS FROM THE MENU
        if (
          target.classList.contains('task-link') ||
          //target.classList.contains('menu-link-icon') ||
          target.classList.contains('task-link-text')
        ) {
          showMainTitle(index);
        }
    }
    function showAllTasks(linkTitle){
        let tasksNumber = 0;
        const tasksList = tasks.getAllTasks()
        const projectsList = projects.getAllProjects();
        let tasksListDiv = document.querySelector('.tasks-list');
        let tasksCount = document.querySelector('.tasks-count');
/*         let mainTasksDiv = document.querySelector('.tasks-div')
        mainTasksDiv.removeChild(tasksListDiv); 
        tasksListDiv.innerHtml = ''; */
        tasksList.textContent = ''; 

        for(let i =0; i < tasksList.length; i++){
            const taskDiv = document.createElement('div');
            const taskIconAndTextDiv = document.createElement('div');
            const taskIcon = document.createElement('i');
            const taskText = document.createElement('p');
            const taskInfo = document.createElement('div');
            const taskDate = document.createElement('p');
            const taskEditIcon = document.createElement('i');
            const taskTrashIcon = document.createElement('i');
            const taskInfoIcon = document.createElement('i');
            /* if(linkTitle === 'all'){
                
            } */
            tasksNumber = i+1;
            tasksCount.textContent = `(${tasksNumber})`;
            taskDiv.classList.add('task-div', 'hover-element');
            taskIconAndTextDiv.classList.add('flex');
            taskDiv.setAttribute('data-project-index', tasksList[i].projectIndex);
            taskDiv.setAttribute('data-task-index', tasksList[i].taskIndex);

            /* if (tasksList[i].priority === 'low') {
            taskIcon.classList.add('low-priority');
            } else if (tasksList[i].priority === 'medium') {
            taskIcon.classList.add('mid-priority');
            } else if (tasksList[i].priority === 'high') {
            taskIcon.classList.add('high-priority');
            } else {
            taskIcon.classList.add('fal', 'padding-right');
            } */
            /* taskIcon.setAttribute('data-project-index', tasksList[i].projectIndex);
            taskIcon.setAttribute('data-task-index', tasksList[i].taskIndex); */
            taskText.classList.add('task-text');
            taskText.textContent = tasksList[i].title;
            taskText.setAttribute('data-project-index', tasksList[i].projectIndex);
            taskText.setAttribute('data-task-index', tasksList[i].taskIndex);

            // TASK INFO DIV
            taskInfo.classList.add('flex');

            // TASKS DUE DATE
            taskDate.classList.add('due-date', 'padding-right');
            if (tasksList[i].date !== undefined) {
            taskDate.textContent = tasksList[i].date;
            } else {
            taskDate.textContent = '';
            }

            // TASK EDIT ICON
            taskEditIcon.classList.add(
            'fa-regular',
            'fa-pen-to-square',
            'edit-task',
            'task-icon',
            'scale-element',
            'padding-right'
            );
            taskEditIcon.setAttribute('data-project-index', tasksList[i].projectIndex);
            taskEditIcon.setAttribute('data-task-index', tasksList[i].taskIndex);

            // TASK DELETE ICON
            taskTrashIcon.classList.add(
            'fa-solid',
            'fa-trash-can',
            'delete-task',
            'task-icon',
            'scale-element',
            'padding-right'
            );
            taskTrashIcon.setAttribute('data-project-index', tasksList[i].projectIndex);
            taskTrashIcon.setAttribute('data-task-index', tasksList[i].taskIndex);

            // TASK INFO ICON
            taskInfoIcon.classList.add(
                'fa-solid',
                'task-icon',
                'scale-element',
                'fa-circle-info'
            );
            taskInfoIcon.setAttribute('data-project-index', tasksList[i].projectIndex);
            taskInfoIcon.setAttribute('data-task-index', tasksList[i].taskIndex);

                // APPENDS
            taskIconAndTextDiv.appendChild(taskIcon);
            taskIconAndTextDiv.appendChild(taskText);
            taskInfo.appendChild(taskDate);
            taskInfo.appendChild(taskEditIcon);
            taskInfo.appendChild(taskTrashIcon);
            taskInfo.appendChild(taskInfoIcon);
            taskDiv.appendChild(taskIconAndTextDiv);
            taskDiv.appendChild(taskInfo);
            tasksListDiv.appendChild(taskDiv);

        } 
        
       // mainTasksDiv.appendChild(tasksListDiv);
    }

 
    return {
        selectLink,
        showMainTitle,
        changeMainTitle,
        showAllTasks
    }
})();

export default dom;