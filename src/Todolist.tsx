import {FilterType, TaskType} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, JSX, useState} from "react";
import {Button} from "./Button.tsx";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask, changeTaskStatus}: TodolistPropsType) => {

    const [inputText, setInputText] = useState('')

    const mappedTasks: JSX.Element = tasks.length
        ? <ul>
            {tasks.map(t => {
                const removeTaskHandler = () => removeTask(t.id)
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked)
                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                        <span>{t.title}</span>
                        <Button name='x' onClick={removeTaskHandler}/>
                    </li>
                )
            })}
        </ul>
        : <p>Your todolist is empty!</p>

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        addTask(inputText)
        setInputText('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTaskHandler()
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input onChange={onChangeHandler} value={inputText} onKeyDown={onKeyDownHandler}/>
                <Button name="+" onClick={addTaskHandler}/>
            </div>
            {mappedTasks}
            <Button name="All" onClick={() => changeFilter("All")}/>
            <Button name="Active" onClick={() => changeFilter("Active")}/>
            <Button name="Completed" onClick={() => changeFilter("Completed")}/>
        </div>
    );
};

