import React from 'react';
import {TaskType} from '../App';


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {title, tasks, ...restProps} = props

    const mappedTasks: JSX.Element[] = tasks.map(task => (
        <li key={task.id}>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <button>x</button>
        </li>
    ))

    const tasksForRender: JSX.Element = tasks.length ?
        <ul>{mappedTasks}</ul> :
        <p>Your todolist is empty!</p>

    return (
        <div className='todolist'>
            <h2>{title}</h2>
            <div>
                <input/>
                <button>+</button>
            </div>
            {tasksForRender}
            <div className='buttons'>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

