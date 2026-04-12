import "./App.css"
import {useState} from "react";
import {Todolist} from "./Todolist.tsx";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'All' | 'Active' | 'Completed'

function App() {
    const todolistTitle = "What to learn"
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: crypto.randomUUID(), title: 'HTML', isDone: true},
        {id: crypto.randomUUID(), title: 'CSS', isDone: true},
        {id: crypto.randomUUID(), title: 'JS', isDone: false},
        {id: crypto.randomUUID(), title: 'VITE', isDone: true},
        {id: crypto.randomUUID(), title: 'REACT', isDone: false},
        {id: crypto.randomUUID(), title: 'REDUX', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterType>('All')

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const changeFilter = (filter: FilterType) => setFilter(filter)

    const tasksForTodolist = (tasks: TaskType[], filter: FilterType): TaskType[] => {
        switch (filter) {
            case "Active":
                return tasks.filter(t => !t.isDone)
            case "Completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    return (
        <div className="app">
            <Todolist
                title={todolistTitle}
                tasks={tasksForTodolist(tasks, filter)}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}

export default App
