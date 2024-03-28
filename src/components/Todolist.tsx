import React from 'react';
import {Task} from './Task';
import {Button} from './Button';

type TodolistType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist: React.FC<TodolistType> = props => {
    const {title, tasks, removeTask, ...restProps} = props

    const mappedTasks: JSX.Element[] = tasks.map(task => {
        return <Task key={task.id} {...task} removeTask={removeTask}/>
    })
    const tasksForRender: JSX.Element = tasks.length
        ? <ul className="list">{mappedTasks}</ul>
        : <p>Your todolist is empty!</p>

    return (
        <div className="todolist">
            <h2>{title}</h2>
            <div>
                <input/>
                <Button name="+" onClick={() => {
                }}/>
            </div>
            {tasksForRender}
            <div>
                <Button name="All" onClick={() => {
                }}/>
                <Button name="Active" onClick={() => {
                }}/>
                <Button name="Completed" onClick={() => {
                }}/>
            </div>
        </div>
    );
};

