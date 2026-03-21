import {FilterType, TaskType} from "./types/types.ts";
import {ChangeEvent, JSX, useState} from "react";


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeFilter: (newFilter: FilterType) => void
    createTask: (title: string) => void
}
export const Todolist = ({title, tasks, deleteTask, changeFilter, createTask}: TodolistPropsType) => {

    const [newTitle, setNewTitle] = useState('')

    const taskList: JSX.Element = tasks.length
        ? <ul>
            {tasks.map(t => (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                    <span><b>Priority:</b> {t.priority}</span>
                    <button onClick={() => deleteTask(t.id)}>x</button>
                </li>
            ))}

        </ul>
        : <p>Your Tasks list is empty!</p>

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onClickHandler = () => {
        createTask(newTitle)
        setNewTitle('')
    }

    const isDisableButton = newTitle.length < 3
    const messageInput = (newTitle.length < 3 || newTitle.length > 15) &&
        <p>Task's title should be from 3 to 15 chars</p>

    return (
        <div>
            <h3>{title}</h3>
            <input value={newTitle} onChange={onChangeTitleHandler}/>
            <button disabled={isDisableButton} onClick={onClickHandler}>+</button>
            {messageInput}
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
                <button onClick={() => changeFilter("All")}>All</button>
                <button onClick={() => changeFilter("Active")}>Active</button>
                <button onClick={() => changeFilter("Completed")}>Completed</button>
            </div>
        </div>
    );
};
