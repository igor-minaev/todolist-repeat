import React, {useState} from 'react';
import './App.css';
import {TodoList} from './components/TodoList';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

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

    const removeTask = (taskId: string) => setTasks(tasks.filter(t => t.id !== taskId))
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasks}
                removeTask={removeTask}/>
        </div>
    );
}

export default App;
