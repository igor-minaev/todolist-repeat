import './App.css'
import {type TaskType, Todolist} from "../Todolist";
import {useState} from "react";
import {CreateItemForm} from "../CreateItemForm";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {containerSx} from "../Todolist.styles";
import {NavButton} from "../NavButton";
import {createTheme, ThemeProvider} from "@mui/material";
import {lime, purple} from "@mui/material/colors";
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from "../model/todolists-reducer";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "../model/tasks-reducer";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {selectTasks} from "../model/tasks-selectors";
import {selectTodolists} from "../model/todolists-selectors";


export type FilterValues = 'all' | 'active' | 'completed'
export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = Record<string, TaskType[]>
type ThemeMode = 'dark' | 'light'


function App() {

    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }
    const createTask = (todolistId: string, title: string) => {
        dispatch(createTaskAC({todolistId, title}))
    }
    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId: id, isDone}))
    }
    const changeTaskTitle = (todolistId: string, id: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId: id, title}))
    }

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))

    }
    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}))
    }
    const changeTodolistFilter = (todolistId: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter}))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, title}))
    }

    const getFilteredTasks = (tasks: TaskType[], filter: FilterValues): TaskType[] => {
        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }

    const [themeMode, setThemeMode] = useState<ThemeMode>('dark')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: lime,
            secondary: purple,
        },
    })

    const changeMode = () => setThemeMode(themeMode === 'light' ? 'dark' : 'light')


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position="static" sx={{mb: '30px'}}>
                <Toolbar>
                    <Container maxWidth='lg' sx={containerSx}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <NavButton>Sign in</NavButton>
                            <NavButton>Sign up</NavButton>
                            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                            <Switch color={'default'} onChange={changeMode}/>
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth='lg'>
                <Grid container sx={{mb: '30px'}}>
                    <CreateItemForm createItem={createTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolists.length === 0
                        ? <p>Create new todolist!</p>
                        : todolists.map(todolist => {
                            return (
                                <Grid key={todolist.id}>
                                    <Paper elevation={5} sx={{p: '15px'}}>
                                        <Todolist
                                            id={todolist.id}
                                            title={todolist.title}
                                            filter={todolist.filter}
                                            tasks={getFilteredTasks(tasks[todolist.id], todolist.filter)}
                                            deleteTask={deleteTask}
                                            changeTodolistFilter={changeTodolistFilter}
                                            createTask={createTask}
                                            changeTaskStatus={changeTaskStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            deleteTodolist={deleteTodolist}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
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
