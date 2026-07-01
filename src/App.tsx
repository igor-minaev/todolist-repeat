import {CreateItemForm} from "@/CreateItemForm";
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
import {useState} from "react";


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

    const todolistId_1 = crypto.randomUUID()
    const todolistId_2 = crypto.randomUUID()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TasksState>({
        [todolistId_1]: [
            {id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true},
            {id: crypto.randomUUID(), title: 'JS', isDone: true},
            {id: crypto.randomUUID(), title: 'ReactJS', isDone: false},
        ],
        [todolistId_2]: [
            {id: crypto.randomUUID(), title: 'Milk', isDone: true},
            {id: crypto.randomUUID(), title: 'Bread', isDone: false},
        ]
    })

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }
    const createTask = (todolistId: string, title: string) => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)})
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
    }

    const createTodolist = (title: string) => {
        const newTodolist: Todolist = {
            id: crypto.randomUUID(), title, filter: 'all'
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    }
    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        const copyTasks = {...tasks}
        delete copyTasks[todolistId]
        setTasks(copyTasks)
    }
    const changeTodolistFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, title} : todolist))
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
                            <Switch color={'default'} onChange={changeMode} />
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'lg'}>
                <Grid container sx={{mb: '30px'}}>
                    <CreateItemForm createItem={createTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolists.map(todolist => {
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
