import "./App.css"
import {useState} from "react";
import {Todolist} from "./Todolist.tsx";
import {FilterType, TaskType} from "./types/types.ts";


function App() {
    const todolistTitle = "What to learn"
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: crypto.randomUUID(), title: "HTML", isDone: true, priority: 'Low'},
        {id: crypto.randomUUID(), title: "CSS", isDone: true, priority: 'Low'},
        {id: crypto.randomUUID(), title: "JS", isDone: true, priority: 'Middle'},
        {id: crypto.randomUUID(), title: "GIT", isDone: false, priority: 'Middle'},
        {id: crypto.randomUUID(), title: "REACT", isDone: true, priority: 'High'},
        {id: crypto.randomUUID(), title: "REDUX", isDone: false, priority: 'High'},
        {id: crypto.randomUUID(), title: "RTK", isDone: false, priority: 'High'},
        {id: crypto.randomUUID(), title: "VITE", isDone: true, priority: 'Middle'}
    ])

    const [filter, setFilter] = useState<FilterType>('All')

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const changeTaskFilter = (filter: FilterType) => setFilter(filter)

    const getFilteredTasks = (tasks: TaskType[], filter: FilterType): TaskType[] => {
        let filteredTasks = tasks

        if (filter === 'Active') {
            filteredTasks = tasks.filter(t => !t.isDone)
        }
        if (filter === 'Completed') {
            filteredTasks = tasks.filter(t => t.isDone)
        }

        return filteredTasks
    }

    const tasksForTodolist = getFilteredTasks(tasks, filter)


    return (
        <div className="app">
            <Todolist
                title={todolistTitle}
                tasks={tasksForTodolist}
                deleteTask={deleteTask}
                changeTaskFilter={changeTaskFilter}/>
        </div>
    )
}

export default App
