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

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    const addTaskHandler = () => {
        addTask(newTitle)
        setNewTitle('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()

    const changefilterAllHandler = () => changeFilter('All')
    const changefilterActiveHandler = () => changeFilter('Active')
    const changefilterCompletedHandler = () => changeFilter('Completed')
    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input value={newTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            {todoListForRender}
            <div className="buttons">
                <button onClick={changefilterAllHandler}>All</button>
                <button onClick={changefilterActiveHandler}>Active</button>
                <button onClick={changefilterCompletedHandler}>Completed</button>
            </div>
        </div>
    );
};

