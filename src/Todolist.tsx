import {FilterType, TaskType} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, JSX, useState} from "react";
import {Button} from "./Button.tsx";

type TodolistPropsType = {
    id: string
    title: string
    filter: FilterType
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
}

export const Todolist = ({
                             id,
                             title,
                             filter,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus
                         }: TodolistPropsType) => {

    const [inputText, setInputText] = useState('')
    const [error, setError] = useState(false)

    const mappedTasks: JSX.Element = tasks.length
        ? <ul>
            {tasks.map(t => {
                const removeTaskHandler = () => removeTask(id, t.id)
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(id, t.id, e.currentTarget.checked)
                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                        <span className={t.isDone ? 'taskDone' : 'task'}>{t.title}</span>
                        <Button name='x' onClick={removeTaskHandler}/>
                    </li>
                )
            })}
        </ul>
        : <p>Your todolist is empty!</p>

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setInputText(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        const trimmedTitle = inputText.trim()
        if (trimmedTitle) {
            addTask(id, trimmedTitle)
        } else {
            setError(true)
        }
        setInputText('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTaskHandler()
    }

    const disabledButton = inputText.length < 3 || inputText.length > 15
    const errorMessage = error && <p className='errorMessage'>Enter valid title</p>
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input onChange={onChangeHandler} value={inputText} onKeyDown={onKeyDownHandler}/>
                <Button disabled={disabledButton} name="+" onClick={addTaskHandler}/>
                {errorMessage}
            </div>
            {mappedTasks}
            <Button className={filter === "All" ? 'active' : ''} name="All" onClick={() => changeFilter(id, "All")}/>
            <Button className={filter === "Active" ? 'active' : ''} name="Active" onClick={() => changeFilter(id, "Active")}/>
            <Button className={filter === "Completed" ? 'active' : ''} name="Completed" onClick={() => changeFilter(id, "Completed")}/>
        </div>
    );
};

