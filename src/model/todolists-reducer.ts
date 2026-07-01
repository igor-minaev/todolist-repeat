import type {Todolist} from "@/App";

export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>

type ActionsType = DeleteTodolistAT

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: ActionsType): Todolist[] => {
    switch (action.type) {
        case "delete_todolist":

        default:
            return state
    }
}


export const deleteTodolistAC = (id: string) => ({
    type: 'delete_todolist',
    payload: {id}
} as const)