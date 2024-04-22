import React, {useReducer, useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from './components/Todolist';
import {AddItemForm} from './components/AddItemForm';
import {AppBarLogin} from './components/AppBarLogin';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from './reducers/taskReducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type  TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, dispatchTasks] = useReducer(taskReducer, {
        [todolistId_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'REACT', isDone: false},
            {id: v1(), title: 'REDUX', isDone: false}
        ],
        [todolistId_2]: [
            {id: v1(), title: 'BREAD', isDone: true},
            {id: v1(), title: 'MILK', isDone: true},
            {id: v1(), title: 'TOMATO', isDone: false}
        ]
    })

    const removeTask = (todolistId: string, taskId: string) => {
        dispatchTasks(removeTaskAC(todolistId,taskId))
    }
    const addTask = (todolistId: string, title: string) => {
       dispatchTasks(addTaskAC(todolistId,title))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
      dispatchTasks(changeTaskStatusAC(todolistId,taskId,isDone))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchTasks(changeTaskTitleAC(todolistId,taskId,title))
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {id: newTodolistId, title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }
    const changeTodolistFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter} : t))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, title} : t))
    }

    const mappedTodolists: JSX.Element[] = todolists.map(t => {
        return (
            <Grid item>
                <Todolist
                    key={t.id}
                    todolistId={t.id}
                    filter={t.filter}
                    title={t.title}
                    tasks={tasks[t.id]}
                    removeTask={removeTask}
                    changeTodolistFilter={changeTodolistFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                    changeTaskTitle={changeTaskTitle}/>
            </Grid>
        )
    })
    return (
        <div className="App">
            <AppBarLogin/>
            <Container fixed>
                <Grid container style={{margin: '20px 0'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={2}>
                    {todolists.length ? mappedTodolists : <p>Create new todolist!</p>}
                </Grid>
            </Container>
        </div>
    )
}

export default App;
