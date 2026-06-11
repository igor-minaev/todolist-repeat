import {Button} from "./Button"
import type {FilterValuesType} from "./App";
import {type ChangeEvent, KeyboardEvent, useState} from "react";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    filter: FilterValuesType
    tasks: TaskType[]
    deleteTask: (id: string) => void
    changeFilter: (filter: FilterValuesType) => void
    createTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}

export const Todolist = ({
                             title,
                             filter,
                             tasks,
                             deleteTask,
                             changeFilter,
                             createTask,
                             changeTaskStatus
                         }: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState(false)


    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(task => {
                const deleteTaskHandler = () => deleteTask(task.id)
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                        <span className={task.isDone ? 'taskDone' : 'task'}>{task.title}</span>
                        <Button name='x' onClick={deleteTaskHandler}/>
                    </li>
                )
            })}
        </ul>
        : <p>Your tasks list is empty!</p>
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(false)
    }

    const createTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle) {
            createTask(trimmedTaskTitle)
            setTaskTitle('')
        } else {
            setError(true)
        }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && createTaskHandler()
    }

    const filterAllHandler = () => changeFilter("all")
    const filterActiveHandler = () => changeFilter("active")
    const filterCompletedHandler = () => changeFilter("completed")
    const errorClassName = error ? 'error' : ''

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={errorClassName} type="text" value={taskTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <Button name='+' onClick={createTaskHandler}/>
                {error && <p className='errorMessage'>Title is required!</p>}
            </div>
            {mappedTasks}
            <div className='buttonsWrapper'>
                <Button className={filter === 'all' ? 'activeButton' : 'button'} name='All' onClick={filterAllHandler}/>
                <Button className={filter === 'active' ? 'activeButton' : 'button'} name='Active' onClick={filterActiveHandler}/>
                <Button className={filter === 'completed' ? 'activeButton' : 'button'} name='Completed' onClick={filterCompletedHandler}/>
            </div>
        </div>
    );
};
