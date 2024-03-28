import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';


function App() {
    const todolistTitle = 'What to learn'
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: crypto.randomUUID(), title: 'HTML', isDone: true},
        {id: crypto.randomUUID(), title: 'CSS', isDone: true},
        {id: crypto.randomUUID(), title: 'REACT', isDone: false},
        {id: crypto.randomUUID(), title: 'JS', isDone: true},
        {id: crypto.randomUUID(), title: 'REDUX', isDone: false},
    ])

    const removeTask = (taskId: string) => setTasks(tasks.filter(t => t.id !== taskId))
    return <div className="App">
        <Todolist
            title={todolistTitle}
            tasks={tasks}
            removeTask={removeTask}/>
    </div>
}

export default App;
