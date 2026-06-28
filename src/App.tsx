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

    const tasks2: Task[] = [
        {id: 1, title: 'Hello world', isDone: true},
        {id: 2, title: 'I am Happy', isDone: false},
        {id: 3, title: 'Yo', isDone: false},
    ]

    return (
        <div>
            <TodolistItem title="What to learn" tasks={tasks1}/>
            <TodolistItem title="Songs" tasks={tasks2}/>
        </div>
    )
}

export default App
