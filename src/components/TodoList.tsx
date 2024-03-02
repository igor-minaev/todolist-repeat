import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterType, TaskType} from '../App';

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (newFilterValue: FilterType) => void
    addTask: (title: string) => void
}
export const TodoList: FC<TodoListPropsType> = (
    {
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask
    }) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState(false)

    const listItems: JSX.Element[] = tasks.map(task => {
        const removeTaskHandler = () => removeTask(task.id)
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
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
    const inputError = error ? 'inputError' : ''
    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input className={inputError} value={newTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            {errorMessage}
            {todoListForRender}
            <div className="buttons">
                <button onClick={changeFilterAllHandler}>All</button>
                <button onClick={changeFilterActiveHandler}>Active</button>
                <button onClick={changeFilterCompletedHandler}>Completed</button>
            </div>
        </div>
    );
};

