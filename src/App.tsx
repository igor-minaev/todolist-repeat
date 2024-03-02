import React, {useState} from 'react';
import './App.css';
import {TodoList} from './components/TodoList';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'All' | 'Active' | 'Completed'

function App() {
    const todoListTitle = 'What to learn'
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: crypto.randomUUID(), title: 'HTML', isDone: true},
        {id: crypto.randomUUID(), title: 'CSS', isDone: true},
        {id: crypto.randomUUID(), title: 'JS', isDone: true},
        {id: crypto.randomUUID(), title: 'REACT', isDone: false},
        {id: crypto.randomUUID(), title: 'REDUX', isDone: false},
        {id: crypto.randomUUID(), title: 'GIT', isDone: true},
        {id: crypto.randomUUID(), title: 'RTK', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterType>('All')

    const removeTask = (taskId: string) => setTasks(tasks.filter(t => t.id !== taskId))

    const changeFilter = (newFilterValue: FilterType) => setFilter(newFilterValue)

    const getFilteredTasks = (tasks: TaskType[], filter: FilterType): TaskType[] => {
        switch (filter) {
            case 'Active':
                return tasks.filter(t => !t.isDone)
            case 'Completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }
    const filteredTasks = getFilteredTasks(tasks, filter)
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
