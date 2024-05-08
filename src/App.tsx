import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';

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
export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    const todolistId_1 = crypto.randomUUID()
    const todolistId_2 = crypto.randomUUID()
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to learn2', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: crypto.randomUUID(), title: 'HTML', isDone: true},
            {id: crypto.randomUUID(), title: 'CSS', isDone: true},
            {id: crypto.randomUUID(), title: 'JS', isDone: true},
            {id: crypto.randomUUID(), title: 'REACT', isDone: false},
            {id: crypto.randomUUID(), title: 'REDUX', isDone: false}
        ],
        [todolistId_2]: [
            {id: crypto.randomUUID(), title: 'HTML2', isDone: true},
            {id: crypto.randomUUID(), title: 'CSS2', isDone: true},
            {id: crypto.randomUUID(), title: 'JS2', isDone: true},
            {id: crypto.randomUUID(), title: 'REACT2', isDone: false},
            {id: crypto.randomUUID(), title: 'REDUX2', isDone: false}
        ]
    })


    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }
    const changeTodolistFilter = (newFilterValue: FilterType) => {
        // setTodolists()
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: crypto.randomUUID(),
            title,
            isDone: false
        }
        // setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t))
    }

    const mappedTodolists = todolists.length
        ? todolists.map(t => {
            return (
                <Todolist
                    todolistId={t.id}
                    filter={t.filter}
                    title={t.title}
                    tasks={tasks[t.id]}
                    removeTask={removeTask}
                    changeFilter={changeTodolistFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                />
            )
        })
        : <p>Create new todolist</p>


    return (
        <div className="App">
            {mappedTodolists}
        </div>
    )
}

export default App;
