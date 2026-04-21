import {FilterType, TaskType} from "./App.tsx";

export const getFilteredTasks = (tasks: TaskType[], filter: FilterType): TaskType[] => {
    switch (filter) {
        case "active":
            return tasks.filter(t => !t.isDone)
        case "completed":
            return tasks.filter(t => t.isDone)
        default:
            return tasks
    }
}