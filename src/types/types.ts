export type PriorityType = 'All' | 'Low' | 'Middle' | 'High'
export type FilterType = 'All' | 'Active' | 'Completed'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
    priority: PriorityType
}