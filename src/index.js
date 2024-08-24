import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import { DomEvents } from './DOMEvents';
import StorageController from './storage';
import Task from './task';
import Project from './project';

// Populate with some projects and tasks
if (!localStorage.getItem('tasks')||!localStorage.getItem('projects')){
    StorageController.addProject(new Project("General"));
    StorageController.addProject(new Project("Work"));
    StorageController.addProject(new Project("Exercise"));
    StorageController.addProject(new Project("Escape Vorkuta"));
    StorageController.addTask(new Task("Take a dump", "2024-08-29", "General", "high", false, Task.generateId()));
    StorageController.addTask(new Task("Step 1: Secure the keys", "1963-10-06", "Escape Vorkuta", "high", true, Task.generateId()));
    StorageController.addTask(new Task("Step 2: Ascend from darkness", "1963-10-06", "Escape Vorkuta", "high", true, Task.generateId()));
    StorageController.addTask(new Task("Step 3: Rain fire", "1963-10-06", "Escape Vorkuta", "high", true, Task.generateId()));
    StorageController.addTask(new Task("Step 4: Unleash the Horde", "1963-10-06", "Escape Vorkuta", "high", true, Task.generateId()));
    StorageController.addTask(new Task("Step 5: Skewer the winged beast", "1963-10-06", "Escape Vorkuta", "high", false, Task.generateId()));
    StorageController.addTask(new Task("Step 6: Wield a first of Iron", "1963-10-06", "Escape Vorkuta", "high", false, Task.generateId()));
    StorageController.addTask(new Task("Step 7: Raise hell", "1963-10-06", "Escape Vorkuta", "high", false, Task.generateId()));
    StorageController.addTask(new Task("Step 8: Freedom", "1963-10-06", "Escape Vorkuta", "high", false, Task.generateId()));
    StorageController.saveAllProjects();
    StorageController.saveAllTasks();
}
DomEvents();