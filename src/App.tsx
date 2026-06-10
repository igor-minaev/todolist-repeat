import './App.css'
import {type TaskType, Todolist} from "./Todolist";
import {useState} from "react";


function App() {

    const todolistTitle_1 = 'What to learn'
    const todolistTitle_2 = 'What to buy'
    //
    // const [tasks, setTasks] = useState<TaskType[]>([
    //     {
    //         id: crypto.randomUUID(),
    //         title: 'HTML',
    //         isDone: true
    //     },
    //     {
    //         id: crypto.randomUUID(),
    //         title: 'CSS',
    //         isDone: true
    //     },
    //     {
    //         id: crypto.randomUUID(),
    //         title: 'JS',
    //         isDone: false
    //     },
    //     {
    //         id: crypto.randomUUID(),
    //         title: 'REACT',
    //         isDone: false
    //     },
    //
    // ])

    const tasks_1: TaskType[] = [
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
    ]

    const tasks_2: TaskType[] = [
        {
            id: crypto.randomUUID(),
            title: 'MILK',
            isDone: true
        },
        {
            id: crypto.randomUUID(),
            title: 'BREAD',
            isDone: true
        },
        {
            id: crypto.randomUUID(),
            title: 'ICE-CREAM',
            isDone: false
        },
        {
            id: crypto.randomUUID(),
            title: 'MEAT',
            isDone: false
        },
    ]
    return (
        <div className="app">
            <Todolist title={todolistTitle_1} tasks={tasks_1}/>
            <Todolist title={todolistTitle_2} tasks={tasks_2}/>
        </div>
    )
}

export default App
