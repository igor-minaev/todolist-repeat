import "./App.css"
import {useState} from "react";
import {Todolist} from "./Todolist.tsx";
import {getFilteredTasks} from "./utilsFiltration.ts";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValue = 'all' | 'active' | 'completed'

function App() {
    const todolistTitle = 'What to learn'
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: crypto.randomUUID(), title: "HTML", isDone: true},
        {id: crypto.randomUUID(), title: "CSS", isDone: true},
        {id: crypto.randomUUID(), title: "JS", isDone: false},
        {id: crypto.randomUUID(), title: "VITE", isDone: true},
        {id: crypto.randomUUID(), title: "REACT", isDone: false},
        {id: crypto.randomUUID(), title: "REDUX", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValue>('all')
    const changeFilter = (filter: FilterValue) => {
        setFilter(filter)
    }

    const removeTask = (taskId: string) => {
        setTasks(prevState => prevState.filter(t => t.id !== taskId))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: crypto.randomUUID(),
            title,
            isDone: false
        }
        setTasks(prevState => [newTask, ...prevState])
    }

    const filteredTasks = getFilteredTasks(tasks, filter)
    return (
        <div className="app">
            <Todolist
                title={todolistTitle}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    )
}

export default App
