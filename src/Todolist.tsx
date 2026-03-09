import {JSX} from "react";
import {Button} from "./Button.tsx";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
}

export const Todolist = ({title, tasks}: TodolistPropsType) => {
    const tasksList: JSX.Element = tasks.length
        ? <ul> {tasks.map(t => (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
            </li>
        ))}
        </ul>
        : <span>Your tasklist is empty!</span>

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title="+"/>
            </div>
            {tasksList}
            <div>
                <Button title="All"/>
                <Button title="Active"/>
                <Button title="Completed"/>
            </div>
        </div>
    );
};

