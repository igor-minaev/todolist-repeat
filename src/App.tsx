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

function App() {
    const todolistTitle = 'What to learn'
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: crypto.randomUUID(), title: 'HTML', direction: 'Frontend', isDone: true},
        {id: crypto.randomUUID(), title: 'Node JS', direction: 'Backend', isDone: false},
        {id: crypto.randomUUID(), title: 'CSS', direction: 'Frontend', isDone: true},
        {id: crypto.randomUUID(), title: 'REACT', direction: 'Frontend', isDone: false},
        {id: crypto.randomUUID(), title: 'SQL', direction: 'Backend', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('All')

    const removeTask = (taskId: string) => setTasks(tasks.filter(t => t.id !== taskId))
    const changeFilter = (filter: FilterValuesType) => setFilter(filter)
    const addTask = (title: string, direction: DirectionType) => {
        const newTask: TaskType = {id: crypto.randomUUID(), title, direction, isDone: false}
        setTasks([newTask, ...tasks])
    }
    return (
        <div className="App">
            <Todolist
                filter={filter}
                todolistTitle={todolistTitle}
                tasks={tasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}/>
        </div>
    );
}

export default App;
