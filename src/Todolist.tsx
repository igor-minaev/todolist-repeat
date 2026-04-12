import {TaskType} from "./App.tsx";
import {JSX} from "react";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
}

export const Todolist = ({title, tasks}: TodolistPropsType) => {

    const mappedTasks: JSX.Element = tasks.length
        ? <ul>
            {tasks.map(t => (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button>x</button>
                </li>
            ))}
        </ul>
        : <p>Your todolist is empty!</p>
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {mappedTasks}
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    );
};

