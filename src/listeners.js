import dom from './dom';
import tasks from './tasks.js';

const handlers = (() => {
    
    function listenClicks(){
        //Variables to keep track of indexes and tasks
        let projectIndex;
        let taskIndex;    
        //Load selected Tasks from sidebar links
        document.addEventListener('click', (event) =>{
            const {target} = event;
            const selectedLink = document.querySelector('.selected-link');
            const linkIndex = parseInt(target.getAttribute('data-link-index'), 10);

            //Adds selected class for styling and changing page Title
            if (target.classList.contains('select')){
/*                 if(linkIndex === 0){
                    if (target.classList.contains('selected-link')){
                        return
                    }
                    else{
                        dom.selectLink(target, linkIndex);
                        dom.changeTasksList(linkIndex);
                    }
                }
                else{ */
                    dom.selectLink(target, linkIndex);
                    dom.changeMainTitle(target, linkIndex)
                    dom.changeTasksList(linkIndex)
                //}
            }
        })

    }

    return {
        listenClicks
    };
})();

export default handlers