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

function App() {
    const todolistTitle = 'What to learn'
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false},
        {id: v1(), title: 'REDUX', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: string) => setTasks(tasks.filter(t => t.id !== taskId))
    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t))
    }

    const changeFilter = (filter: FilterValuesType) => setFilter(filter)
    return (
        <div className="App">
            <Todolist
                filter={filter}
                title={todolistTitle}
                tasks={tasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}/>
        </div>
    )
}

export default App;
