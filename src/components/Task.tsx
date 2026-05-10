import {Button} from "./Button.tsx";
import {TaskType} from "../types/task.ts";
import {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan.tsx";

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
            <input type="checkbox" checked={isDone} onChange={onChangeHandler}/>
            <EditableSpan value={title} changeTitle={changeTitle} className={isDone ? 'task-done' : 'task'}/>

            <Button onClick={deleteTask}>x</Button>
        </li>
    );
};

