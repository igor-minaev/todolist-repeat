import {TasksStateType, TaskType} from '../App';

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            const newTask: TaskType = {
                id: crypto.randomUUID(),
                title: action.payload.title,
                isDone: false
            }
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }

        default:
            return state
    }
}

type ActionsType = RemoveTaskACType | addTaskACType | changeTaskStatusACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>


export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todolistId, taskId}
    } as const
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {todolistId, title}
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {todolistId, taskId, isDone}
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {todolistId, taskId, title}
    } as const
}