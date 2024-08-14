import Task from "./task";
import Project from "./project";
import StorageController from "./storage";


class UserInterface {

    addProject(item){
        const projectsList = document.getElementById("projects-list");
        const project = document.createElement("button");
        project.classList.add("sidebar-btn");
        project.setAttribute("id", `${item.title}`);
        project.innerHTML = `
                <div class="icons">
                    <i class="fa-solid fa-hashtag"></i>
                    <button class="delete-project">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
                <div class="sidebar-btn-text">${item.title}</div>
                `;
        projectsList.appendChild(project);
    }

    addAllProjectsToForm() {
        const projectSelectionList = document.getElementById("project-select");
        projectSelectionList.innerHTML = `<option value="" disabled selected>Select your option</option>`;
        const projects = Array.from(document.getElementById("projects-list").children);
        projects.unshift(document.getElementById("general"));
        projects.forEach(project => {
            const option = document.createElement("option");
            option.value = project.textContent || project;
            option.textContent = project.textContent || project;
            projectSelectionList.appendChild(option);
        });
    }

    addTask(item) {
        const cardsContainer = document.getElementById("cards-container");
        const card = document.createElement('div');
        card.classList.add("card", item.priority);
        card.innerHTML = `
                <section class="task-details">
                    <h3 class="task-title">${item.title}</h3>
                    <h4 class="task-project">${item.project}</h4>
                </section>
                <section class="time-details">
                    <p>Due by</p>
                    <h3 class="task-date">${item.dueDate}</h3>
                </section>
                <section class="icons">
                    <button class="edit-task"><i class="fas fa-edit"></i></button>
                    <button class="delete-project"><i class="fa-solid fa-trash-can"></i></button>
                </section>
                `;
        card.style.borderLeft = `solid 15px var(--${item.priority})`;
        cardsContainer.appendChild(card);
    }

    displayTasks() {
        const cardsContainer = document.getElementById("cards-container");
        cardsContainer.innerHTML = '';
        StorageController.getTasks().forEach((task) => {
            this.addTask(task);
        })
    }

    displayProjects(){
        StorageController.getProjects().forEach((project) => {
            if (project.title !== "Work" || project.title !== "Exercise"){
                this.addProject(project);
            }
        })
    }

    render() {
        this.displayTasks();
        this.displayProjects();
    }
}

const DomEvents = () => {
    const ui = new UserInterface();
    const newProjectBtn = document.getElementById("create-new-project");
    const newProjectDialog = document.getElementById("new-project-dialog");
    const newProjectEntry = document.getElementById("project-entry");
    const newTaskBtn = document.getElementById("add-task-btn");
    const newTaskDialog = document.getElementById("new-task-dialog");
    const newTaskEntry = document.getElementById("task-entry");

    newProjectBtn.addEventListener("click", ()=> {
        newProjectDialog.showModal();
    });

    newTaskBtn.addEventListener("click", ()=> {
        ui.addAllProjectsToForm();
        newTaskDialog.showModal();
    });

    document.querySelectorAll(".close-dialog").forEach(cancelBtn => {
        cancelBtn.addEventListener('click', () => {
            cancelBtn.closest("dialog").close();
            cancelBtn.closest("form").reset();
        })
    });

    newProjectEntry.addEventListener('submit', (event) => {
        event.preventDefault();
        const projectTitle = newProjectEntry.title.value;
        const project = new Project(projectTitle);
        ui.addProject(project);
        newProjectDialog.close();
        newProjectEntry.reset();
        ui.addAllProjectsToForm();
        StorageController.saveProject(project);
    })

    newTaskEntry.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskTitle = newTaskEntry.title.value;
        const taskDueDate = document.getElementById('due-date').value;
        const taskProject = document.getElementById('project-select').value.trim();
        const taskPriority = document.querySelector("input[name='priority']:checked").value;
        const task = new Task(taskTitle, taskDueDate, taskProject, taskPriority);
        ui.addTask(task);
        newTaskDialog.close();
        newTaskEntry.reset();
        StorageController.saveTask(task);
    })

    document.addEventListener("DOMContentLoaded", (event) => {
        ui.render();
    })

    
}

export {DomEvents, UserInterface}