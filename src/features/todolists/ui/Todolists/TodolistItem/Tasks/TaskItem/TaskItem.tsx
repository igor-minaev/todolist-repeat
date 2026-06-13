import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListItem from "@mui/material/ListItem";
import type {TaskType} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "@/features/todolists/model/tasks-reducer";
import type {ChangeEvent} from "react";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {getListItemSX} from "./TaskItem.styles";

type Props = {
    task: TaskType
    todolistId: string
}

export const TaskItem = ({task, todolistId}: Props) => {

    const dispatch = useAppDispatch()

    const deleteTaskHandler = () => dispatch(deleteTaskAC({todolistId, taskId: task.id}))

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC({
        todolistId,
        taskId: task.id,
        isDone: e.currentTarget.checked
    }))
    const changeTaskTitleHandler = (title: string) => dispatch(changeTaskTitleAC({
        todolistId,
        taskId: task.id,
        title
    }))
    return (
        <ListItem key={task.id} sx={getListItemSX(task.isDone)}>
            <div>
                <Checkbox size='small' color="secondary" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan className={task.isDone ? 'taskDone' : 'task'} value={task.title} onChange={changeTaskTitleHandler}/>
            </div>
            <IconButton color="secondary" onClick={deleteTaskHandler}>
                <DeleteForeverIcon/>
            </IconButton>
        </ListItem>
    )
}