import {TodolistItem} from "@/TodolistItem";
import {useState} from "react";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<Task[]>([
        {id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true},
        {id: crypto.randomUUID(), title: 'JS', isDone: true},
        {id: crypto.randomUUID(), title: 'ReactJS', isDone: false},
    ])

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const createTask = (title: string) => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(task => task.id === taskId ? {...task, isDone} : task))
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
                changeFilter={changeFilter}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}/>
        </div>
    )
}

export default App
