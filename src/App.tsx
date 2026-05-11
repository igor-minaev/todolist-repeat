import './App.css'
import {useReducer, useState} from "react";
import {Todolist} from "./components/Todolist.tsx";
import {getFilteredTasks} from "./utils/filtrationUtils.ts";
import {FilterType} from "./types/todolist.ts";
import {CreateItemForm} from "./components/CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {NavButton} from "./NavButton.ts";
import {containerSX} from "./styles/Todolist.styles.ts";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {cyan, pink} from "@mui/material/colors";
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer
} from "./model/tasks-reducer.ts";

function App() {

    const todolistId_1 = crypto.randomUUID()
    const todolistId_2 = crypto.randomUUID()


    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
        dispatchTasks(createTaskAC({id: todolistId, title}))
    }

    const deleteTask = (payload: { todolistId: string, taskId: string }) => {
        const {todolistId, taskId} = payload
        dispatchTasks(deleteTaskAC({id: todolistId, taskId}))
    }

    const changeTaskStatus = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
        const {todolistId, taskId, isDone} = payload
        dispatchTasks(changeTaskStatusAC({id: todolistId, taskId, isDone}))
    }

    const changeTaskTitle = (payload: { todolistId: string, taskId: string, title: string }) => {
        const {todolistId, taskId, title} = payload
        dispatchTasks(changeTaskTitleAC({id: todolistId, taskId, title}))
    }


    const addTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const changeFilter = (payload: { todolistId: string, filter: FilterType }) => {
        const {todolistId, filter} = payload
        dispatchTodolists(changeTodolistFilterAC({id: todolistId, filter}))
    }

    const deleteTodolist = (todolistId: string) => {
        const action = deleteTodolistAC(todolistId)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const changeTodolistTitle = (payload: { todolistId: string, title: string }) => {
        const {todolistId, title} = payload
        dispatchTodolists(changeTodolistTitleAC({id: todolistId, title}))
    }

    const [themeMode, setThemMode] = useState(false)

    const theme = createTheme({
        palette: {
            primary: cyan,
            secondary: pink,
            mode: themeMode ? 'dark' : 'light'
        },
    })

    const mappedTodolists = todolists.map(tl => {
        const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
        return <Grid key={tl.id}>
            <Paper elevation={2} sx={{padding: '20px 10px'}}>
                <Todolist
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
            </Paper>
        </Grid>
    })


    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSX}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton background={theme.palette.primary.light}>Sign in</NavButton>
                                <NavButton background={theme.palette.primary.light}>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.light}>Faq</NavButton>
                                <Switch onChange={() => setThemMode(!themeMode)}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={'lg'}>
                    <Grid container sx={{mb: '30px'}}>
                        <CreateItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {mappedTodolists}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default App
