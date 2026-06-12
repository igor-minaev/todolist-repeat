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
        .addCase(createTodolistAC, (state, action) => {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            state.push(newTodolist)
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const currentTodolist = state.find(todolist => todolist.id === action.payload.id)
            if (currentTodolist) currentTodolist.title = action.payload.title
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const currentTodolist = state.find(todolist => todolist.id === action.payload.id)
            if (currentTodolist) currentTodolist.filter = action.payload.filter
        })
})







