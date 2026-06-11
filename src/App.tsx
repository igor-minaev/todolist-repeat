import './App.css'
import {type TaskType, Todolist} from "./Todolist";
import {useState} from "react";

export type FilterValues = 'all' | 'active' | 'completed'
export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState= Record<string, TaskType[]>


function App() {


    const todolistId_1 = crypto.randomUUID();
    const todolistId_2 = crypto.randomUUID();

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
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


    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }
    const createTask = (todolistId: string, title: string) => {
        const newTask: TaskType = {
            id: crypto.randomUUID(),
            title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === id ? {...task, isDone} : task)})
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
                        deleteTodolist={deleteTodolist}
                    />
                )
            })}
        </div>
    )
}

export default App
