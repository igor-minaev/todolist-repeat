import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterType, TaskType} from '../App';


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (newFilterValue: FilterType) => void
    addTask: (title: string) => void
}

export const Todolist: FC<TodolistPropsType> = (
    {
        title, tasks, removeTask, changeFilter, addTask
    }) => {

    const [taskTitle, setTaskTitle] = useState('')

    const mappedTasks: JSX.Element[] = tasks.map(task => {
        const onClickHandler = () => removeTask(task.id)
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title} - </span>
                <span>{task.category} </span>
                <button onClick={onClickHandler}>x</button>
            </li>
        )
    })

    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)
    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()
    const onClickAllFilter = () => changeFilter('all')
    const onClickActiveFilter = () => changeFilter('active')
    const onClickCompletedFilter = () => changeFilter('completed')

    const tasksForRender: JSX.Element = tasks.length
        ? <ul>{mappedTasks}</ul>
        : <span>Your task list is empty!</span>
    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div className="input">
                <input value={taskTitle} onChange={onchangeHandler} onKeyDown={onKeyDownHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            {tasksForRender}
            <div className="buttons">
                <button onClick={onClickAllFilter}>All</button>
                <button onClick={onClickActiveFilter}>Active</button>
                <button onClick={onClickCompletedFilter}>Completed</button>
            </div>
        </div>
    );
};

