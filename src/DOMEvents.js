import Task from "./task";
import Project from "./project";

class UserInterface {

    addNewProject(item){
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
        projectSelectionList.innerHTML = "";
        const projects = Array.from(document.getElementById("projects-list").children);
        projects.forEach(project => {
            const option = document.createElement("option");
            option.value = project.textContent || project;
            option.textContent = project.textContent || project;
            projectSelectionList.appendChild(option);
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
        console.log(newProjectEntry.title.value);
        const projectTitle = newProjectEntry.title.value;
        const project = new Project(projectTitle);
        ui.addNewProject(project);
        newProjectDialog.close();
        newProjectEntry.reset();
        ui.addAllProjectsToForm();
    })

    
}

export {DomEvents, UserInterface}