import {TasksStateType, TaskType} from "../types/task.ts";
import {CreateTodolistAT, DeleteTodolistAT} from "./todolists-reducer.ts";

export type DeleteTaskAT = ReturnType<typeof deleteTaskAC>
export type CreateTaskAT = ReturnType<typeof createTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type ActionType =
    CreateTodolistAT
    | DeleteTodolistAT
    | DeleteTaskAT
    | CreateTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'create-todolist': {
            return {...state, [action.payload.id]: []}
        }

        case 'delete-todolist': {
            const copyTasks = {...state}
            delete copyTasks[action.payload.id]
            return copyTasks

        }

        case 'delete-task': {
            const {id, taskId} = action.payload
            return {...state, [id]: state[id].filter(t => t.id !== taskId)}
        }
        case 'create-task':
            const {id, title} = action.payload
            const newTask: TaskType = {
                id: crypto.randomUUID(),
                title,
                isDone: false
            }
            return {...state, [id]: [newTask, ...state[id]]}
        case 'change-task-status': {
            const {id, taskId, isDone} = action.payload
            return {...state, [id]: state[id].map(t => t.id === taskId ? {...t, isDone} : t)}
        }
        case 'change-task-title': {
            const {id, taskId, title} = action.payload
            return {...state, [id]: state[id].map(t => t.id === taskId ? {...t, title} : t)}
        }
        default :
            return state
    }
}


export const deleteTaskAC = (payload: { id: string, taskId: string }) => ({
    type: 'delete-task',
    payload
} as const)

export const createTaskAC = (payload: { id: string, title: string }) => ({
    type: 'create-task',
    payload
} as const)

export const changeTaskStatusAC = (payload: { id: string, taskId: string, isDone: boolean }) => ({
    type: 'change-task-status',
    payload
} as const)

export const changeTaskTitleAC = (payload: { id: string, taskId: string, title: string }) => ({
    type: 'change-task-title',
    payload
} as const)



