export default class Task {
    constructor(title, dueDate, project, priority) {
        this.title = title;
        this.dueDate = dueDate;
        this.project = project;
        this.priority = priority;
    }

    get title() {
        return this.title;
    }

    get dueDate() {
        return this.dueDate;
    }

    get project() {
        return this.project;
    }
    
    get priority() {
        return this.priority;
    }

    set title(value) {
        this.title = value;
    }

    set dueDate(value) {
        this.dueDate = value;
    }

    set project(value) {
        this.project = value;
    }

    set priority(value){
        this.priority = value;
    }
}