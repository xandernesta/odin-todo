//import Project
//import Task
//import format from date-fns

//DOM elements
//event listeners

const dom = (() => {
    //Dom Selectors
    const container = document.getElementById("projectContainer");
    //header Module
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
        const taskLinks = document.createElement('div');
        taskLinks.classList.add('task-links');
        //making a placeholder link and text until dynamic functionality added
        const link = document.createElement('a');
        link.classList.add('link','task-link', 'select');
        link.href = "#";
        link.setAttribute('data-link-index', '0');
        link.setAttribute('data-title', 'all');
            const pLink = document.createElement('p');
            pLink.classList.add('task-link-text','select');
            pLink.textContent = "All Tasks Placeholder";
        link.appendChild(pLink);
        //end of placeholder
        taskLinks.appendChild(link);
        sidebar.appendChild(taskLinks);

        return sidebar;

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
    

    container.appendChild(header);
    container.appendChild(sidebar);
    container.appendChild(footer);
})();

export default dom;