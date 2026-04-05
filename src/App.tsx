import "./App.css"
import {useState} from "react";
import {Todolist} from "./Todolist.tsx";
import {FilterType, PriorityType, TaskType} from "./types/types.ts";


function App() {
    const todolistTitle = "What to learn"
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: crypto.randomUUID(), title: "HTML", isDone: true, priority: 'Low'},
        {id: crypto.randomUUID(), title: "CSS", isDone: true, priority: 'Low'},
        {id: crypto.randomUUID(), title: "JS", isDone: true, priority: 'Middle'},
        {id: crypto.randomUUID(), title: "GIT", isDone: false, priority: 'Middle'},
        {id: crypto.randomUUID(), title: "REACT", isDone: true, priority: 'High'},
        {id: crypto.randomUUID(), title: "REDUX", isDone: false, priority: 'High'},
        {id: crypto.randomUUID(), title: "RTK", isDone: false, priority: 'High'},
        {id: crypto.randomUUID(), title: "VITE", isDone: true, priority: 'Middle'}
    ])

    const [filter, setFilter] = useState<FilterType>('All')
    const [priority, setPriority] = useState<PriorityType>('All')

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const changeTaskFilter = (filter: FilterType) => setFilter(filter)
    const changePriorityFilter = (priority: PriorityType) => setPriority(priority)

    const getFilteredTasks = (tasks: TaskType[], filter: FilterType, priority: PriorityType): TaskType[] => {
        let filteredTasks = tasks

        if (filter === 'Active') {
            filteredTasks = tasks.filter(t => !t.isDone)
        }
        if (filter === 'Completed') {
            filteredTasks = tasks.filter(t => t.isDone)
        }

        if (priority !== 'All') {
            filteredTasks = tasks.filter(t => t.priority === priority)
        }

        return filteredTasks
    }

    const tasksForTodolist = getFilteredTasks(tasks, filter, priority)


    return (
        <div className="app">
            <Todolist
                title={todolistTitle}
                tasks={tasksForTodolist}
                deleteTask={deleteTask}
                changeTaskFilter={changeTaskFilter}
                changePriorityFilter={changePriorityFilter}/>
        </div>
    )
}

export default App
