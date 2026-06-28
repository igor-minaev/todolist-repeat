import {TodolistItem} from "@/TodolistItem";
import {useState} from "react";

export type Task = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const [tasks, setTasks] = useState<Task[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ])


    return (
        <div>
            <TodolistItem title="What to learn" tasks={tasks}/>
        </div>
    )
}

export default App
