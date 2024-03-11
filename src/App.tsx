import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';

export type DirectionType = 'Frontend' | 'Backend' | '-'

export type TaskType = {
    id: string
    title: string
    direction: DirectionType
    isDone: boolean
}
export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksObjType = {
    [key: string]: TaskType[]
}

function App() {
    const todolistId_1 = crypto.randomUUID()
    const todolistId_2 = crypto.randomUUID()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn today', filter: 'All'},
        {id: todolistId_2, title: 'What to learn tomorrow', filter: 'All'}
    ])
    const [tasks, setTasks] = useState<TasksObjType>({
        [todolistId_1]: [
            {id: crypto.randomUUID(), title: 'HTML', direction: 'Frontend', isDone: true},
            {id: crypto.randomUUID(), title: 'Node JS', direction: 'Backend', isDone: false},
            {id: crypto.randomUUID(), title: 'CSS', direction: 'Frontend', isDone: true},
            {id: crypto.randomUUID(), title: 'REACT', direction: 'Frontend', isDone: false},
            {id: crypto.randomUUID(), title: 'SQL', direction: 'Backend', isDone: false}
        ],
        [todolistId_2]: [
            {id: crypto.randomUUID(), title: 'HTML2', direction: 'Frontend', isDone: true},
            {id: crypto.randomUUID(), title: 'Node JS2', direction: 'Backend', isDone: false},
            {id: crypto.randomUUID(), title: 'CSS2', direction: 'Frontend', isDone: true},
            {id: crypto.randomUUID(), title: 'REACT2', direction: 'Frontend', isDone: false},
            {id: crypto.randomUUID(), title: 'SQL2', direction: 'Backend', isDone: false}
        ]
    })


    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }
    const changeFilter = (filter: FilterValuesType) => {
        // setFilter(filter)
    }
    const addTask = (title: string, direction: DirectionType) => {
        // const newTask: TaskType = {id: crypto.randomUUID(), title, direction, isDone: false}
        // setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t))
    }
    return (
        <div className="App">
            {
                todolists.length
                    ? todolists.map(t => {
                        return <Todolist
                            key={t.id}
                            todolistId={t.id}
                            filter={t.filter}
                            todolistTitle={t.title}
                            tasks={tasks[t.id]}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}/>
                    })
                    : <p>Create new Todolist!</p>
            }

        </div>
    );
}

export default App;
