import {FilterType, TaskType} from "../types/types.ts";

export const getFilteredTasks = (tasks: TaskType[], filter: FilterType): TaskType[] => {
    switch (filter) {
        case "Active":
            return tasks.filter(t => !t.isDone)
        case "Completed":
            return tasks.filter(t => t.isDone)
        default:
            return tasks
    }
}