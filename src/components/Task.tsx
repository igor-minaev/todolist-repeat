import {Button} from "./Button.tsx";
import {TaskType} from "../types/task.ts";

type TaskPropsType = TaskType

export const Task = ({title, isDone,...restProps}: TaskPropsType) => {
    return (
        <li>
            <input type="checkbox" checked={isDone}/>
            <span>{title}</span>
            <Button>x</Button>
        </li>
    );
};

