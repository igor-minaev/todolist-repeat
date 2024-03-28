import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Task} from './Task';
import {Button} from './Button';
import {FilterType} from '../App';

type TodolistType = {
    id: string
    filter: FilterType
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (todolistId: string, filter: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist: React.FC<TodolistType> = props => {
    const {id, filter, title, tasks, removeTask, changeTodolistFilter, addTask, changeTaskStatus, ...restProps} = props

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState(false)

    const getFilteredTasks = (tasks: TaskType[], filter: FilterType): TaskType[] => {
        switch (filter) {
            case 'Active':
                return tasks.filter(t => !t.isDone)
            case 'Completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks

        }
    }
    const tasksForTodolist = getFilteredTasks(tasks, filter)
    const removeTaskHandler = (taskId: string) => removeTask(id, taskId)
    const changeTaskStatusHandler = (taskId: string, isDone: boolean) => changeTaskStatus(id, taskId, isDone)

    const mappedTasks: JSX.Element[] = tasksForTodolist.map(task => {
        return <Task key={task.id} {...task} removeTask={removeTaskHandler} changeTaskStatus={changeTaskStatusHandler}/>
    })
    const tasksForRender: JSX.Element = tasks.length
        ? <ul className="list">{mappedTasks}</ul>
        : <p>Your todolist is empty!</p>

    const changeFilterHandler = (filter: FilterType) => changeTodolistFilter(id, filter)
    // const changeFilterAllHandler = () => changeFilter('All')
    // const changeFilterActiveHandler = () => changeFilter('Active')
    // const changeFilterCompletedHandler = () => changeFilter('Completed')

    const addTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            addTask(id, trimmedTitle)
        } else {
            setError(true)
        }
        setTaskTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()
    const errorMessage = error && <p style={{color: 'red'}}>Title is required!</p>
    const errorInput = error ? 'error' : ''
    return (
        <div className="todolist">
            <h2>{title}</h2>
            <div>
                <input className={errorInput} value={taskTitle} onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <Button name="+" onClick={addTaskHandler}/>
                {errorMessage}
            </div>
            {tasksForRender}
            <div>
                <Button className={filter === 'All' ? 'active' : ''} name="All"
                        onClick={() => changeFilterHandler('All')}/>
                <Button className={filter === 'Active' ? 'active' : ''} name="Active"
                        onClick={() => changeFilterHandler('Active')}/>
                <Button className={filter === 'Completed' ? 'active' : ''} name="Completed"
                        onClick={() => changeFilterHandler('Completed')}/>
            </div>
        </div>
    );
};

