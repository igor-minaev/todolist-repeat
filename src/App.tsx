import {TodolistItem} from "@/TodolistItem";
import {useState} from "react";

export type Task = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<Task[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ])

    const deleteTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const [filter, setFilter] = useState<FilterValues>('all')

    const changeFilter = (filter: FilterValues) => setFilter(filter)

    const getTasksForTodolist = (tasks: Task[], filter: FilterValues): Task[] => {
        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }

    const tasksForTodolist = getTasksForTodolist(tasks, filter)

    return (
        <div>
            <TodolistItem
                title="What to learn"
                tasks={tasksForTodolist}
                deleteTask={deleteTask}
                changeFilter={changeFilter}/>
        </div>
    )
}

export default App
