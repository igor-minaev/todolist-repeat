export type PriorityFilterType = PriorityType | 'All'
export type PriorityType = "Low" | "Medium" | "High"
export type FilterType = "All" | "Active" | "Completed"
export type TaskType = {
    id: string
    title: string
    isDone: boolean
    priority: PriorityType
}