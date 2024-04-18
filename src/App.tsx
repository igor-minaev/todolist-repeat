import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from './components/Todolist';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type  TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'REACT', isDone: false},
            {id: v1(), title: 'REDUX', isDone: false}
        ],
        [todolistId_2]: [
            {id: v1(), title: 'BREAD', isDone: true},
            {id: v1(), title: 'MILK', isDone: true},
            {id: v1(), title: 'TOMATO', isDone: false}
        ]
    })


    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
        })
    }
    const addTask = (todolistId: string, title: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
        delete tasks[todolistId]
    }

    const changeTodolistFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter} : t))
    }
    const mappedTodolists: JSX.Element[] = todolists.map(t => {
        return (
            <Todolist
                key={t.id}
                todolistId={t.id}
                filter={t.filter}
                title={t.title}
                tasks={tasks[t.id]}
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}/>
        )
    })
    return (
        <div className="App">
            {todolists.length ? mappedTodolists : <p>Create new todolist!</p>}
        </div>
    )
}

export default App;
