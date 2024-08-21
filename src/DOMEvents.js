import Task from "./task";
import Project from "./project";
import StorageController from "./storage";


class UserInterface {

    addProject(item){
        const projectsList = document.getElementById("projects-list");
        const project = document.createElement("button");
        project.classList.add("sidebar-btn");
        project.setAttribute("id", `${item._title}`);
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

    addTask(item) {
        const cardsContainer = document.getElementById("cards-container");
        const card = document.createElement('div');
        card.classList.add("card", item._priority);
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
                    <button class="edit-task"><i class="fas fa-edit"></i></button>
                    <button class="delete-task"><i class="fa-solid fa-trash-can"></i></button>
                </section>
                `;
        card.style.borderLeft = `solid 15px var(--${item._priority})`;
        if (item._complete === true){
            card.querySelector("input[name='toggle-complete']").checked=true;
            card.style.setProperty("text-decoration", "line-through");
            card.classList.add('checked');
        } else {
            card.style.setProperty("text-decoration", "none");
            if (card.classList.contains('checked')){
                card.classList.remove('checked');
            };

        };
        cardsContainer.appendChild(card);
    }

    displayTasks() {
        const cardsContainer = document.getElementById("cards-container");
        cardsContainer.innerHTML = '';
        StorageController.getAllTasks().forEach((task) => {
            this.addTask(task);
        })
    }

    displayProjects(){
        StorageController.getAllProjects().forEach((project) => {
            if (project.title !== "Work" || project.title !== "Exercise"){
                this.addProject(project);
            }
        })
    }

    render() {
        


        document.querySelectorAll("input[name='toggle-complete']").forEach(checkbox => {
            checkbox.addEventListener('change', (event) =>{
                event.preventDefault();
                const card = checkbox.closest("div");
                const cardDataId = card.getAttribute("data-id");
                console.log(cardDataId);
                if (event.target.checked){
                    console.log("checked!")
                    card.style.setProperty("text-decoration", "line-through");
                    card.classList.add('checked');
                } else {
                    card.style.setProperty("text-decoration", "none");
                    if (card.classList.contains('checked')){
                        card.classList.remove('checked');
                    }
                }
            })
        });

        this.displayTasks();

        this.displayProjects();

        document.querySelectorAll(".delete-task").forEach(deleteBtn => {
            deleteBtn.addEventListener('click', () => {
                const taskId = deleteBtn.closest("div").getAttribute("data-id");
                // Not working. to fix
                StorageController.deleteTask(parseInt(taskId)-1);
                StorageController.saveAllTasks();
                this.displayTasks();
            })
        })
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
        StorageController.addProject(project);
        StorageController.saveAllProjects();
    })

    newTaskEntry.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskTitle = newTaskEntry.title.value;
        const taskDueDate = document.getElementById('due-date').value;
        const taskProject = document.getElementById('project-select').value.trim();
        const taskPriority = document.querySelector("input[name='priority']:checked").value;
        const task = new Task(taskTitle, taskDueDate, taskProject, taskPriority, false, this.generateId());
        ui.addTask(task);
        newTaskDialog.close();
        newTaskEntry.reset();
        StorageController.addTask(task);
        StorageController.saveAllTasks();
    })

    

    

    
    document.addEventListener("DOMContentLoaded", (event) => {
        // Populate with some projects and tasks
    if (!localStorage.getItem('tasks')||!localStorage.getItem('projects')){
        StorageController.addProject(new Project("General"));
        StorageController.addProject(new Project("Work"));
        StorageController.addProject(new Project("Exercise"));
        StorageController.addProject(new Project("Escape Vorkuta"));
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
        ui.render();
    })

    
}

export {DomEvents, UserInterface}