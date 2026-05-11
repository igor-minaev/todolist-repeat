import {TaskType} from "../types/task.ts";
import {Task} from "./Task.tsx";
import {FilterType} from "../types/todolist.ts";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterType
    deleteTask: (payload: { todolistId: string, taskId: string }) => void
    changeFilter: (payload: { todolistId: string, filter: FilterType }) => void
    addTask: (payload: { todolistId: string, title: string }) => void
    changeTaskStatus: (payload: { todolistId: string, taskId: string, isDone: boolean }) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (payload: { todolistId: string, taskId: string, title: string }) => void
    changeTodolistTitle: (payload: { todolistId: string, title: string }) => void
}
export const Todolist = ({
                             id,
                             title,
                             tasks,
                             filter,
                             deleteTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             deleteTodolist,
                             changeTaskTitle,
                             changeTodolistTitle
                         }: TodolistPropsType) => {


    const mappedTasks = tasks.length
        ? <List disablePadding>
            {tasks.map(t => {
                const deleteTaskHandler = () => deleteTask({todolistId: id, taskId: t.id})
                const changeTaskStatusHandler = (isDone: boolean) => changeTaskStatus({
                    todolistId: id,
                    taskId: t.id,
                    isDone
                })
                const changeTaskTitleHandler = (title: string) => changeTaskTitle({todolistId: id, taskId: t.id, title})
                return <ListItem key={t.id}>
                    <Task {...t} deleteTask={deleteTaskHandler} changeTaskStatus={changeTaskStatusHandler} changeTitle={changeTaskTitleHandler}/>
                </ListItem>
            })}
        </List>
        : <p>You don't create any task</p>


    const addTaskHandler = (title: string) => addTask({todolistId: id, title})


    const changeFilterAllHandler = () => changeFilter({todolistId: id, filter: 'all'})
    const changeFilterActiveHandler = () => changeFilter({todolistId: id, filter: 'active'})
    const changeFilterCompletedHandler = () => changeFilter({todolistId: id, filter: 'completed'})
    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }
    const changeTodolistTitleHandler = (title: string) => changeTodolistTitle({todolistId: id, title})

    return (
        <div>
            <h3>
                <EditableSpan value={title} changeTitle={changeTodolistTitleHandler}/>
                <IconButton color='secondary' onClick={deleteTodolistHandler}>
                    <DeleteForeverIcon/>
                </IconButton>
            </h3>
            <CreateItemForm addItem={addTaskHandler}/>
            {mappedTasks}
            <div>


                <Button size='small' color='primary' variant={filter === 'all' ? 'contained' : 'outlined'} onClick={changeFilterAllHandler}>All</Button>
                <Button size='small' color='secondary' variant={filter === 'active' ? 'contained' : 'outlined'} onClick={changeFilterActiveHandler}> Active </Button>
                <Button size='small' color='success' variant={filter === 'completed' ? 'contained' : 'outlined'} onClick={changeFilterCompletedHandler}>Completed</Button>
            </div>
        </div>
    );
};

