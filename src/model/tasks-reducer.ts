import type {TasksState} from "../app/App";
import type {TaskType} from "../Todolist";
import {createAction, createReducer} from "@reduxjs/toolkit";

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

export const tasksReducer= createReducer()
export const tasksReducer2 = (state: TasksState, action: Actions): TasksState => {
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


