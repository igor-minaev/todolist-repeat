export type PriorityType = "Low" | "Medium" | "High"
export type TaskType = {
    id: string
    title: string
    isDone: boolean
    priority: PriorityType
}