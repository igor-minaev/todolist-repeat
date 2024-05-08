import React from 'react';
import {TaskType} from '../App';
import {Button} from './Button';

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {title, tasks, removeTask, ...restProps} = props
    const listItems: JSX.Element[] = tasks.map(t => {
        const removeTaskHandler = () => removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <Button name="x" callBack={removeTaskHandler}/>
            </li>
        )
    })
    const mappedTasks: JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <p>Your todolist is empty!</p>

    return (
        <div className="todolist">
            <h2>{title}</h2>
            <div>
                <input/>
                <Button name="+" callBack={() => {
                }}/>
            </div>
            {mappedTasks}
            <div>
                <Button name="All" callBack={() => {
                }}/>
                <Button name="Active" callBack={() => {
                }}/>
                <Button name="Complete" callBack={() => {
                }}/>
            </div>
        </div>
    );
};

