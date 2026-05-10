import './App.css'
import {useState} from "react";
import {TaskType} from "./types/task.ts";
import {Todolist} from "./components/Todolist.tsx";
import {getFilteredTasks} from "./utils/filtrationUtils.ts";
import {FilterType, TodolistType} from "./types/todolist.ts";

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
            {id: crypto.randomUUID(), title: 'JS', isDone: true},
            {id: crypto.randomUUID(), title: 'REACT', isDone: false},
            {id: crypto.randomUUID(), title: 'RTK', isDone: false},
            {id: crypto.randomUUID(), title: 'VITE', isDone: true},
            {id: crypto.randomUUID(), title: 'GIT', isDone: true}
        ],
        [todolistId_2]: [
            {id: crypto.randomUUID(), title: 'MILK', isDone: true},
            {id: crypto.randomUUID(), title: 'BREAD', isDone: true},
            {id: crypto.randomUUID(), title: 'SALT', isDone: true},
            {id: crypto.randomUUID(), title: 'COFFEE', isDone: false}
        ]
    })

    const deleteTask = (taskId: string) => {
        // setTasks(tasks.filter(t => t.id !== taskId))
    }

    const changeFilter = (filter: FilterType) => {
        // setFilter(filter)
    }


    const addTask = (title: string) => {
        // const newTask: TaskType = {
        //     id: crypto.randomUUID(),
        //     title,
        //     isDone: false
        // }
        // setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t))
    }

    const mappedTodolists = todolists.map(t => {
        const filteredTasks = getFilteredTasks(tasks[t.id], t.filter)
        return <Todolist
            key={t.id}
            id={t.id}
            title={t.title}
            tasks={filteredTasks}
            filter={t.filter}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
        />
    })

    return (
        <div className="app">
            {mappedTodolists}
        </div>
    )
}

export default App
