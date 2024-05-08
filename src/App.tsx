import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    const todolistTitle = 'What to learn'

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: crypto.randomUUID(), title: 'HTML', isDone: true},
        {id: crypto.randomUUID(), title: 'CSS', isDone: true},
        {id: crypto.randomUUID(), title: 'JS', isDone: true},
        {id: crypto.randomUUID(), title: 'REACT', isDone: false},
        {id: crypto.randomUUID(), title: 'REDUX', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    const removeTask = (taskId: string) => setTasks(tasks.filter(t => t.id !== taskId))
    const changeFilter = (newFilterValue: FilterType) => setFilter(newFilterValue)

    return (
        <div className="App">
            <Todolist
                filter={filter}
                title={todolistTitle}
                tasks={tasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}

export default App;
