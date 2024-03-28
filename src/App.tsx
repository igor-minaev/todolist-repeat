import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';

export type FilterType = 'All' | 'Active' | 'Completed'

function App() {
    const todolistTitle = 'What to learn'
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: crypto.randomUUID(), title: 'HTML', isDone: true},
        {id: crypto.randomUUID(), title: 'CSS', isDone: true},
        {id: crypto.randomUUID(), title: 'REACT', isDone: false},
        {id: crypto.randomUUID(), title: 'JS', isDone: true},
        {id: crypto.randomUUID(), title: 'REDUX', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterType>('All')

    const removeTask = (taskId: string) => setTasks(tasks.filter(t => t.id !== taskId))
    const changeFilter = (filter: FilterType) => setFilter(filter)
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: crypto.randomUUID(),
            title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t))
    }
    return <div className="App">
        <Todolist
            filter={filter}
            title={todolistTitle}
            tasks={tasks}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}/>
    </div>
}

export default App;
