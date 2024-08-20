import { UserInterface } from "./DOMEvents";
import Project from "./project";
import Task from "./task";

export default class StorageController {

    static tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    static projects = JSON.parse(localStorage.getItem('projects')) || [];

    static saveTask(task) {
        StorageController.tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(StorageController.tasks));
    }

    static getTasks(){
        return StorageController.tasks;
    }

    // NOT WORKING - TO FIX!
    static removeTask(title){
        for (let x in StorageController.tasks){
            if (StorageController.tasks[x].title === title){
                StorageController.tasks.splice(x, 1);
            }
        }

    }

    static saveProject(project) {
        StorageController.projects.push(project);
        localStorage.setItem('projects', JSON.stringify(StorageController.projects));
    }

    static getProjects(){
        return StorageController.projects;
    }

    // TO DO:
    // Delete Projects and tasks
    // edit tasks
}

// Populate with some projects and tasks
if (!localStorage.getItem('tasks')||!localStorage.getItem('projects')){
    StorageController.saveProject(new Project("General"));
    StorageController.saveProject(new Project("Work"));
    StorageController.saveProject(new Project("Exercise"));
    StorageController.saveProject(new Project("Escape Vorkuta"));
    StorageController.saveTask(new Task("Step 1: Secure the keys", "1963-10-06", "Escape Vorkuta", "high"));
    StorageController.saveTask(new Task("Step 2: Ascend from darkness", "1963-10-06", "Escape Vorkuta", "high"));
    StorageController.saveTask(new Task("Step 3: Rain fire", "1963-10-06", "Escape Vorkuta", "high"));
    StorageController.saveTask(new Task("Step 4: Unleash the Horde", "1963-10-06", "Escape Vorkuta", "high"));
    StorageController.saveTask(new Task("Step 5: Skewer the winged beast", "1963-10-06", "Escape Vorkuta", "high"));
    StorageController.saveTask(new Task("Step 6: Wield a first of Iron", "1963-10-06", "Escape Vorkuta", "high"));
    StorageController.saveTask(new Task("Step 7: Raise hell", "1963-10-06", "Escape Vorkuta", "high"));
    StorageController.saveTask(new Task("Step 8: Freedom", "1963-10-06", "Escape Vorkuta", "high"));
}

