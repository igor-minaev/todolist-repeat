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
    return <div className="App">
        <Todolist
            filter={filter}
            title={todolistTitle}
            tasks={tasks}
            removeTask={removeTask}
            changeFilter={changeFilter}/>
    </div>
}

export default App;
