import './App.css'
import {type TaskType, Todolist} from "./Todolist";
import {useState} from "react";


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

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id))
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
