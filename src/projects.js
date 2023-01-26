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
/*         get title(){
            return this._title;
        } */
    }
    //Load some default projects from local storage for testing
    if(localStorage.getFromStorage('projects')=== null){
        /*     addProject("Testing Project 1", 0)
        addProject("2nd Testing Project", 1)
        tasks.addTask('test task 1 proj 1','random assortment of details', '2/28/2023','low',0)
        tasks.addTask('test task 2 proj 1','random assortment of details', '12/16/2022','low',0)
        tasks.addTask('test task 3 proj 1','random assortment of details', '12/17/2022','high',0)
        tasks.addTask('task4 testing proj 2','random assortment of details', '2/18/2023','high',1) */
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
                        projectID: 0,
                        taskID: 0,
                        previousID: -1,
            
                    },
                    {
                        title: "test task 2 proj 1",
                        details: "random assortment of details",
                        dueDate: '12/16/2022',
                        priority: 'low',
                        projectID: 0,
                        taskID: 1, 
                        previousID: 0,
            
                    }
                ]
            }/*,
            {
                title: '2nd Testing Project',
                taskArr: [
                    {
                        title: "task4 testing proj 2",
                        details: "random assortment of details",
                        dueDate: '2/18/2023',
                        priority: 'high',
                        projectID: 1,
                        taskID: 3,
            
                    }
                ],
                id: 1
            } */
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
    function editProject(title,id,task){
        let projectsFromStorage = JSON.parse(localStorage.getFromStorage('projects'));
        projectsList = projectsFromStorage;
        projectsList[id].title = title;
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
    function findProjIndexFromTitle(projectTitle){
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
        editProject,
        getAllProjects,
        addTaskToProject,
        findProjIndexFromTitle
    };
})();

export default projects;
