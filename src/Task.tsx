import {Button} from "./components/Button.tsx";
import {TaskType} from "./App.tsx";
import {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan.tsx";

type TaskTypePropsType = TaskType & {
    removeTaskHandler: () => void
    onChangeTaskStatusHandler: (e: ChangeEvent<HTMLInputElement>) => void
    changeTaskTitle: (title: string) => void
}


export const Task = ({
                         id,
                         title,
                         isDone,
                         removeTaskHandler,
                         onChangeTaskStatusHandler,
                         changeTaskTitle
                     }: TaskTypePropsType) => {
    return (
        <li key={id}>
            <input type="checkbox" checked={isDone} onChange={onChangeTaskStatusHandler}/>

            <EditableSpan className={isDone ? 'taskDone' : 'task'} title={title} editTitle={changeTaskTitle}/>
            <Button onClick={removeTaskHandler}>x</Button>
        </li>
    );
};

