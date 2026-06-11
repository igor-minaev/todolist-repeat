import Button from '@mui/material/Button';
import type {FilterValues} from "./App";
import {type ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm";
import {EditableSpan} from "./EditableSpan";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from "@mui/material/IconButton";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type Props = {
    title: string
    id: string
    filter: FilterValues
    tasks: TaskType[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, id: string, title: string) => void
}

export const Todolist = ({
                             title,
                             id,
                             filter,
                             tasks,
                             deleteTask,
                             changeTodolistFilter,
                             createTask,
                             changeTaskStatus,
                             deleteTodolist,
                             changeTodolistTitle,
                             changeTaskTitle
                         }: Props) => {

    const mappedTasks = tasks.length === 0
        ? <p>Your tasks list is empty!</p>
        : <ul>
            {tasks.map(task => {
                const deleteTaskHandler = () => deleteTask(id, task.id)
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(id, task.id, e.currentTarget.checked)
                const changeTaskTitleHandler = (title: string) => changeTaskTitle(id, task.id, title)
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                        <EditableSpan className={task.isDone ? 'taskDone' : 'task'} value={task.title} onChange={changeTaskTitleHandler}/>
                        <IconButton color="secondary" onClick={deleteTaskHandler}>
                            <DeleteForeverIcon/>
                        </IconButton>
                    </li>
                )
            })}
        </ul>

    const filterAllHandler = () => changeTodolistFilter(id, "all")
    const filterActiveHandler = () => changeTodolistFilter(id, "active")
    const filterCompletedHandler = () => changeTodolistFilter(id, "completed")
    const deleteTodolistHandler = () => deleteTodolist(id)
    const createTaskHandler = (title: string) => createTask(id, title)
    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                <IconButton color="secondary" onClick={deleteTodolistHandler}>
                    <DeleteForeverIcon/>
                </IconButton>
            </h3>
            <CreateItemForm createItem={createTaskHandler}/>
            {mappedTasks}
            <div className='buttonsWrapper'>
                <Button size='small' color="secondary" variant={filter === 'all' ? 'contained' : "outlined"} onClick={filterAllHandler}>All</Button>
                <Button size='small' color="primary" variant={filter === 'active' ? 'contained' : "outlined"} onClick={filterActiveHandler}>Active</Button>
                <Button size='small' color="success" variant={filter === 'completed' ? 'contained' : "outlined"} onClick={filterCompletedHandler}>Completed</Button>
            </div>
        </div>
    );
};
