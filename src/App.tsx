import './App.css'
import {useState} from "react";
import {TasksStateType, TaskType} from "./types/task.ts";
import {Todolist} from "./components/Todolist.tsx";
import {getFilteredTasks} from "./utils/filtrationUtils.ts";
import {FilterType, TodolistType} from "./types/todolist.ts";
import {CreateItemForm} from "./components/CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

function App() {

    const todolistId_1 = crypto.randomUUID()
    const todolistId_2 = crypto.randomUUID()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: crypto.randomUUID(), title: 'HTML', isDone: true},
            {id: crypto.randomUUID(), title: 'CSS', isDone: true},
            {id: crypto.randomUUID(), title: 'JS', isDone: true},
            {id: crypto.randomUUID(), title: 'REACT', isDone: false},
            {id: crypto.randomUUID(), title: 'RTK', isDone: false},
            {id: crypto.randomUUID(), title: 'VITE', isDone: true},
            {id: crypto.randomUUID(), title: 'GIT', isDone: true}
        ],
        [todolistId_2]: [
            {id: crypto.randomUUID(), title: 'MILK', isDone: true},
            {id: crypto.randomUUID(), title: 'BREAD', isDone: true},
            {id: crypto.randomUUID(), title: 'SALT', isDone: true},
            {id: crypto.randomUUID(), title: 'COFFEE', isDone: false}
        ]
    })

    const addTask = (payload: { todolistId: string, title: string }) => {
        const {todolistId, title} = payload
        const newTask: TaskType = {
            id: crypto.randomUUID(),
            title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const deleteTask = (payload: { todolistId: string, taskId: string }) => {
        const {todolistId, taskId} = payload
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const changeTaskStatus = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
        const {todolistId, taskId, isDone} = payload
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    const changeTaskTitle = (payload: { todolistId: string, taskId: string, title: string }) => {
        const {todolistId, taskId, title} = payload
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)})
    }


    const addTodolist = (title: string) => {
        const newTodolistId = crypto.randomUUID()
        const newTodolist: TodolistType = {
            id: newTodolistId,
            title,
            filter: 'all'
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const changeFilter = (payload: { todolistId: string, filter: FilterType }) => {
        const {todolistId, filter} = payload
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        const copyTasks = {...tasks}
        delete copyTasks[todolistId]
        setTasks(copyTasks)
    }

    const changeTodolistTitle = (payload: { todolistId: string, title: string }) => {
        const {todolistId, title} = payload
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }

    const mappedTodolists = todolists.map(tl => {
        const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
        return <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={filteredTasks}
            filter={tl.filter}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            deleteTodolist={deleteTodolist}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
        />
    })

    return (
        <div className="app">
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Button color="inherit">Sign in</Button>
                </Toolbar>
            </AppBar>
            <CreateItemForm addItem={addTodolist}/>
            {mappedTodolists}
        </div>
    )
}

export default App
