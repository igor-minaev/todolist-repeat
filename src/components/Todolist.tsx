import React, {FC} from 'react';
import {FilterType, TaskType} from '../App';


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (newFilterValue: FilterType) => void
}

export const Todolist: FC<TodolistPropsType> = (
    {
        title, tasks, removeTask, changeFilter
    }) => {
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
                <input/>
                <button>+</button>
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

