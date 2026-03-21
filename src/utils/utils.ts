import {FilterType, PriorityFilterType, TaskType} from "../types/types.ts";

export const getFilteredTasks = (tasks: TaskType[], filter: FilterType, priority: PriorityFilterType): TaskType[] => {

    let filteredTasks = tasks
    if (filter === "Active") {
        filteredTasks = filteredTasks.filter(t => !t.isDone)
    }
    if (filter === "Completed") {
        filteredTasks = filteredTasks.filter(t => t.isDone)
    }
    if (priority !== 'All') {
        filteredTasks = filteredTasks.filter(t => t.priority === priority)
    }
    return filteredTasks
}

