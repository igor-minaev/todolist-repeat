import {FilterType, TodolistType} from "../types/todolist.ts";

export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAT = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAC = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAC = ReturnType<typeof changeTodolistFilterAC>

type ActionType = DeleteTodolistAT | CreateTodolistAT | ChangeTodolistTitleAC | ChangeTodolistFilterAC

export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'delete-todolist': {
            const id = action.payload.id
            return state.filter(tl => tl.id !== id)
        }

        case 'create-todolist': {
            const {title} = action.payload
            const newTodolistId = crypto.randomUUID()
            const newTodolist: TodolistType = {
                id: newTodolistId,
                title,
                filter: 'all'
            }
            return [...state, newTodolist]
        }
        case 'change-todolist-title': {
            const {id, title} = action.payload
            return state.map(tl => tl.id === id ? {...tl, title} : tl)
        }
        case 'change-todolist-filter': {
            const {id, filter} = action.payload
            return state.map(tl => tl.id === id ? {...tl, filter} : tl)
        }
        default:
            return state
    }
}


export const deleteTodolistAC = (id: string) => ({
    type: 'delete-todolist',
    payload: {
        id
    }
} as const)

export const createTodolistAC = (title: string) => ({
    type: 'create-todolist',
    payload: {
        title
    }
} as const)

export const changeTodolistTitleAC = (payload: { id: string, title: string }) => ({
    type: 'change-todolist-title',
    payload
} as const)

export const changeTodolistFilterAC = (payload: { id: string, filter: FilterType }) => ({
    type: 'change-todolist-filter',
    payload
} as const)