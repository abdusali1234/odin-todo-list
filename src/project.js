export default class Project {
    constructor(title){
        this.title = title;
    }

    get title() {
        return this.title;
    }

    set title(value){
        this.title = value;
    }
}