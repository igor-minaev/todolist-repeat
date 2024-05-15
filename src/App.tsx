import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {AddItemForm} from './components/AddItemForm';
import {AppBarComponent} from './components/AppBarComponent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

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

function App() {
    const todolistId_1 = crypto.randomUUID()
    const todolistId_2 = crypto.randomUUID()
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to learn2', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)})
    }

    const changeTodolistFilter = (todolistId: string, filter: FilterType) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter} : t))
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
        delete tasks[todolistId]
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
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, title} : t))
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
        <div className="App">
            <AppBarComponent/>
            <Container fixed>
                <Grid container sx={{my: 3}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {mappedTodolists}
                </Grid>
            </Container>
        </div>
    )
}

export default App;
