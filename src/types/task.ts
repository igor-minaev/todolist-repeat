export type TasksStateType = {
    [key: string]: TaskType[]
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

