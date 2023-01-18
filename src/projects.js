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
        localStorage.addToStorage(projectsList);
    }
    function getAllProjects(){
        let projectsFromStorage = JSON.parse(localStorage.getFromStorage('projects'));
        let tasksList = [];
        let projectsArr = [];
        for (let i=0; i < projectsFromStorage.length; i++){
            projectsArr.push(projectsFromStorage[i]);
            for(let j=0; j <projectsArr[i].taskArr.length; j++){
                tasksList.push(projectsArr[i].taskArr[j])
            }
        }

        return projectsArr;
    }
    console.log("I am getting all projects!:")
    console.table(getAllProjects());
    return {
        projectsList,
        addProject,
        editProject,
        getAllProjects
    };
})();

export default projects;
