import type {TasksState} from "../App";
import type {CreateTodolist, DeleteTodolist} from "./todolists-reducer";
import type {TaskType} from "../Todolist";

export type DeleteTask = ReturnType<typeof deleteTaskAC>
export type CreateTask = ReturnType<typeof createTaskAC>
export type ChangeTaskStatus = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitle = ReturnType<typeof changeTaskTitleAC>

type Actions = CreateTodolist | DeleteTodolist | DeleteTask | CreateTask | ChangeTaskStatus | ChangeTaskTitle



export const tasksReducer = (state: TasksState, action: Actions): TasksState => {
    switch (action.type) {
        case "create_todolist":
            return {...state, [action.payload.id]: []}
        case "delete_todolist":
            const copy = {...state}
            delete copy[action.payload.id]
            return copy
        case "delete_task": {
            const {todolistId, taskId} = action.payload
            return {...state, [todolistId]: state[todolistId].filter(task => task.id !== taskId)}
        }
        case "create_task": {
            const {todolistId, title} = action.payload
            const newTask: TaskType = {id: crypto.randomUUID(), title, isDone: false}
            return {
                ...state, [todolistId]: [newTask, ...state[todolistId]]
            }
        }
        case "change_task_status": {
            const {todolistId, taskId, isDone} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)
            }
        }
        case "change_task_title": {
            const {todolistId, taskId, title} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].map(task => task.id === taskId ? {...task, title} : task)
            }
        }
        default:
            return state
    }
}

export const deleteTaskAC = (payload: { todolistId: string, taskId: string }) => ({
    type: 'delete_task',
    payload
} as const)

export const createTaskAC = (payload: { todolistId: string, title: string }) => ({
    type: 'create_task',
    payload
} as const)

export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => ({
    type: 'change_task_status',
    payload
} as const)

export const changeTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string }) => ({
    type: 'change_task_title',
    payload
} as const)