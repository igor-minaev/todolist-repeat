import './App.css'
import {type TaskType, Todolist} from "./Todolist";
import {useState} from "react";

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {

    const todolistTitle = 'What to learn'

    const [tasks, setTasks] = useState<TaskType[]>([
        {
            id: crypto.randomUUID(),
            title: 'HTML',
            isDone: true
        },
        {
            id: crypto.randomUUID(),
            title: 'CSS',
            isDone: true
        },
        {
            id: crypto.randomUUID(),
            title: 'JS',
            isDone: false
        },
        {
            id: crypto.randomUUID(),
            title: 'REACT',
            isDone: false
        },
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const createTask = (title: string) => {
        const newTask: TaskType = {
            id: crypto.randomUUID(),
            title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeFilter = (filter: FilterValuesType) => setFilter(filter)

    const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }

    const filteredTasks = getFilteredTasks(tasks, filter)

    return (
        <div className="app">
            <Todolist
                title={todolistTitle}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                createTask={createTask}
            />
        </div>
    )
}

export default App
