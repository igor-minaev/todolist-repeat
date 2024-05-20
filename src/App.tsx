import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {AddItemForm} from './components/AddItemForm';
import {AppBarComponent} from './components/AppBarComponent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './reducers/todolistsReducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './reducers/tasksReduser';


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
export type TasksStateType = {
    [key: string]: TaskType[]
}

type ThemeMode = 'dark' | 'light'

function App() {


    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4'
            }
        }
    })

    const todolistId_1 = crypto.randomUUID()
    const todolistId_2 = crypto.randomUUID()

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to learn2', filter: 'all'}
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId_1]: [
            {id: crypto.randomUUID(), title: 'HTML', isDone: true},
            {id: crypto.randomUUID(), title: 'CSS', isDone: true},
            {id: crypto.randomUUID(), title: 'JS', isDone: true},
            {id: crypto.randomUUID(), title: 'REACT', isDone: false},
            {id: crypto.randomUUID(), title: 'REDUX', isDone: false}
        ],
        [todolistId_2]: [
            {id: crypto.randomUUID(), title: 'HTML2', isDone: true},
            {id: crypto.randomUUID(), title: 'CSS2', isDone: true},
            {id: crypto.randomUUID(), title: 'JS2', isDone: true},
            {id: crypto.randomUUID(), title: 'REACT2', isDone: false},
            {id: crypto.randomUUID(), title: 'REDUX2', isDone: false}
        ]
    })

    const removeTask = (todolistId: string, taskId: string) => {
        dispatchTasks(removeTaskAC(todolistId, taskId))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatchTasks(addTaskAC(todolistId, title))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(todolistId, taskId, isDone))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchTasks(changeTaskTitleAC(todolistId, taskId, title))
    }

    const changeTodolistFilter = (todolistId: string, filter: FilterType) => {
        dispatchTodolists(changeTodolistFilterAC(todolistId, filter))
    }
    const removeTodolist = (todolistId: string) => {
        dispatchTodolists(removeTodolistAC(todolistId))
        delete tasks[todolistId]
    }
    const addTodolist = (title: string) => {
        const newTodolistId = crypto.randomUUID()
        dispatchTodolists(addTodolistAC(newTodolistId, title))
        dispatchTasks(addTodolistAC(newTodolistId, title))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchTodolists(changeTodolistTitleAC(todolistId, title))
    }

    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const mappedTodolists = todolists.length
        ? todolists.map(t => {
            return (
                <Grid item key={t.id}>
                    <Paper elevation={3} sx={{p: 2}}>
                        <Todolist
                            todolistId={t.id}
                            filter={t.filter}
                            title={t.title}
                            tasks={tasks[t.id]}
                            removeTask={removeTask}
                            changeTodolistFilter={changeTodolistFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    </Paper>
                </Grid>
            )
        })
        : <p>Create new todolist</p>


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBarComponent theme={theme} color="default" onChange={changeModeHandler}/>
            <Container fixed>
                <Grid container sx={{my: 3}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {mappedTodolists}
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default App;
