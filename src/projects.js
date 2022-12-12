import localStorage from './localstorage.js'

const projects = (() => {
    const projectFactory = (title, index) => {
        let taskArr = new Array();

        return {title, taskArr, index};
    }
    return {
        projectFactory
    };

})();

export default projects;
