import type {TasksState} from "../../../app/App";
import type {TaskType} from "../ui/Todolists/TodolistItem/TodolistItem";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer";

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTask')
export const createTaskAC = createAction<{ todolistId: string, title: string }>('tasks/createTask')

export const changeTaskStatusAC = createAction<{
    todolistId: string,
    taskId: string,
    isDone: boolean
}>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{
    todolistId: string,
    taskId: string,
    title: string
}>('tasks/changeTaskTitle')

const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTaskAC, (state, action) => {
            const currentTasks = state[action.payload.todolistId]
            const index = currentTasks.findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) currentTasks.splice(index, 1)
        })
        .addCase(createTaskAC, (state, action) => {
            const newTask: TaskType = {id: nanoid(), title: action.payload.title, isDone: false}
            state[action.payload.todolistId].unshift(newTask)
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const currentTasks = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
            if (currentTasks) currentTasks.isDone = action.payload.isDone
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const currentTasks = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
            if (currentTasks) currentTasks.title = action.payload.title
        })
})


