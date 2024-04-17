import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from '../App';


type TodolistPropsType = {
    todolistId: string
    filter: FilterValuesType
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {todolistId, filter, title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, ...restProps} = props
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState(false)

    const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
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

    const mappedTasks: JSX.Element[] = filteredTasks.map(task => {
        const removeTaskHandler = () => removeTask(todolistId, task.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)
        const taskStyle = task.isDone ? 'done' : 'task'
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                <span className={taskStyle}>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })

    const tasksForRender: JSX.Element = tasks.length ?
        <ul>{mappedTasks}</ul> :
        <p>Your todolist is empty!</p>

    const changeFilterHandler = (filter: FilterValuesType) => () => changeFilter(filter)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setNewTaskTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle) {
            addTask(newTaskTitle)
        } else {
            setError(true)
        }
        setNewTaskTitle('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()
    const errorMessage = error && <p style={{color: 'red'}}>Title is required!</p>
    const inputStyle = error ? 'error' : ''

    return (
        <div className="todolist">
            <h2>{title}</h2>
            <div>
                <input className={inputStyle} value={newTaskTitle} onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            {errorMessage}
            {tasksForRender}
            <div className="buttons">
                <button className={filter === 'all' ? 'active' : ''} onClick={changeFilterHandler('all')}>All</button>
                <button className={filter === 'active' ? 'active' : ''} onClick={changeFilterHandler('active')}>Active
                </button>
                <button className={filter === 'completed' ? 'active' : ''}
                        onClick={changeFilterHandler('completed')}>Completed
                </button>
            </div>
        </div>
    );
};

