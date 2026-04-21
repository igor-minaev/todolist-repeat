import "./App.css"
import {useState} from "react";
import {Todolist} from "./Todolist.tsx";
import {getFilteredTasks} from "./utils.ts";
import {CreateItemForm} from "./CreateItemForm.tsx";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksType = {
    [key: string]: TaskType[]
}

function App() {
    const todolistId_1 = crypto.randomUUID()
    const todolistId_2 = crypto.randomUUID()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
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
            {id: crypto.randomUUID(), title: 'MILK', isDone: true},
            {id: crypto.randomUUID(), title: 'BREAD', isDone: true},
            {id: crypto.randomUUID(), title: 'POTATO', isDone: false},
            {id: crypto.randomUUID(), title: 'WATER', isDone: true},
            {id: crypto.randomUUID(), title: 'SALT', isDone: false},
            {id: crypto.randomUUID(), title: 'MEAT', isDone: false}
        ]
    })


    const changeTodolistFilter = (payload: { todolistId: string, filter: FilterType }) => {
        const {todolistId, filter} = payload
        setTodolists(prevState => prevState.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }

    const removeTask = (payload: { todolistId: string, taskId: string }) => {
        const {todolistId, taskId} = payload
        setTasks(prevState => ({...prevState, [todolistId]: prevState[todolistId].filter(t => t.id !== taskId)}))
    }

    const addTask = (payload: { todolistId: string, title: string }) => {
        const {todolistId, title} = payload
        const newTask: TaskType = {
            id: crypto.randomUUID(),
            title,
            isDone: false
        }
        setTasks(prevState => ({...prevState, [todolistId]: [newTask, ...prevState[todolistId]]}))
    }

    const changeTaskStatus = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
        const {todolistId, taskId, isDone} = payload
        setTasks(prevState => ({
            ...prevState,
            [todolistId]: prevState[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)
        }))
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(prevState => prevState.filter(tl => tl.id !== todolistId))
        const copyTasks = {...tasks}
        delete copyTasks[todolistId]
        setTasks(copyTasks)
    }

    const addTodolist = (title: string) => {
        const newTodolist: TodolistType = {
            id: crypto.randomUUID(),
            title,
            filter: 'all'
        }
        setTodolists(prevState => [...prevState, newTodolist])
        setTasks(prevState => ({...prevState, [newTodolist.id]: []}))
    }


    const mappedTodolists = todolists.length
        ? todolists.map(tl => {
            const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
            return (
                <Todolist
                    key={tl.id}
                    id={tl.id}
                    filter={tl.filter}
                    title={tl.title}
                    tasks={filteredTasks}
                    removeTask={removeTask}
                    changeTodolistFilter={changeTodolistFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodolist={removeTodolist}
                />
            )
        })
        : <p>Create new todolist!</p>


    return (
        <div className="app">
            <CreateItemForm createItem={addTodolist}/>
            {mappedTodolists}
        </div>
    )
}

export default App
