import './App.css'
import {TaskType, Todolist} from "./Todolist.tsx";

function App() {
    const todolistTitle_1 = "What to learn"
    const todolistTitle_3 = "What to eat"
    const tasks_1: Array<TaskType> = [
        {id: crypto.randomUUID(), title: "HTML", isDone: true},
        {id: crypto.randomUUID(), title: "CSS", isDone: true},
        {id: crypto.randomUUID(), title: "JS", isDone: false},
        {id: crypto.randomUUID(), title: "REACT", isDone: false},
    ]
    const tasks_2: Array<TaskType> = [
        {id: crypto.randomUUID(), title: "BREAD", isDone: true},
        {id: crypto.randomUUID(), title: "MILK", isDone: true},
        {id: crypto.randomUUID(), title: "POTATO", isDone: false},
        {id: crypto.randomUUID(), title: "CHEESE", isDone: false},
    ]
    return (
        <div className="app">
            <Todolist title={todolistTitle_1} tasks={tasks_1}/>
            <Todolist title={todolistTitle_3} tasks={tasks_2}/>
        </div>
    )
}

export default App
