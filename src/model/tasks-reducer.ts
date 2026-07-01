import type {Task, TasksState} from "@/App";
import type {CreateTodolistAT, DeleteTodolistAT} from "@/model/todolists-reducer";

export type DeleteTaskAT = ReturnType<typeof deleteTaskAC>
export type CreateTaskAT = ReturnType<typeof createTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
    DeleteTodolistAT
    | CreateTodolistAT
    | DeleteTaskAT
    | CreateTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT

const initialState: TasksState = {}
export const tasksReducer = (state: TasksState = initialState, action: ActionsType): TasksState => {
    switch (action.type) {
        case "delete_todolist":
            const copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
        case "create_todolist":
            return {...state, [action.payload.todolistId]: []}
        case "delete_task": {
            const {todolistId, taskId} = action.payload
            return {...state, [todolistId]: state[todolistId].filter(task => task.id !== taskId)}
        }
        case "create_task": {
            const {todolistId, title} = action.payload
            const newTask: Task = {id: crypto.randomUUID(), title, isDone: false}
            return {...state, [todolistId]: [newTask, ...state[todolistId]]}
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
    type: "delete_task",
    payload
} as const)

export const createTaskAC = (payload: { todolistId: string, title: string }) => ({
    type: "create_task",
    payload
} as const)

export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => ({
    type: "change_task_status",
    payload
} as const)

export const changeTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string }) => ({
    type: "change_task_title",
    payload
} as const)

