import "./App.css"
import {useState} from "react";
import {Todolist} from "./Todolist.tsx";
import {getFilteredTasks} from "./utils.ts";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

function App() {
    const todolistId_1 = crypto.randomUUID()
    const todolistId_2 = crypto.randomUUID()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState({
        [todolistId_1]: [
            {id: crypto.randomUUID(), title: 'HTML', isDone: true},
            {id: crypto.randomUUID(), title: 'CSS', isDone: true},
            {id: crypto.randomUUID(), title: 'JS', isDone: false},
            {id: crypto.randomUUID(), title: 'VITE', isDone: true},
            {id: crypto.randomUUID(), title: 'REACT', isDone: false},
            {id: crypto.randomUUID(), title: 'REDUX', isDone: false}
        ],
        [todolistId_2]: [
            {id: crypto.randomUUID(), title: 'MILK', isDone: true},
            {id: crypto.randomUUID(), title: 'BREAD', isDone: true},
            {id: crypto.randomUUID(), title: 'POTATO', isDone: false},
            {id: crypto.randomUUID(), title: 'WATER', isDone: true},
            {id: crypto.randomUUID(), title: 'SALT', isDone: false},
            {id: crypto.randomUUID(), title: 'MEAT', isDone: false}
        ]
    })


    const changeTodolistFilter = (filter: FilterType) => {
        // setFilter(filter)
    }

    const removeTask = (taskId: string) => {
        // setTasks(prevState => prevState.filter(t => t.id !== taskId))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: crypto.randomUUID(),
            title,
            isDone: false
        }
        // setTasks(prevState => [newTask, ...prevState])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        // setTasks(prevState => prevState.map(t => t.id === taskId ? {...t, isDone} : t))
    }


    const mappedTodolists = todolists.length
        ? todolists.map(tl => {
            const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
            return (
                <Todolist
                    filter={tl.filter}
                    title={tl.title}
                    tasks={filteredTasks}
                    removeTask={removeTask}
                    changeTodolistFilter={changeTodolistFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                />
            )
        })
        : <p>Create new todolist!</p>


    return (
        <div className="app">
            {mappedTodolists}
        </div>
    )
}

export default App
