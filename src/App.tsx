import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';

export type FilterType = 'All' | 'Active' | 'Completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

function App() {
    const todolistId_1 = crypto.randomUUID()
    const todolistId_2 = crypto.randomUUID()
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'All'},
        {id: todolistId_2, title: 'What to buy', filter: 'All'}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: crypto.randomUUID(), title: 'HTML', isDone: true},
            {id: crypto.randomUUID(), title: 'CSS', isDone: true},
            {id: crypto.randomUUID(), title: 'REACT', isDone: false},
            {id: crypto.randomUUID(), title: 'JS', isDone: true},
            {id: crypto.randomUUID(), title: 'REDUX', isDone: false},
        ],
        [todolistId_2]: [
            {id: crypto.randomUUID(), title: 'MILK', isDone: true},
            {id: crypto.randomUUID(), title: 'BREAD', isDone: true},
            {id: crypto.randomUUID(), title: 'POTATO', isDone: false},
            {id: crypto.randomUUID(), title: 'BEER', isDone: true},
            {id: crypto.randomUUID(), title: 'MEAT', isDone: false},
        ]
    })


    const removeTask = (taskId: string) => {
        // setTasks(tasks.filter(t => t.id !== taskId))
    }
    const changeTodolistFilter = (todolistId: string, filter: FilterType) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter} : t))
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
    return <div className="App">
        {todolists.length
            ? todolists.map(t => {
                    return <Todolist
                        key={t.id}
                        id={t.id}
                        filter={t.filter}
                        title={t.title}
                        tasks={tasks[t.id]}
                        removeTask={removeTask}
                        changeTodolistFilter={changeTodolistFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}/>
                }
            )
            : <p>Create new todolist</p>
        }
    </div>
}

export default App;
