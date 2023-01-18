import dom from './dom.js';
import listeners from './listeners.js';
import './style.css';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


document.addEventListener('DOMContentLoaded', dom);
//event fires when the HTML document has been completely parsed, and all deferred scripts (<script defer src="…"> and <script type="module">) have downloaded and executed. It doesn't wait for other things like images, subframes, and async scripts to finish loading.

dom.showMainTitle(0); //toggles the All tasks link and shows all tasks in storage
dom.showAllTasks(0); //start the page selecting the All category
dom.showAllProjects();
listeners.listenClicks(); //Adds eventlisteners for dom