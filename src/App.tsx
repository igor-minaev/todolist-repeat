import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';


function App() {
    const todolistTitle = 'What to learn'
    const [tasks, setTasks] = useState([
        {id: crypto.randomUUID(), title: 'HTML', direction: 'Frontend', isDone: true},
        {id: crypto.randomUUID(), title: 'Node JS', direction: 'Backend', isDone: false},
        {id: crypto.randomUUID(), title: 'CSS', direction: 'Frontend', isDone: true},
        {id: crypto.randomUUID(), title: 'REACT', direction: 'Frontend', isDone: false},
        {id: crypto.randomUUID(), title: 'SQL', direction: 'Backend', isDone: false}
    ])
    return (
        <div className="App">
            <Todolist/>
        </div>
    );
}

export default App;
