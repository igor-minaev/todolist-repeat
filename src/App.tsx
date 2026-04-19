import "./App.css"
import {useState} from "react";

function App() {
    const todolistTitle = 'What to learn'
    const [tasks, setTasks] = useState([
        {id: crypto.randomUUID(), title: "HTML", isDone: true},
        {id: crypto.randomUUID(), title: "CSS", isDone: true},
        {id: crypto.randomUUID(), title: "JS", isDone: false},
        {id: crypto.randomUUID(), title: "VITE", isDone: true},
        {id: crypto.randomUUID(), title: "REACT", isDone: false},
        {id: crypto.randomUUID(), title: "REDUX", isDone: false}
    ])
    return (
        <div className="app">
        </div>
    )
}

export default App
