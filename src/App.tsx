import {TodolistItem} from "@/TodolistItem";

export type Task = {
    id: number
    title: string
    isDone: boolean
}

function App() {

    const tasks1: Task[] = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ]

    return (
        <div>
            <TodolistItem title="What to learn" tasks={tasks1}/>
        </div>
    )
}

export default App
