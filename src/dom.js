import projects from './projects.js'
import tasks from './tasks.js'
//import format from date-fns
import localStorage from './localstorage.js'

//DOM elements
//event listeners

const dom = (() => {
    //Dom Selectors
    const container = document.getElementById("projectContainer");
    const taskLinksDiv = document.querySelector('.task-links')

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
        link1.classList.add('link','task-link','select');
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
        link2.setAttribute('data-title', 'all');
            const pLink2 = document.createElement('p');
            pLink2.classList.add('task-link-text','select');
            pLink2.textContent = "Today";
        link2.appendChild(pLink2);
        //Third link - This Week
        const link3 = document.createElement('a');
        link3.classList.add('link','task-link','select');
        link3.href = "#";
        link3.setAttribute('data-link-index', '2');
        link3.setAttribute('data-title', 'all');
            const pLink3 = document.createElement('p');
            pLink3.classList.add('task-link-text','select');
            pLink3.textContent = "This Week";
        link3.appendChild(pLink3);
        //Fourth link - Completed
        const link4 = document.createElement('a');
        link4.classList.add('link','task-link','select');
        link4.href = "#";
        link4.setAttribute('data-link-index', '3');
        link4.setAttribute('data-title', 'all');
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

    //Load selected Task
    document.addEventListener('click', (event) =>{
        const {target} = event;
        const selectedLink = document.querySelector('.selected-link');
        const linkIndex = parseInt(target.getAttribute('data-link-index'), 10);

        if (target.classList.contains('select')){
            selectLink(target, linkIndex);
            //changeMainTitle
        }
    })
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
})();

export default dom;