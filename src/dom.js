import projects from './projects.js'
import tasks from './tasks.js'
import {format, endOfDay, endOfWeek} from 'date-fns'
import localStorage from './localstorage.js'

//DOM elements
//event listeners

const dom = (() => {
    //Dom Selectors
    const container = document.getElementById('projectContainer');
    const taskLinksDiv = document.querySelector('.task-links');
    let mainContainer = document.getElementById('main');
    let tasksListDiv = document.querySelector('.tasks-list');
    format(new Date(1900, 1, 11), 'MM/dd/yyyy') // +> '01/11/1900'

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
        //circle plus sign icon- Add task button
        const taskAddIcon = document.createElement('i');
        taskAddIcon.classList.add('fa-solid','fa-circle-plus','add-task','hover-element','tooltip-icon');
        taskAddIcon.setAttribute('data-bs-toggle','modal');
        taskAddIcon.setAttribute('data-bs-target','#task-modal');
            const addTaskTooltip = document.createElement('span');
            addTaskTooltip.classList.add('add-task', 'tooltip-text');
            addTaskTooltip.textContent = 'Add a New Task';
            taskAddIcon.appendChild(addTaskTooltip);
            tasksTitleDiv.appendChild(taskAddIcon); //Add taskAddIcon to main-title-div
        //create AddTask modal
        const taskAddModal = document.createElement('div');
        taskAddModal.classList.add('modal','modal-card','fade');
        taskAddModal.setAttribute('id','task-modal');
            // create modal dialog nested under taskAddModal - for bootstrap
            const taskModalDialog = document.createElement('div');
            taskModalDialog.classList.add('modal-dialog', 'modal-dialog-centered');
            //create modal content nested under taskModalDialog - for boostrap
                const taskModalContent = document.createElement('div');
                taskModalContent.classList.add('modal-content');
                const taskModalContentForm = document.createElement('form');
                taskModalContentForm.setAttribute('id','form');
                // taskModalContentForm.setAttribute('novalidate','');
                taskModalContent.appendChild(taskModalContentForm);
                    const taskModalHeader = document.createElement('div');
                    taskModalHeader.classList.add('modal-header');
                        const taskModalH1 = document.createElement('h2');
                        taskModalH1.textContent = 'Add Task';
                        const taskModalH1CloseBtn = document.createElement('button');
                        taskModalH1CloseBtn.classList.add('btn-close');
                        taskModalH1CloseBtn.setAttribute('data-bs-dismiss','modal');
                        taskModalH1CloseBtn.setAttribute('data-bs-target','#task-modal');
                        taskModalHeader.appendChild(taskModalH1);
                        taskModalHeader.appendChild(taskModalH1CloseBtn);
                        taskModalContentForm.appendChild(taskModalHeader);
                    const taskModalBody = document.createElement('div');
                    taskModalBody.classList.add('modal-body');
                    taskModalBody.innerHTML = `

                    <!-- MODAL TITLE INPUT -->
                    <div class="form-group">
                      <label id="modal-title-label" for="modal-title">Title<span class="title-star">*</span></label>
                      <input type="text" class="form-control" id="modal-title" name="modal-title" required>
                      <!--<p class="modal-title-error hide">Please fill out this field.</p> -->
                    </div>
          
                    <!-- RADIO BUTTONS -->
                    <div class="radio-form hide">
                      <p>Icon</p>
                      <div class="project-icons">
                        <label class="radio-before">
                          <span class="radio-input">
                            <input type="radio" id="flower-daffodil" class="icon" name="projectFormIcon" value="fa-flower-daffodil" checked="">
                            <span class="radio-control"><i class="fal fa-flower-daffodil fa-fw"></i></span>
                          </span>
                        </label>
                        <label class="radio-before">
                          <span class="radio-input">
                            <input type="radio" id="book" class="icon" name="projectFormIcon" value="fa-book">
                            <span class="radio-control"><i class="fal fa-book fa-fw"></i></span>
                          </span>
                        </label>
                        <label class="radio-before">
                          <span class="radio-input">
                            <input type="radio" id="tools" class="icon" name="projectFormIcon" value="fa-tools">
                            <span class="radio-control"><i class="fal fa-tools fa-fw"></i></span>
                          </span>
                        </label>
                        <label class="radio-before">
                          <span class="radio-input">
                            <input type="radio" id="volleyball-ball" class="icon" name="projectFormIcon" value="fa-volleyball-ball">
                            <span class="radio-control"><i class="fal fa-volleyball-ball fa-fw"></i></span>
                          </span>
                        </label>
                        <label class=" radio radio-before">
                          <span class="radio-input">
                            <input type="radio" id="sack-dollar" class="icon" name="projectFormIcon" value="fa-sack-dollar">
                            <span class="radio-control"><i class="fal fa-sack-dollar fa-fw"></i></span>
                          </span>
                        </label>
                        <label class="radio radio-before">
                          <span class="radio-input">
                            <input type="radio" id="pizza-slice" class="icon" name="projectFormIcon" value="fa-pizza-slice">
                            <span class="radio-control"><i class="fal fa-pizza-slice fa-fw"></i></span>
                          </span>
                        </label>
                        <label class="radio-before">
                          <span class="radio-input">
                            <input type="radio" id="backpack" class="icon" name="projectFormIcon" value="fa-backpack">
                            <span class="radio-control"><i class="fal fa-backpack fa-fw"></i></span>
                          </span>
                        </label>
                        <label class="radio-before">
                          <span class="radio-input">
                            <input type="radio" id="gift" class="icon" name="projectFormIcon" value="fa-gift">
                            <span class="radio-control"><i class="fal fa-gift fa-fw"></i></span>
                          </span>
                        </label>
                      </div>
                    </div>
          
                    <!-- MODAL CONTENT FOR A TASK -->
                    
          
                      <!-- TASK DESCRIPTION -->
                      <div class="form-group">
                        <label for="task-details">Details</label>
                        <textarea class="task-details form-control" rows="3" cols="36"></textarea>
                      </div>
          
                      <!-- TASK DUE DATE -->
                      <div class="form-group">
                        <label for="dueDate">Due Date</label>
                        <input type="date" class="form-control" id="due-date" name="dueDate" required>
                      </div>
          
                      <!-- TASK PRIORITY -->
                      <div class="form-group">
                        <label for="priority">Priority</label>
                        <select class="task-priority form-select" name="priority" required>
                          <option value="" disabled="" selected="">Task's priority?</option>
                          <option value="low">😴 Low</option>
                          <option value="medium">😅 Medium</option>
                          <option value="high">😲 High</option>
                        </select>
                      </div>

                      <!-- PROJECTS LIST -->
                      <div class="form-group">
                      <label for="projects">Projects</label>
                      <select class="project-titles form-select" name="projects" required>
                        <option value="" disabled="" selected="">Projects</option>
                       <!-- <option value=""></option>  -->
                      </select>
                    </div>

                  `//NEED TO MAKE A NEW FORM FIELD FOR TASKS PROJECT
                    taskModalContentForm.appendChild(taskModalBody);
                    const taskModalFooter = document.createElement('div');
                    taskModalFooter.classList.add('modal-footer','modal-buttons');
                    taskModalFooter.innerHTML = `
                            <button type="btn-close" class="btn btn-light cancel-modal" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-primary modal-task-button">Add</button> 
                            `
                    taskModalContentForm.appendChild(taskModalFooter);

                //append content to dialog and dialog to taskModal
                taskModalDialog.appendChild(taskModalContent);
                taskAddModal.appendChild(taskModalDialog);
        tasksTitleDiv.appendChild(taskAddModal); //Add taskAddModal to main-title-div

        //creating the actual task list below the tasksTitleDiv
        let tasksListDiv = document.createElement('div');
        tasksListDiv.classList.add('tasks-list');
        mainTasksDiv.appendChild(tasksListDiv);

        main.appendChild(mainTasksDiv);

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
        const mainTitleText = document.querySelector('.main-title-text');
        mainTitleText.textContent = allMenuLinkTexts[index].textContent;
 
    }
    function changeMainTitle(target, index){
        //mainTitleIcon.className = '';
      const mainTitleText = document.querySelector('.main-title-text');

      // TITLE OF TASKS FROM THE MENU
      if (
        target.classList.contains('task-link') ||
        //target.classList.contains('menu-link-icon') ||
        target.classList.contains('task-link-text')
      ) {
        showMainTitle(index);
      }
      
      // TITLE OF PROJECT FROM MENU
      if (
        target.classList.contains('project-link') ||
        //target.classList.contains('project-icon') ||
        target.classList.contains('project-text') ||
        target.classList.contains('delete-project') ||
        target.classList.contains('edit-project') ||
        target.classList.contains('project-icon-and-text-div') ||
        target.classList.contains('project-default-icons-div')
      ) {
        let projectsList = [];
        let dataLinkIndex = index;
        projectsList = projects.getAllProjects();
        let title = projectsList[index-4].title;
        console.table(projectsList)
        mainTitleText.textContent = title;
      }
    }
    function showAllTasks(index){
        const allTasksList = tasks.getAllTasks()
        changeTasksList(index);
    }

    function changeTasksList(linkIndex){
        const tasksList = tasks.getAllTasks();
        const projectsList = projects.getAllProjects();
        let currentTasksList = [];
        const today = new Date();
        let tasksListDiv = document.querySelector('.tasks-list');

        //filter all tasks down according to the link selected
        switch (linkIndex) {
            case 0:
                currentTasksList = tasksList;
                generateTasksDom(currentTasksList);
                break;
            case 1:
                currentTasksList = tasksList.filter(task => {
                const dateDue = new Date(task.dueDate);
                return dateDue <= endOfDay(today)
                });
                console.log(`${endOfDay(today)}`);
                console.log('Today tasklist: ');
                console.log(tasksList);
                console.log('Today CurrentTaskslist: ');
                console.table(currentTasksList);
                generateTasksDom(currentTasksList);
                break;
            case 2:
                currentTasksList = tasksList.filter(task =>  {               
                const dateDue = new Date(task.dueDate);
                return dateDue <= endOfWeek(today)
                    
                });
                console.log('tasklist: ');
                console.table(tasksList);
                console.log('currentTasksList: ');
                console.table(currentTasksList);
                generateTasksDom(currentTasksList);
                break;
            case 3:
                currentTasksList = tasksList
                console.log('tasklist: ');
                console.table(tasksList);
                console.log('CurrentTaskslist: ');
                console.table(currentTasksList);
                generateTasksDom(currentTasksList);
                break;

            default:
              currentTasksList = tasksList.filter(task => {
                return task.projectIndex === linkIndex-4
              });
              generateTasksDom(currentTasksList);
        }
    }
    function generateTasksDom(array){
        let currentTasksList = array;
        let tasksListDiv = document.querySelector('.tasks-list');
        let tasksCount = document.querySelector('.tasks-count');
        let tasksNumber = 0;
        tasksListDiv.innerHTML = '';
        //Loops through array to generate new tasks list
        for(let i = 0; i < currentTasksList.length; i++){
            const taskDiv = document.createElement('div');
            const taskIconAndTextDiv = document.createElement('div');
            const taskIcon = document.createElement('i');
            const taskText = document.createElement('p');
            const taskInfo = document.createElement('div');
            const taskDate = document.createElement('p');
            const taskEditIcon = document.createElement('i');
            const taskTrashIcon = document.createElement('i');
            //not sure I want these
            //const taskInfoIcon = document.createElement('i');
         
            tasksNumber = i+1;
            tasksCount.textContent = `(${tasksNumber})`;
            taskDiv.classList.add('task-div', 'hover-element');
            taskIconAndTextDiv.classList.add('flex');
            taskDiv.setAttribute('data-project-index', currentTasksList[i].projectIndex);
            taskDiv.setAttribute('data-task-index', currentTasksList[i].taskIndex);

            if (currentTasksList[i].priority === 'low') {
            taskIcon.classList.add('low-priority');
            } else if (currentTasksList[i].priority === 'medium') {
            taskIcon.classList.add('mid-priority');
            } else if (currentTasksList[i].priority === 'high') {
            taskIcon.classList.add('high-priority');
            } else {
            taskIcon.classList.add('fal', 'padding-right');
            } 
            taskIcon.setAttribute('data-project-index', currentTasksList[i].projectIndex);
            taskIcon.setAttribute('data-task-index', currentTasksList[i].taskIndex);
            taskText.classList.add('task-text');
            taskText.textContent = currentTasksList[i].title;
            taskText.setAttribute('data-project-index', currentTasksList[i].projectIndex);
            taskText.setAttribute('data-task-index', currentTasksList[i].taskIndex);

            // TASK INFO DIV
            taskInfo.classList.add('flex');

            // TASKS DUE DATE
            taskDate.classList.add('due-date', 'padding-right');
            if (currentTasksList[i].dueDate !== undefined) {
            taskDate.textContent = format(new Date(currentTasksList[i].dueDate), 'MM/dd/yyyy');
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
            taskEditIcon.setAttribute('data-project-index', currentTasksList[i].projectIndex);
            taskEditIcon.setAttribute('data-task-index', currentTasksList[i].taskIndex);
            taskEditIcon.setAttribute('data-bs-toggle','modal');
            taskEditIcon.setAttribute('data-bs-target','#task-modal');

            // TASK DELETE ICON
            taskTrashIcon.classList.add(
                'fa-solid',
                'fa-trash-can',
                'delete-task',
                'task-icon',
                'scale-element',
                'padding-right'
            );
            taskTrashIcon.setAttribute('data-project-index', currentTasksList[i].projectIndex);
            taskTrashIcon.setAttribute('data-task-index', currentTasksList[i].taskIndex);

            // TASK INFO ICON - not I want 
/*             taskInfoIcon.classList.add(
                'fa-solid',
                'task-icon',
                'scale-element',
                'fa-circle-info'
            );
            taskInfoIcon.setAttribute('data-project-index', currentTasksList[i].projectIndex);
            taskInfoIcon.setAttribute('data-task-index', currentTasksList[i].taskIndex); */

                // APPENDS
            taskIconAndTextDiv.appendChild(taskIcon);
            taskIconAndTextDiv.appendChild(taskText);
            taskInfo.appendChild(taskDate);
            taskInfo.appendChild(taskEditIcon);
            taskInfo.appendChild(taskTrashIcon);
            //not sure I want
            //taskInfo.appendChild(taskInfoIcon);
            taskDiv.appendChild(taskIconAndTextDiv);
            taskDiv.appendChild(taskInfo);
            tasksListDiv.appendChild(taskDiv);

        }
    }
    function showAllProjects(){
      let projectsArr = projects.getAllProjects();
      generateProjectsLinks(projectsArr);
      populateModalProjectTitles(projectsArr);
    }
    function generateProjectsLinks(projectsArr){
      const projectsCount = document.querySelector('.projects-count');
      let projectsLinksDiv = document.querySelector('.project-links-div');

      projectsCount.textContent = projectsArr.length;
      projectsLinksDiv.textContent = '';

      for (let i = 0; i < projectsArr.length; i++){
        const projectLink = document.createElement('a');
        const projectIconAndTextDiv = document.createElement('div');
        //const projectIcon = document.createElement('i');
        const projectText = document.createElement('p');
        const projectIconsDiv = document.createElement('div');
        const projectEditIcon = document.createElement('i');
        const projectTrashIcon = document.createElement('i');

        // PROJECT ICON/TEXT AND DEFAULT ICONS DIVS AND ELEMENTS
        projectIconAndTextDiv.classList.add(
          'project-icon-and-text-div',
          'project',
          'select'
        );
        projectIconAndTextDiv.setAttribute('data-link-index', i+4); //i+4 because there will be 4 links for all task above the projects, projects need their own data-link-index so changeTasksList can by default show task belonging to a specific project
        projectIconsDiv.classList.add(
          'project-default-icons-div',
          'project',
          'select'
        );
        projectIconsDiv.setAttribute('data-link-index', i+4);
        
        // PROJECT LINKS CLASSES AND ATTRIBUTES
        projectLink.classList.add('link', 'project-link', 'project', 'select');
        projectLink.setAttribute('href', '#');
        projectLink.setAttribute('data-link-index', i+4);
        
        // PROJECT TEXT
        projectText.classList.add('project-text', 'project', 'select');
        projectText.textContent = projectsArr[i].title;
        projectText.setAttribute('data-link-index', i+4);

        // PROJECT DEFAULT ICONS
        projectEditIcon.classList.add(
          'fa-regular',
          'fa-pen-to-square',
          'project',
          'project-icon',
          'edit-project',
          'select',
          'scale-element',
          'padding-right'
        );
        projectEditIcon.setAttribute('data-link-index', i+4);

        projectTrashIcon.classList.add(
          'fa-solid',
          'fa-trash-can',
          'project',
          'project-icon',
          'delete-project',
          'select',
          'scale-element'
        );
        projectTrashIcon.setAttribute('data-link-index', i+4);

        // APPENDS
        projectIconsDiv.appendChild(projectEditIcon);
        projectIconsDiv.appendChild(projectTrashIcon);
        //projectIconAndTextDiv.appendChild(projectIcon);
        projectIconAndTextDiv.appendChild(projectText);
        projectLink.appendChild(projectIconAndTextDiv);
        projectLink.appendChild(projectIconsDiv);
        projectsLinksDiv.appendChild(projectLink);
      }
    }
    function populateModalProjectTitles(projectsArr){
      let projectTitles = document.querySelector('.project-titles')
      for(let i =0; i < projectsArr.length; i++){
        projectTitles.options[projectTitles.options.length] = new Option(projectsArr[i].title, i);
      }
    }
    function selectTaskModalProject (projectIndex){
      let selectedProject = document.querySelector('.project-titles');
      selectedProject.value = projectIndex;
      //selectedProject.setAttribute('selected');
      
    }
    return {
        selectLink,
        showMainTitle,
        changeMainTitle,
        showAllTasks,
        changeTasksList,
        showAllProjects,
        selectTaskModalProject
    }
})();

export default dom;