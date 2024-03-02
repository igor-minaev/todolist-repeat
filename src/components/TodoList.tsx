import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterType, TaskType} from '../App';

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterType
    removeTask: (taskId: string) => void
    changeFilter: (newFilterValue: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newTaskStatus: boolean) => void
}
export const TodoList: FC<TodoListPropsType> = (
    {
        title,
        tasks,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus
    }) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState(false)

    const listItems: JSX.Element[] = tasks.map(task => {
        const removeTaskHandler = () => removeTask(task.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)
        const taskStyle = task.isDone ? 'taskIsDone' : 'task'
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                <span className={taskStyle}>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })
    const todoListForRender: JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <p>Your todoList is empty</p>

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setNewTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        const trimmedTitle = newTitle.trim()
        if (trimmedTitle) {
            addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setNewTitle('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()

    const changeFilterAllHandler = () => changeFilter('All')
    const changeFilterActiveHandler = () => changeFilter('Active')
    const changeFilterCompletedHandler = () => changeFilter('Completed')
    const errorMessage = error ? <p className="errorMessage">Title is required!</p> : ''
    const inputErrorStyle = error ? 'inputError' : ''
    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input className={inputErrorStyle} value={newTitle} onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            {errorMessage}
            {todoListForRender}
            <div className="buttons">
                <button className={filter === 'All' ? 'activeBtn' : 'btn'} onClick={changeFilterAllHandler}>All</button>
                <button className={filter === 'Active' ? 'activeBtn' : 'btn'}
                        onClick={changeFilterActiveHandler}>Active
                </button>
                <button className={filter === 'Completed' ? 'activeBtn' : 'btn'}
                        onClick={changeFilterCompletedHandler}>Completed
                </button>
            </div>
        </div>
    );
};

