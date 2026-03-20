import {Todolist} from "./Todolist.tsx";
import "./App.css"
import {TaskType} from "./types/types.ts";

function App() {

    const TodolistTitle = "What to learn"
    const tasks: TaskType[] = [
        {id: crypto.randomUUID(), title: "HTML", isDone: true, priority: "Low"},
        {id: crypto.randomUUID(), title: "CSS", isDone: true, priority: "Low"},
        {id: crypto.randomUUID(), title: "JS", isDone: true, priority: "High"},
        {id: crypto.randomUUID(), title: "REACT", isDone: false, priority: "High"},
        {id: crypto.randomUUID(), title: "RTK", isDone: false, priority: "High"}
    ]

    return (
        <div className="app">
            <Todolist title={TodolistTitle} tasks={tasks}/>
        </div>
    )
}

export default App
