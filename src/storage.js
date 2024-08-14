import { UserInterface } from "./DOMEvents";
import Project from "./project";

export default class StorageController {
    constructor(tasks){
        if (localStorage.getItem('tasks') === null){
            this.tasks = new Array();
        }else {
            this.tasks = JSON.parse(localStorage.getItem('tasks'));
        }
    }

    static saveTask(task) {
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static getTasks(){
        return JSON.parse(localStorage.getItem('tasks'));
    }
}

