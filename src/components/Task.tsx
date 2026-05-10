import {Button} from "./Button.tsx";
import {TaskType} from "../types/task.ts";

type TaskPropsType = TaskType & {
    deleteTask: (taskId: string) => void
}


export const Task = ({id, title, isDone, deleteTask}: TaskPropsType) => {
    const deleteTaskHandler = () => {
        deleteTask(id)
    }
    return (
        <li>
            <input type="checkbox" checked={isDone}/>
            <span>{title}</span>
            <Button onClick={deleteTaskHandler}>x</Button>
        </li>
    );
};

