import React from 'react';
import './App.css';
import {TodoList} from './components/TodoList';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    const todoListTitle = 'What to learn'
    const tasks: TaskType[] = [
        {id: crypto.randomUUID(), title: 'HTML', isDone: true},
        {id: crypto.randomUUID(), title: 'CSS', isDone: true},
        {id: crypto.randomUUID(), title: 'JS', isDone: true},
        {id: crypto.randomUUID(), title: 'REACT', isDone: false},
        {id: crypto.randomUUID(), title: 'REDUX', isDone: false},
        {id: crypto.randomUUID(), title: 'GIT', isDone: true},
        {id: crypto.randomUUID(), title: 'RTK', isDone: false}
    ]
    return (
        <div className="App">
            <TodoList title={todoListTitle} tasks={tasks}/>
        </div>
    );
}

export default App;
