import {FilterType, PriorityFilterType, TaskType} from "./types/types.ts";
import {ChangeEvent, KeyboardEvent, JSX, useState} from "react";
import {Button} from "./components/Button.tsx";


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeFilter: (newFilter: FilterType) => void
    createTask: (title: string) => void
    changePriority: (newPriority: PriorityFilterType) => void
}
export const Todolist = ({title, tasks, deleteTask, changeFilter, createTask, changePriority}: TodolistPropsType) => {

    const [newTitle, setNewTitle] = useState('')

    const taskList: JSX.Element = tasks.length
        ? <ul>
            {tasks.map(t => (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                    <span><b>Priority:</b> {t.priority}</span>
                    <Button name="x" onClick={() => deleteTask(t.id)}/>
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

    const onChangeSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        changePriority(e.currentTarget.value as PriorityFilterType)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && onClickHandler()
    }

    const isDisableButton = newTitle.length < 3
    const messageInput = (newTitle.length < 3 || newTitle.length > 15) &&
        <p>Task's title should be from 3 to 15 chars</p>

    return (
        <div>
            <h3>{title}</h3>
            <input value={newTitle} onChange={onChangeTitleHandler} onKeyDown={onKeyDownHandler}/>
            <Button name="+" onClick={onClickHandler} disabled={isDisableButton}/>
            {messageInput}
            <div className="select">
                <label htmlFor="priority">Priority</label>
                <select id="priority" onChange={onChangeSelectHandler}>
                    <option value="All">All</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            {taskList}
            <div>
                <Button name="All" onClick={() => changeFilter("All")}/>
                <Button name="Active" onClick={() => changeFilter("Active")}/>
                <Button name="Completed" onClick={() => changeFilter("Completed")}/>
            </div>
        </div>
    );
};
