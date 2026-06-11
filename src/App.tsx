import './App.css'
import {type TaskType, Todolist} from "./Todolist";
import {useState} from "react";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = Record<string, TaskType[]>


function App() {

    const todolistId_1 = crypto.randomUUID();
    const todolistId_2 = crypto.randomUUID();

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: crypto.randomUUID(), title: 'HTML', isDone: true},
            {id: crypto.randomUUID(), title: 'CSS', isDone: true},
            {id: crypto.randomUUID(), title: 'JS', isDone: false},
            {id: crypto.randomUUID(), title: 'REACT', isDone: false},
        ],
        [todolistId_2]: [
            {id: crypto.randomUUID(), title: 'MILK', isDone: true},
            {id: crypto.randomUUID(), title: 'BREAD', isDone: true},
            {id: crypto.randomUUID(), title: 'SALT', isDone: false},
            {id: crypto.randomUUID(), title: 'ICE-CREAM', isDone: false},
        ]
    })


    const [filter, setFilter] = useState<FilterValuesType>('all')


    const deleteTask = (id: string) => {
        // setTasks(tasks.filter(task => task.id !== id))
    }
    const createTask = (title: string) => {
        // const newTask: TaskType = {
        //     id: crypto.randomUUID(),
        //     title,
        //     isDone: false
        // }
        // setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (id: string, isDone: boolean) => {
        // setTasks(tasks.map(task => task.id === id ? {...task, isDone} : task))
    }

    const changeTodolistFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
    }

    const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }


    return (
        <div className="app">
            {todolists.map(todolist => {
                return (
                    <Todolist
                        key={todolist.id}
                        id={todolist.id}
                        title={todolist.title}
                        filter={todolist.filter}
                        tasks={getFilteredTasks(tasks[todolist.id], todolist.filter)}
                        deleteTask={deleteTask}
                        changeTodolistFilter={changeTodolistFilter}
                        createTask={createTask}
                        changeTaskStatus={changeTaskStatus}
                    />
                )
            })}
        </div>
    )
}

export default App
