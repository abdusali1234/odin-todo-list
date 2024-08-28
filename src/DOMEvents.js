import Task from "./task";
import Project from "./project";
import StorageController from "./storage";
import { isSameDay, isSameWeek, isBefore, isAfter, format } from "date-fns";

const today = format(new Date(), "yyyy-MM-dd");

class UserInterface {

    addProject(item){
        const projectsList = document.getElementById("projects-list");
        const project = document.createElement("button");
        project.classList.add("sidebar-btn");
        project.setAttribute("id", `${item._title.replace(/\W+/g, '-').toLowerCase()}`);
        project.innerHTML = `
                <div class="icons">
                    <i class="fa-solid fa-hashtag"></i>
                    <button class="delete-project">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
                <div class="sidebar-btn-text">${item._title}</div>
                `;
        projectsList.appendChild(project);
    }

    addAllProjectsToForm() {
        const projectSelectionList = document.getElementById("project-select");
        projectSelectionList.innerHTML = `<option value="" disabled selected>Select your option</option>`;
        StorageController.getAllProjects().forEach(project => {
            const option = document.createElement("option");
            option.value = project.textContent || project._title;
            option.textContent = project.textContent || project._title;
            projectSelectionList.appendChild(option);
        });
    }

    addTimeClassToCard(el, dueDate){
        if (isSameDay(today, dueDate)){
            el.classList.add('today');
            if (el.classList.contains('week')){
                el.classList.remove('week');
            }
            if (el.classList.contains('overdue')){
                el.classList.remove('overdue');
            }
        }
        if (isSameWeek(today, dueDate)){
            if (isAfter(dueDate, today)){
                el.classList.add('week');
                el.classList.remove('today');
            }
            if (el.classList.contains('overdue')){
                el.classList.remove('overdue');
            }
        }
        if (isBefore(dueDate, today)){
            el.classList.add('overdue');
            if (el.classList.contains('today')){
                el.classList.remove('today');
            }
            if (el.classList.contains('week')){
                el.classList.remove('week');
            }
        }


    }

    addTask(item, selectedClass=localStorage.getItem("selectedProject")) {
        const cardsContainer = document.getElementById("cards-container");
        const card = document.createElement('div');
        card.classList.add("card", `${item._project.replace(/\W+/g, '-').toLowerCase()}`, item._priority);
        card.setAttribute("data-id", item._id);
        card.innerHTML = `
                <section class="task-details">
                    <h3 class="task-title">${item._title}</h3>
                    <h4 class="task-project">${item._project}</h4>
                </section>
                <section class="time-details">
                    <p>Due by</p>
                    <h3 class="task-date">${item._dueDate}</h3>
                </section>
                <section>
                    <label for="toggle-complete">Task Complete?</label>
                    <input type="checkbox" class="toggle-complete" name="toggle-complete">
                </section>
                <section class="icons">
                    <button class="delete-task"><i class="fa-solid fa-trash-can"></i></button>
                </section>
                `;
        card.style.borderLeft = `solid 15px var(--${item._priority})`;
        this.addTimeClassToCard(card, item._dueDate);
        if (item._complete === true){
            card.querySelector("input[name='toggle-complete']").checked=true;
            card.style.setProperty("text-decoration", "line-through");
            card.classList.add('checked');
            if (card.classList.contains('overdue')){
                card.classList.remove('overdue');
            }
        } else {
            card.style.setProperty("text-decoration", "none");
            if (card.classList.contains('checked')){
                card.classList.remove('checked');
            };

        };
        if (card.classList.contains(selectedClass)){
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
        cardsContainer.appendChild(card);
    }

    displayTasks() {
        const cardsContainer = document.getElementById("cards-container");
        cardsContainer.innerHTML = '';
        StorageController.getAllTasks().forEach((task) => {
            const taskAsClass = new Task(task._title, task._dueDate, task._project, task._priority, task._complete, task._id);
            this.addTask(taskAsClass);
            task = taskAsClass;
        });
        StorageController.saveAllTasks();
    }

    displayProjects(){
        const projectsList = document.getElementById("projects-list");
        projectsList.innerHTML = '';
        StorageController.getAllProjects().forEach((project) => {
            this.addProject(new Project(project._title)); 
        });
        StorageController.saveAllProjects();
    }

    render(desiredProject = localStorage.getItem("selectedProject")) {
        this.displayTasks(desiredProject);
        this.displayProjects();
        


        // toggle tasks as complete/incomplete
        document.querySelectorAll("input[name='toggle-complete']").forEach(checkbox => {
            checkbox.addEventListener('change', (event) =>{
                event.preventDefault();
                const card = checkbox.closest("div");
                const cardDataId = card.getAttribute("data-id");
                const task = StorageController.getTaskById(parseInt(cardDataId));
                const taskAsClass = new Task(task._title, task._dueDate, task._project, task._priority, task._complete, task._id);
                taskAsClass.toggleComplete();
                const taskIndex = StorageController.tasks.findIndex(task => task._id === parseInt(cardDataId));
                StorageController.tasks[taskIndex] = taskAsClass;
                StorageController.saveAllTasks();
                this.render(localStorage.getItem("selectedProject"));
            })
        });

        // filter tasks by project
        document.querySelectorAll(".sidebar-btn").forEach(projectBtn => {
            projectBtn.addEventListener('click', () => {
                const projectId = projectBtn.id;
                console.log(projectId);
                localStorage.setItem("selectedProject", projectId);
                const projectTitle = projectBtn.querySelector(".sidebar-btn-text").innerHTML;
                document.querySelector("#tasks-subheading").textContent = projectTitle;
                this.render(localStorage.getItem("selectedProject"));
            });
        })

        

        
        // delete task
        document.querySelectorAll(".delete-task").forEach(deleteBtn => {
            deleteBtn.addEventListener('click', () => {
                const taskId = deleteBtn.closest("div").getAttribute("data-id");
                StorageController.deleteTask(parseInt(taskId));
                this.render(localStorage.getItem("selectedProject"));
            })
        });

        // delete project and tasks associated with project
        document.querySelectorAll(".delete-project").forEach(deleteBtn => {
            deleteBtn.addEventListener('click', () => {
                const projectBtn = deleteBtn.parentElement.parentElement;
                const projectName = projectBtn.querySelector(".sidebar-btn-text").textContent;
                StorageController.deleteProject(projectName);
                this.render(localStorage.getItem("selectedProject"));
            })
        });
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
        newProjectDialog.close();
        newProjectEntry.reset();
        ui.addAllProjectsToForm();
        StorageController.addProject(project);
        StorageController.saveAllProjects();
        ui.render(localStorage.getItem("selectedProject"));
    })

    newTaskEntry.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskTitle = newTaskEntry.title.value;
        const taskDueDate = document.getElementById('due-date').value;
        const taskProject = document.getElementById('project-select').value.trim();
        const taskPriority = document.querySelector("input[name='priority']:checked").value;
        const task = new Task(taskTitle, taskDueDate, taskProject, taskPriority, false, Task.generateId());
        console.log(task);
        console.log(task.constructor.name);
        StorageController.addTask(task);
        StorageController.saveAllTasks();
        ui.render(localStorage.getItem("selectedProject"));
        newTaskDialog.close();
        newTaskEntry.reset();
        
    })
    
    document.addEventListener("DOMContentLoaded", (event) => {
        localStorage.setItem("selectedProject", "today");
        ui.render(localStorage.getItem("selectedProject"));
    })

    //TODO:
    // create dialog to edit tasks
    // filter tasks by day, upcoming, and projects

    
}

export {DomEvents, UserInterface}