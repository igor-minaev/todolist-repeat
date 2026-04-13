import "./App.css"
import {useState} from "react";
import {Todolist} from "./Todolist.tsx";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksType = {
    [key: string]: TaskType[]
}

export type FilterType = 'All' | 'Active' | 'Completed'

function App() {
    const todolistId_1 = crypto.randomUUID()
    const todolistId_2 = crypto.randomUUID()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'All'},
        {id: todolistId_2, title: 'What to buy', filter: 'All'}
    ])

    const [tasks, setTasks] = useState<TasksType>({
        [todolistId_1]: [
            {id: crypto.randomUUID(), title: 'HTML', isDone: true},
            {id: crypto.randomUUID(), title: 'CSS', isDone: true},
            {id: crypto.randomUUID(), title: 'JS', isDone: false},
            {id: crypto.randomUUID(), title: 'VITE', isDone: true},
            {id: crypto.randomUUID(), title: 'REACT', isDone: false},
            {id: crypto.randomUUID(), title: 'REDUX', isDone: false}
        ],
        [todolistId_2]: [
            {id: crypto.randomUUID(), title: 'Milk', isDone: true},
            {id: crypto.randomUUID(), title: 'Bread', isDone: true},
            {id: crypto.randomUUID(), title: 'Meat', isDone: false},
            {id: crypto.randomUUID(), title: 'Potato', isDone: true},
        ]
    })


    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask: TaskType = {
            id: crypto.randomUUID(),
            title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    const changeFilter = (filter: FilterType) => {
        // setFilter(filter)
    }

    const tasksForTodolist = (tasks: TaskType[], filter: FilterType): TaskType[] => {
        switch (filter) {
            case "Active":
                return tasks.filter(t => !t.isDone)
            case "Completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    return (
        <div className="app">
            {todolists.map(tl => (
                <Todolist key={tl.id}
                          id={tl.id}
                          title={tl.title}
                          filter={tl.filter}
                          tasks={tasksForTodolist(tasks[tl.id], tl.filter)}
                          removeTask={removeTask}
                          changeFilter={changeFilter}
                          addTask={addTask}
                          changeTaskStatus={changeTaskStatus}
                />
            ))}

        </div>
    )
}

export default App
