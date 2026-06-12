import type {FilterValues, Todolist} from "../app/App";

export type DeleteTodolist = ReturnType<typeof deleteTodolistAC>
export type CreateTodolist = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitle = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAC = ReturnType<typeof changeTodolistFilterAC>

type Actions = DeleteTodolist | CreateTodolist | ChangeTodolistTitle | ChangeTodolistFilterAC

export const todolistsReducer = (state: Todolist[], action: Actions): Todolist[] => {
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


export const deleteTodolistAC = (id: string) => ({
    type: 'delete_todolist',
    payload: {id}
} as const)

export const createTodolistAC = (title: string) => ({
    type: 'create_todolist',
    payload: {title, id: crypto.randomUUID()}
} as const)

export const changeTodolistTitleAC = (payload: { id: string, title: string }) => ({
    type: 'change_todolist_title',
    payload
} as const)

export const changeTodolistFilterAC = (payload: { id: string, filter: FilterValues }) => ({
    type: 'change_todolist_filter',
    payload
} as const)