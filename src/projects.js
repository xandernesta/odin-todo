import localStorage from './localstorage.js'

const projects = (() => {
    let projectsList = [];
    class Project {
        constructor(title, index){
            this.title = title;
            this.index = index;
            this.taskArr = [];
        }
    }
    function addProject(title,index){
        let project = new Project(title,index);
        projectsList.push(project);
        localStorage.addToStorage(projectsList);
        //add a dom show projects or tasks
    }
    function editProject(title,index,task){
        let projectsFromStorage = JSON.parse(localStorage.getFromStorage('projects'));
        projectsList = projectsFromStorage;
        projectsList[index].title = title;
    }
    function getAllProjects(){
        let projectsFromStorage = JSON.parse(localStorage.getFromStorage('projects'));
        projectsList = projectsFromStorage;

        return projectsList;
    }
    return {
        projectsList,
        addProject,
        editProject,
        getAllProjects
    };
})();

export default projects;
