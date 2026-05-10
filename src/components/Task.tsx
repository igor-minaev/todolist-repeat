import {Button} from "./Button.tsx";
import {TaskType} from "../types/task.ts";
import {ChangeEvent} from "react";

type TaskPropsType = TaskType & {
    deleteTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}


export const Task = ({id, title, isDone, deleteTask, changeTaskStatus}: TaskPropsType) => {
    const deleteTaskHandler = () => {
        deleteTask(id)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(id, e.currentTarget.checked)
    }

    return (
        <li>
            <input type="checkbox" checked={isDone} onChange={onChangeHandler}/>
            <span className={isDone ? 'task-done' : 'task'}>{title}</span>
            <Button onClick={deleteTaskHandler}>x</Button>
        </li>
    );
};

