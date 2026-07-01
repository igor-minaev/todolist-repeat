import type {FilterValues, Todolist} from "@/App";
import * as crypto from "node:crypto";

export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type createTodolistAT = ReturnType<typeof createTodolistAC>

type ActionsType = DeleteTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT | createTodolistAT

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: ActionsType): Todolist[] => {
    switch (action.type) {
        case "delete_todolist":
            return state.filter(todolist => todolist.id !== action.payload.todolistId)
        case "change_todolist_filter": {
            const {todolistId, filter} = action.payload
            return state.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist)
        }
        case "change_todolist_title": {
            const {todolistId, title} = action.payload
            return state.map(todolist => todolist.id === todolistId ? {...todolist, title} : todolist)
        }
        case "create_todolist": {
            const {todolistId, title} = action.payload
            const newTodolist: Todolist = {id: todolistId, title, filter: 'all'}
            return [newTodolist, ...state]
        }
        default:
            return state
    }
}


export const deleteTodolistAC = (todolistId: string) => ({
    type: 'delete_todolist',
    payload: {todolistId}
} as const)

export const changeTodolistFilterAC = (payload: { todolistId: string, filter: FilterValues }) => ({
    type: 'change_todolist_filter',
    payload
} as const)

export const changeTodolistTitleAC = (payload: { todolistId: string, title: string }) => ({
    type: 'change_todolist_title',
    payload
} as const)

export const createTodolistAC = (title: string) => ({
    type: 'create_todolist',
    payload: {title, todolistId: crypto.randomUUID()}
} as const)