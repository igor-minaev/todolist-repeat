import './App.css'
import {useState} from "react";
import {FilterType, TaskType} from "./types/task.ts";
import {Todolist} from "./components/Todolist.tsx";
import {getFilteredTasks} from "./utils/filtrationUtils.ts";

function App() {

    const todolistTitle = 'What to learn'
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: crypto.randomUUID(), title: 'HTML', isDone: true},
        {id: crypto.randomUUID(), title: 'CSS', isDone: true},
        {id: crypto.randomUUID(), title: 'JS', isDone: true},
        {id: crypto.randomUUID(), title: 'REACT', isDone: false},
        {id: crypto.randomUUID(), title: 'RTK', isDone: false},
        {id: crypto.randomUUID(), title: 'VITE', isDone: true},
        {id: crypto.randomUUID(), title: 'GIT', isDone: true}
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }

    const filteredTasks = getFilteredTasks(tasks, filter)

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: crypto.randomUUID(),
            title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t))
    }

    return (
        <div className="app">
            <Todolist
                title={todolistTitle}
                tasks={filteredTasks}
                filter={filter}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    )
}

export default App
