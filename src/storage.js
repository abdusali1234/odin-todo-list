import { UserInterface } from "./DOMEvents";
import Project from "./project";

export default class StorageController {
    // constructor(tasks){
    //     if (localStorage.getItem('tasks') === null){
    //         this.tasks = new Array();
    //     }else {
    //         this.tasks = JSON.parse(localStorage.getItem('tasks'));
    //     }
    // }

    static tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    static projects = JSON.parse(localStorage.getItem('projects')) || [];

    static saveTask(task) {
        this.tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    static getTasks(){
        return JSON.parse(localStorage.getItem('tasks'));
    }

    static saveProject(project) {
        this.projects.push(project);
        localStorage.setItem('projects', JSON.stringify(this.projects));
    }

    static getProjects(){
        return JSON.parse(localStorage.getItem('projects'));
    }
}

