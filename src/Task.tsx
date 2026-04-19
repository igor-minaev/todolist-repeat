import {Button} from "./components/Button.tsx";
import {TaskType} from "./App.tsx";
import {ChangeEvent} from "react";

type TaskTypePropsType = TaskType & {
    removeTaskHandler: () => void
    onChangeTaskStatusHandler: (e: ChangeEvent<HTMLInputElement>) => void
}


export const Task = ({id, title, isDone, removeTaskHandler,onChangeTaskStatusHandler}: TaskTypePropsType) => {
    return (
        <li key={id}>
            <input type="checkbox" checked={isDone} onChange={onChangeTaskStatusHandler}/>
            <span className={isDone ? 'taskDone' : 'task'}>{title}</span>
            <Button onClick={removeTaskHandler}>x</Button>
        </li>
    );
};

