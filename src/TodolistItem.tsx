import type {FilterValues, Task} from "@/App";
import {CreateItemForm} from "@/CreateItemForm";
import {EditableSpan} from "@/EditableSpan";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import {type ChangeEvent} from "react";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

type Props = {
    id: string
    title: string
    filter: FilterValues
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
};
export const TodolistItem = ({
                                 id,
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeTodolistFilter,
                                 createTask,
                                 changeTaskStatus,
                                 filter,
                                 deleteTodolist,
                                 changeTaskTitle,
                                 changeTodolistTitle
                             }: Props) => {

    const mappedTasks = tasks.length
        ? <List>
            {
                tasks.map(task => {
                    const deleteTaskHandler = () => deleteTask(id, task.id)
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(id, task.id, e.currentTarget.checked)
                    }
                    const changeTaskTitleHandler = (title: string) => changeTaskTitle(id, task.id, title)
                    return (
                        <ListItem key={task.id}>
                            <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                            <EditableSpan oldTitle={task.title} changeTitle={changeTaskTitleHandler}/>
                            <IconButton onClick={deleteTaskHandler}>
                                <DeleteForeverIcon/>
                            </IconButton>
                        </ListItem>
                    )
                })
            }
        </List>
        : <p>You don't have any task</p>


    const createTaskHandler = (title: string) => createTask(id, title)

    const deleteTodolistHandler = () => deleteTodolist(id)

    const changeTodolistTitleHandler = (title: string) => changeTodolistTitle(id, title)

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={title} changeTitle={changeTodolistTitleHandler}/>
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteForeverIcon/>
                </IconButton>
            </h3>
            <CreateItemForm createItem={createTaskHandler}/>
            {mappedTasks}
            <div style={{display: "flex", gap: "10px"}}>
                <Button size={'small'} variant={filter === 'all' ? "contained" : "outlined"} color="secondary" onClick={() => changeTodolistFilter(id, 'all')}>All</Button>
                <Button size={'small'} variant={filter === 'active' ? "contained" : "outlined"} onClick={() => changeTodolistFilter(id, 'active')}> Active </Button>
                <Button size={'small'} variant={filter === 'completed' ? "contained" : "outlined"} color="success" onClick={() => changeTodolistFilter(id, 'completed')}>Completed</Button>
            </div>
        </div>
    );
};
