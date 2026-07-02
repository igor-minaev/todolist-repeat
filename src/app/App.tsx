import type {RootState} from "@/app/store";
import {CreateItemForm} from "@/CreateItemForm";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, tasksReducer} from "@/model/tasks-reducer";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "@/model/todolists-reducer";
import {NavButton} from "@/NavButtons";
import {TodolistItem} from "@/TodolistItem";
import {containerSx} from "@/TodolistItem.styles";
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import Toolbar from '@mui/material/Toolbar'
import {useReducer, useState} from "react";
import {useDispatch, useSelector} from "react-redux";


export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = Record<string, Task[]>

export type FilterValues = 'all' | 'active' | 'completed'

function App() {
    const todolists = useSelector<RootState, Todolist[]>(state => state.todolists)
    const tasks = useSelector<RootState, TasksState>(state => state.tasks)

    const dispatch = useDispatch()

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }
    const createTask = (todolistId: string, title: string) => {
        dispatch(createTaskAC({todolistId, title}))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone}))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
    }

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }
    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC(todolistId))
    }
    const changeTodolistFilter = (todolistId: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({todolistId, filter}))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({todolistId, title}))
    }

    const getTasksForTodolist = (tasks: Task[], filter: FilterValues): Task[] => {
        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }

    type ThemeMode = 'dark' | 'light'
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position="static" sx={{mb: '30px'}}>
                <Toolbar>
                    <Container maxWidth={'lg'} sx={containerSx}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <NavButton background="turquoise">Sign in</NavButton>
                            <NavButton>Sign up</NavButton>
                            <NavButton>Faq</NavButton>
                            <Switch color={'default'} onChange={changeMode}/>
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'lg'}>
                <Grid container sx={{mb: '30px'}}>
                    <CreateItemForm createItem={createTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolists.length === 0 ? <p>Create new todolist!</p> : todolists.map(todolist => {
                        return (
                            <Grid key={todolist.id}>
                                <Paper elevation={3} sx={{p: '20px'}}>
                                    <TodolistItem
                                        id={todolist.id}
                                        title={todolist.title}
                                        filter={todolist.filter}
                                        tasks={getTasksForTodolist(tasks[todolist.id], todolist.filter)}
                                        deleteTask={deleteTask}
                                        changeTodolistFilter={changeTodolistFilter}
                                        createTask={createTask}
                                        changeTaskStatus={changeTaskStatus}
                                        deleteTodolist={deleteTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default App
