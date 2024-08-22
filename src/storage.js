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

    static getTaskById(taskId){
        return StorageController.tasks.find((task) => task._id === taskId);
    }

    static deleteTask(taskId){
        StorageController.tasks = StorageController.tasks.filter((task) => task._id !== taskId);
        StorageController.tasks = StorageController.tasks.filter(task => task != null);
        StorageController.saveAllTasks();
        // const taskIndex = StorageController.tasks.findIndex((task) => task.id === taskId);
        // if (taskIndex !== -1){
        //     StorageController.tasks.splice(taskIndex, 1);
        // } else {
        //     console.error(`Cannot find task with ID ${taskId}`);
        // }
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
        StorageController.projects = StorageController.projects.filter((project) => project._title !== projectName);
        StorageController.projects = StorageController.projects.filter(project => project != null);
        StorageController.tasks = StorageController.tasks.filter((task) => task._project !== projectName );
        StorageController.tasks = StorageController.tasks.filter(task => task != null)

        StorageController.saveAllProjects();
        StorageController.saveAllTasks();

    }

    static saveAllProjects(){
        localStorage.setItem('projects', JSON.stringify(StorageController.projects));
    }

    // TO DO:
    // Delete Projects and tasks
    // edit tasks
}



