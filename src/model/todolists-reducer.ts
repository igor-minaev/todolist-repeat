import type {FilterValues, Todolist} from "../app/App";
import {createAction, createReducer} from "@reduxjs/toolkit";


export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTodolist')
export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => ({
    payload: {
        title,
        id: crypto.randomUUID()
    }
}))
export const changeTodolistTitleAC = createAction<{ id: string, title: string }>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{
    id: string,
    filter: FilterValues
}>('todolists/changeTodolistFilter')

const initialState: Todolist[] = []

export const todolistsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
        })
        .addCase(createTodolistAC,(state, action) =>)
})


export const todolistsReducer2 = (state: Todolist[], action: Actions): Todolist[] => {
    switch (action.type) {
        case "delete_todolist":
            return state.filter(todolist => todolist.id !== action.payload.id)
        case "create_todolist": {
            const {id, title} = action.payload
            const newTodolist: Todolist = {id, title, filter: 'all'}
            return [newTodolist, ...state]
        }
        case "change_todolist_title": {
            const {id, title} = action.payload
            return state.map(todolist => todolist.id === id ? {...todolist, title} : todolist)
        }
        case "change_todolist_filter": {
            const {id, filter} = action.payload
            return state.map(todolist => todolist.id === id ? {...todolist, filter} : todolist)
        }
        default:
            return state
    }
}






