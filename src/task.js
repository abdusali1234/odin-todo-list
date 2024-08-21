export default class Task {
    constructor(title, dueDate, project, priority, _complete, _id) {
        this._title = title;
        this._dueDate = dueDate;
        this._project = project;
        this._priority = priority;
        this._complete = false;
        this._id = Task.generateId();
    }

    get id() {
        return this._id;
    }

    get title(){
        return this._title;
    }

    set title(value){
        this._title = value;
    }

    get dueDate(){
        return this._dueDate;
    }

    set dueDate(value){
        this._dueDate = value;
    }

    get project(){
        return this._project;
    }

    set project(value){
        this._project = value;
    }

    get priority(){
        return this._priority;
    }

    set priority(value){
        this._priority = value;
    }

    get complete(){
        return this._complete;
    }

    toggleComplete(){
        this._complete = !this._complete;
    }

    static taskId = 0;

    static generateId(){
        return Task.taskId++;
    }
}