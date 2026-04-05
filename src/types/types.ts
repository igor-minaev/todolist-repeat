export type PriorityType = 'All' | 'Low' | 'Middle' | 'High'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
    priority: PriorityType
}