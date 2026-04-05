import "./App.css"
import {useState} from "react";
import {Todolist} from "./Todolist.tsx";


function App() {
    const [tasks, setTasks] = useState()

    return (
        <div className="app">
            <Todolist/>
        </div>
    )
}

export default App
