import './App.css'
import {useState} from "react";
import {TaskType} from "./types/task.ts";
import {Todolist} from "./components/Todolist.tsx";

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

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    return (
        <div className="app">
            <Todolist
                title={todolistTitle}
                tasks={tasks}
                deleteTask={deleteTask}
            />
        </div>
    )
}

export default App
