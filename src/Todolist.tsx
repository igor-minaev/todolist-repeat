import {TaskType} from "./types/types.ts";
import {JSX} from "react";


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
}
export const Todolist = ({title, tasks}: TodolistPropsType) => {
    const taskList: JSX.Element = tasks.length
        ? <ul>
            {tasks.map(t => (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                    <span><b>Priority:</b> {t.priority}</span>
                </li>
            ))}

        </ul>
        : <p>Your Tasks list is empty!</p>
    return (
        <div>
            <h3>{title}</h3>
            <input/>
            <button>+</button>
            <div className="select">
                <label htmlFor="priority">Proiority</label>
                <select id="priority">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            {taskList}
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
