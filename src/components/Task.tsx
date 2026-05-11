import {Button} from "./Button.tsx";
import {TaskType} from "../types/task.ts";
import {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from '@mui/material/IconButton';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Checkbox from '@mui/material/Checkbox';

type TaskPropsType = TaskType & {
    deleteTask: () => void
    changeTaskStatus: (isDone: boolean) => void
    changeTitle: (title: string) => void
}


export const Task = ({id, title, isDone, deleteTask, changeTaskStatus, changeTitle}: TaskPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(e.currentTarget.checked)
    }

    return (
        <li>
            <Checkbox checked={isDone} onChange={onChangeHandler}  color="secondary"  size='small'/>
            <EditableSpan value={title} changeTitle={changeTitle} className={isDone ? 'task-done' : 'task'}/>
            <IconButton color='secondary' onClick={deleteTask}>
                <DeleteSweepIcon/>
            </IconButton>
        </li>
    );
};

