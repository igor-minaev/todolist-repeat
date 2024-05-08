import React from 'react';
import {TaskType} from '../App';

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {title, tasks, ...restProps} = props
    const listItems: JSX.Element[] = tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
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
                <button>+</button>
            </div>
            {mappedTasks}
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Complete</button>
            </div>
        </div>
    );
};

