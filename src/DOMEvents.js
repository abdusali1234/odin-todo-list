import Task from "./task";
import Project from "./project";

class UserInterface {

    addNewProject(item){
        const projectsList = document.getElementById("projects-list");
        const project = document.createElement("button");
        project.classList.add("sidebar-btn");
        project.setAttribute("id", `${item.title}`);
        project.innerHTML = `
                <i class="fa-solid fa-hashtag"></i>
                <button class="delete-project">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                ${item.title}
                `;
        projectsList.appendChild(project);
    }
}

const DomEvents = () => {
    const ui = new UserInterface();
    const newProjectBtn = document.getElementById("create-new-project");
    const newProjectDialog = document.getElementById("new-project-dialog");
    const newProjectEntry = document.getElementById("project-entry");
    const cancelProjectEntryBtn = document.getElementById("cancel-project-entry");

    newProjectBtn.addEventListener("click", ()=> {
        newProjectDialog.showModal();
    })

    newProjectEntry.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(newProjectEntry.title.value);
        const projectTitle = newProjectEntry.title.value;
        const project = new Project(projectTitle);
        ui.addNewProject(project);
        newProjectDialog.close();
        newProjectEntry.reset();
    })

    cancelProjectEntryBtn.addEventListener('click', (event) => {
        newProjectDialog.close();
        newProjectEntry.reset();
    })
}

export {DomEvents, UserInterface}