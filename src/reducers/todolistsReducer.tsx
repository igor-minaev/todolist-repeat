import {FilterType, TodolistType} from '../App';

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.payload.todolistId)
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: 'all'
            }
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.payload.todolistId ? {...t, filter: action.payload.filter} : t)
        default:
            return state
    }
}

type ActionsType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistFilterACType

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId}
    } as const
}

export const addTodolistAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {todolistId, title}
    } as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId, filter
        }
    } as const
}