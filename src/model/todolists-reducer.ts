import type {FilterValues, Todolist} from "@/app/App";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export const deleteTodolistAC = createAction<{ todolistId: string }>('todolists/deleteTodolist')

export const changeTodolistFilterAC = createAction<{
    todolistId: string,
    filter: FilterValues
}>('todolists/changeTodolistFilter')

export const changeTodolistTitleAC = createAction<{
    todolistId: string,
    title: string
}>('todolists/changeTodolistTitle')

export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => ({
    payload: {title, todolistId: nanoid()}
}))

const initialState: Todolist[] = []

export const todolistsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            if (index !== -1) state.splice(index, 1)
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const todolist = state.find(todo => todo.id === action.payload.todolistId)
            if (todolist) todolist.filter = action.payload.filter
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const todolist = state.find(todo => todo.id === action.payload.todolistId)
            if (todolist) todolist.title = action.payload.title
        })
        .addCase(createTodolistAC, (state, action) => {
            state.push({id: action.payload.todolistId, title: action.payload.title, filter: 'all'})
        })
})

