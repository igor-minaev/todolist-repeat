import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {FilterType, TaskType} from '../App';
import {Button} from './Button';

type TodolistPropsType = {
    todolistId: string
    filter: FilterType
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (newFilterValue: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {todolistId, filter, title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, ...restProps} = props

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState(false)

    const getFilteredTasks = (tasks: TaskType[], filter: FilterType): TaskType[] => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone)
            case 'completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks

        }
    }

    const filteredTasks = getFilteredTasks(tasks, filter)

    const listItems: JSX.Element[] = filteredTasks.map(t => {
        const removeTaskHandler = () => removeTask(t.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked)
        const taskStyle = t.isDone ? 'taskDone' : 'task'
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                <span className={taskStyle}>{t.title}</span>
                <Button name="x" callBack={removeTaskHandler}/>
            </li>
        )
    })

    const mappedTasks: JSX.Element = filteredTasks.length
        ? <ul>{listItems}</ul>
        : <p>Your todolist is empty!</p>

    const changeFilterHandler = (newFilterValue: FilterType) => changeFilter(newFilterValue)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            addTask(trimmedTitle)
        } else (
            setError(true)
        )
        setTaskTitle('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()
    const inputStyles = error ? 'error' : ''
    return (
        <div className="todolist">
            <h2>{title}</h2>
            <div>
                <input className={inputStyles} value={taskTitle} onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <Button name="+" callBack={addTaskHandler}/>
                {error && <p className="errorMessage">Title is required!</p>}
            </div>
            {mappedTasks}
            <div>
                <Button className={filter === 'all' ? 'btn' : ''} name="All"
                        callBack={() => changeFilterHandler('all')}/>
                <Button className={filter === 'active' ? 'btn' : ''} name="Active"
                        callBack={() => changeFilterHandler('active')}/>
                <Button className={filter === 'completed' ? 'btn' : ''} name="Complete"
                        callBack={() => changeFilterHandler('completed')}/>
            </div>
        </div>
    );
};

