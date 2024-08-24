import { isSameDay, isSameWeek, format, isBefore, isAfter } from "date-fns";

export default class DateController{
    static today = format(new Date(), "yyyy-MM-dd");

    static checkIfDueToday(dueDate){
        return isSameDay(DateController.today, dueDate);
    }

    static checkIfDueThisWeek(dueDate){
        return isSameWeek(DateController.today, dueDate) && (isAfter(DateController.today, dueDate) >= 0);
    }

    static checkIfOverdue(dueDate){
        return isBefore(dueDate, DateController.today);
    }
}