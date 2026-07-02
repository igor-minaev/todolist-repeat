import type {Task, TasksState} from "@/app/App";
import {createTodolistAC, deleteTodolistAC} from "@/model/todolists-reducer";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

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
}>('tasks/changeTaskTitl')

const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.todolistId] = []
        })
        .addCase(deleteTaskAC, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(todo => todo.id === action.payload.taskId)
            if (index !== -1) state[action.payload.todolistId].splice(index, 1)
        })
        .addCase(createTaskAC, (state, action) => {
            const newTask: Task = {id: nanoid(), title: action.payload.title, isDone: false}
            state[action.payload.todolistId].unshift(newTask)
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const task = state[action.payload.todolistId].find(todo => todo.id === action.payload.taskId)
            if (task) task.isDone = action.payload.isDone
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const task = state[action.payload.todolistId].find(todo => todo.id === action.payload.taskId)
            if (task) task.title = action.payload.title
        })
})


