import localStorage from './localstorage.js'
// import tasks from './tasks.js'

const projects = (() => {
    let projectsList = [];
    class Project {
        constructor(title, id){
            this.title = title;
            this.id = id;
            this.taskArr = [];
        }
    }
    //Load some default projects from local storage for testing
    if(localStorage.getFromStorage('projects')=== null){
        projectsList = 
        [
            {
                title: 'Testing Project 1',
                id: 0,
                taskArr: [
                    {
                        title: 'test task 1 proj 1',
                        details: 'random assortment of details',
                        dueDate: '2/28/2023',
                        priority: 'low',
                        completed: false,
                        projectID: 0,
                        taskID: 0,
                        previousID: -1,
                        
            
                    },
                    {
                        title: "test task 2 proj 1",
                        details: "random assortment of details",
                        dueDate: '12/16/2022',
                        priority: 'medium',
                        completed: false,
                        projectID: 0,
                        taskID: 1, 
                        previousID: 0,
            
                    }
                ]
            }
        ];  
        localStorage.addToStorage(projectsList)
            
    } else {
        const projectsFromStorage = localStorage.getFromStorage('projects');
        projectsList = projectsFromStorage;
    }

    function addProject(title,id){
        let project = new Project(title,id);
        let projectsList = JSON.parse(localStorage.getFromStorage('projects'));
        projectsList.push(project);
        localStorage.addToStorage(projectsList);
        //add a dom show projects or tasks
    }
    function removeProject(projectID){
        let projectsFromStorage = projects.getAllProjects();
        //get project from projectID
        let projectToRemove = projectsFromStorage.find(proj => proj.id === projectID)
        let indexToRemove = projectsFromStorage.indexOf(projectToRemove);
        //remove it from that project
        if(indexToRemove > -1){
            projectsFromStorage.splice(indexToRemove,1);
            localStorage.addToStorage(projectsFromStorage);
        } else {
            console.error('could not remove because indexToRemove = ', indexToRemove)
        }
        
    }
    function editProject(title,projectID){
        projectsList = getAllProjects();
        let editProject = projectsList.find(proj => {
            return parseInt(proj.id,10) === projectID;
        })
        let editProjectIndex = projectsList.indexOf(editProject)
        projectsList[editProjectIndex].title = title;
        localStorage.addToStorage(projectsList);
    }
    function getAllProjects(){
        let projectsFromStorage = JSON.parse(localStorage.getFromStorage('projects'));
        let tasksList = [];
        let projectsList = [];
        for (let i=0; i < projectsFromStorage.length; i++){
            projectsList.push(projectsFromStorage[i]);
            for(let j=0; j <projectsList[i].taskArr.length; j++){
                tasksList.push(projectsList[i].taskArr[j])
            }
        }
        return projectsList;
    }
    function addTaskToProject(projectIndex,taskObj){
        projectsList = [];
        projectsList = getAllProjects();
        projectsList[projectIndex].taskArr.push(taskObj)
        localStorage.addToStorage(projectsList);
    }
    function retrieveProject(projectID){
        let projArr = getAllProjects();
        let foundProj = projArr.find(proj => {
            return parseInt(proj.id,10) === projectID;
        })
        return foundProj;
    }
    function findProjIDFromTitle(projectTitle){
        projectsList = [];
        projectsList = getAllProjects();
        console.table(projectsList);
        let filteredProject = projectsList.filter(project => String(project.title) == String(projectTitle) )
        let foundProjID = filteredProject[0].id
       if (foundProjID === null ){
        console.error('could not find Project from Title');
       }
       else{
        return  foundProjID;
       }
    }
    return {
        projectsList,
        addProject,
        removeProject,
        editProject,
        getAllProjects,
        addTaskToProject,
        retrieveProject,
        findProjIDFromTitle
    };
})();

export default projects;
