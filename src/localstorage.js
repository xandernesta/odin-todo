/* 
localStorage.setItem() to create a new key-value pair
localStorage.getItem() to retrieve the value of a key
localStorage.removeItem() to remove a specific pair
localStorage.clear() deletes ALL saved pairs for that domain 
*/

const localStorage = (() => {
    function addToStorage(obj){
        this.obj = obj; //should have title, details, dueDate, priority (low, medium, high), data-task-index

        window.localStorage.setItem(this.obj.index, JSON.stringify(obj));
        console.log(`Task: ${this.obj.title} has been added to storage with key: ${this.obj.index}`);
    }
    function getFromStorage(index){
        return window.localStorage.getItem(index);
    }
    function deleteFromStorage(index){
        window.localStorage.removeItem(index);
    }
    function clearStorage(){
        window.localStorage.clear();
    }
    return {
        addToStorage,
        getFromStorage,
        deleteFromStorage,
        clearStorage
    };
})();

export default localStorage;