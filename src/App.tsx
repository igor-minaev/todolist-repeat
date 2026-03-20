import {Todolist} from "./Todolist.tsx";
import "./App.css"
import {FilterType, TaskType} from "./types/types.ts";
import {useState} from "react";
import {getFilteredTasks} from "./utils/utils.ts";

function App() {
    // BLL

    const TodolistTitle = "What to learn"

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: crypto.randomUUID(), title: "HTML", isDone: true, priority: "Low"},
        {id: crypto.randomUUID(), title: "CSS", isDone: true, priority: "Low"},
        {id: crypto.randomUUID(), title: "JS", isDone: true, priority: "High"},
        {id: crypto.randomUUID(), title: "REACT", isDone: false, priority: "High"},
        {id: crypto.randomUUID(), title: "RTK", isDone: false, priority: "High"}
    ])

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id != taskId))
    }

    // UI
    const [filter, setFilter] = useState<FilterType>("All")
    const changeFilter = (newFilter: FilterType) => {
        setFilter(newFilter)
    }

    const tasksForRender = getFilteredTasks(tasks, filter)

    return (
        <div className="app">
            <Todolist
                title={TodolistTitle}
                tasks={tasksForRender}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}

export default App
