import {FilterType, TaskType} from "./App.tsx";
import {Button} from "./components/Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistPropsType = {
    title: string
    filter: FilterType
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeTodolistFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist = ({
                             title,
                             filter,
                             tasks,
                             removeTask,
                             changeTodolistFilter,
                             addTask,
                             changeTaskStatus
                         }: TodolistPropsType) => {

    const [newTitleText, setNewTitleText] = useState('')
    const [error, setError] = useState(false)

    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(t => {
                const removeTaskHandler = () => removeTask(t.id)
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked)
                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                        <span className={t.isDone ? 'taskDone' : 'task'}>{t.title}</span>
                        <Button name='x' onClick={removeTaskHandler}/>
                    </li>
                )
            })}
        </ul>
        : <p>Your taskslist is empty!</p>

    const changeFilterToAllHandler = () => changeTodolistFilter('all')
    const changeFilterToActiveHandler = () => changeTodolistFilter('active')
    const changeFilterToCompletedHandler = () => changeTodolistFilter('completed')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTitleText(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        const trimmedTitle = newTitleText.trim()
        if (trimmedTitle) {
            addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setNewTitleText('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addTaskHandler()
    }

    const disableButtonValidation = newTitleText.length < 5 || newTitleText.length > 20

    const minLengthTitleValidation = newTitleText.length < 5 && <p>Title should be more then 5 chars</p>
    const maxLengthTitleValidation = newTitleText.length > 20 && <p>Title should be less then 20 chars</p>
    const errorMessage = error && <p className='errorMessage'>Title is required!</p>


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={error ? 'error' : ''} onChange={onChangeHandler} value={newTitleText} onKeyDown={onKeyDownHandler}/>
                <Button name='+' onClick={addTaskHandler} disabled={disableButtonValidation}/>
                {!error && minLengthTitleValidation}
                {!error && maxLengthTitleValidation}
                {errorMessage}
            </div>
            {mappedTasks}
            <div>
                <Button className={filter === 'all' ? `button active` : 'button'} name='All' onClick={changeFilterToAllHandler}/>
                <Button className={filter === 'active' ? `button active` : 'button'} name='Active' onClick={changeFilterToActiveHandler}/>
                <Button className={filter === 'completed' ? `button active` : 'button'} name='Completed' onClick={changeFilterToCompletedHandler}/>
            </div>
        </div>
    );
};

