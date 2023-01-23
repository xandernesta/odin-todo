import localStorage from './localstorage.js'

const projects = (() => {
    let projectsList = [];

    //Load some default projects from local storage for testing
    if(localStorage.getFromStorage('projects')=== null){
         projectsList = 
        [
            {
                title: 'Testing Project 1',
                taskArr: [
                    {
                        title: 'test task 1 proj 1',
                        details: 'random assortment of details',
                        dueDate: '2/28/2023',
                        priority: 'low',
                        projectIndex: 0,
                        taskID: 0,
            
                    },
                    {
                        title: "test task 2 proj 1",
                        details: "random assortment of details",
                        dueDate: '12/16/2022',
                        priority: 'low',
                        projectIndex: 0,
                        taskID: 1,
            
                    },
                    {
                        title: "test task 3 proj 1",
                        details: "random assortment of details",
                        dueDate:'12/17/2022' ,
                        priority: 'high',
                        projectIndex: 0,
                        taskID: 2,
            
                    }
                ],
                index: 0
            },
            {
                title: '2nd Testing Project',
                taskArr: [
                    {
                        title: "task4 testing proj 2",
                        details: "random assortment of details",
                        dueDate: '2/18/2023',
                        priority: 'high',
                        projectIndex: 1,
                        taskID: 3,
            
                    }
                ],
                index: 1
            }
        ]; 
        localStorage.addToStorage(projectsList);
            
    } else {
        const projectsFromStorage = localStorage.getFromStorage('projects');
        projectsList = projectsFromStorage;
    }

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
        console.log("prinnting new task array after adding the task to this project:")
        console.table(projectsList[projectIndex].taskArr)
    }
    return {
        projectsList,
        addProject,
        editProject,
        getAllProjects,
        addTaskToProject
    };
})();

export default projects;
