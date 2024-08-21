import { UserInterface } from "./DOMEvents";
import Project from "./project";
import Task from "./task";

export default class StorageController {

    static tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    static projects = JSON.parse(localStorage.getItem('projects')) || [];

    static addTask(task) {
        StorageController.tasks.push(task);
    }

    static getAllTasks(){
        return StorageController.tasks;
    }

    static deleteTask(taskId){
        const taskIndex = StorageController.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1){
            StorageController.tasks.splice(taskIndex, 1);
        } else {
            console.error(`Cannot find task with ID ${taskId}`);
        }
    }

    static saveAllTasks(){
        localStorage.setItem('tasks', JSON.stringify(StorageController.tasks));
    }


    static addProject(project) {
        StorageController.projects.push(project);
        //
    }

    static getAllProjects(){
        return StorageController.projects;
    }

    static deleteProject(projectName){
        const projectIndex = StorageController.projects.findIndex((project) => project.title === projectName);
        if (projectIndex !== -1){
            StorageController.projects.splice(projectIndex, 1);
        } else {
            console.error(`Cannot find task with ID ${projectName}`);
        };

        StorageController.tasks = StorageController.tasks.filter((task) => task.project !== projectName );
    }

    static saveAllProjects(){
        localStorage.setItem('projects', JSON.stringify(StorageController.projects));
    }

    // TO DO:
    // Delete Projects and tasks
    // edit tasks
}



