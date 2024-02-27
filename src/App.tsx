import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';

type CategoryType = 'Frontend' | 'Backend'
export type TaskType = {
    id: string
    category: CategoryType
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed'

function App() {
    const todolistTitle = 'What to learn'
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: crypto.randomUUID(), category: 'Frontend', title: 'HTML', isDone: true},
        {id: crypto.randomUUID(), category: 'Backend', title: 'NODE JS', isDone: true},
        {id: crypto.randomUUID(), category: 'Frontend', title: 'CSS', isDone: true},
        {id: crypto.randomUUID(), category: 'Backend', title: 'DOCKER', isDone: false},
        {id: crypto.randomUUID(), category: 'Frontend', title: 'REACT', isDone: false},
        {id: crypto.randomUUID(), category: 'Frontend', title: 'REDUX', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterType>('all')

    const removeTask = (taskId: string) => setTasks(tasks.filter(t => t.id !== taskId))
    const changeFilter = (newFilterValue: FilterType) => setFilter(newFilterValue)
    const addTask = (title: string) => {
        const newTask: TaskType = {id: crypto.randomUUID(), category: 'Frontend', title, isDone: false}
        setTasks([newTask,...tasks])
    }

    const getFilteredTasks = (allTask: TaskType[], filter: FilterType): TaskType[] => {
        switch (filter) {
            case 'active':
                return allTask.filter(t => !t.isDone)
            case 'completed':
                return allTask.filter(t => t.isDone)
            default:
                return allTask
        }
    }
    const filteredTasks = getFilteredTasks(tasks, filter)

    return (
        <div className="App">
            <Todolist
                title={todolistTitle}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
