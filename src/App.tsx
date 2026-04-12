import "./App.css"
import {useState} from "react";
import {Todolist} from "./Todolist.tsx";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    const todolistTitle = "What to learn"
    const [tasks, setTasks] = useState([
        {id: crypto.randomUUID(), title: 'HTML', isDone: true},
        {id: crypto.randomUUID(), title: 'CSS', isDone: true},
        {id: crypto.randomUUID(), title: 'JS', isDone: false},
        {id: crypto.randomUUID(), title: 'VITE', isDone: true},
        {id: crypto.randomUUID(), title: 'REACT', isDone: false},
        {id: crypto.randomUUID(), title: 'REDUX', isDone: false}
    ])

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }


    return (
        <div className="app">
            <Todolist
                title={todolistTitle}
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    )
}

export default App
