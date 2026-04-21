import "./App.css"
import {useState} from "react";
import {Todolist} from "./Todolist.tsx";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {

    const todolistTitle = 'What to learn'
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: crypto.randomUUID(), title: 'HTML', isDone: true},
        {id: crypto.randomUUID(), title: 'CSS', isDone: true},
        {id: crypto.randomUUID(), title: 'JS', isDone: false},
        {id: crypto.randomUUID(), title: 'VITE', isDone: true},
        {id: crypto.randomUUID(), title: 'REACT', isDone: false},
        {id: crypto.randomUUID(), title: 'REDUX', isDone: false}
    ])


    return (
        <div className="app">
            <Todolist/>
        </div>
    )
}

export default App
