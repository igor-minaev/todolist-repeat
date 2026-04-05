export type PriorityType = 'Low' | 'Middle' | 'High'
export type PriorityFilterType = 'All' | PriorityType
export type FilterType = 'All' | 'Active' | 'Completed'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
    priority: PriorityType
}