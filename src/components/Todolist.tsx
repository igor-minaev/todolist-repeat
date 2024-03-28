import React from 'react';

type TodolistType = {
    title: string
    tasks: TaskType[]
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist: React.FC<TodolistType> = (props) => {
    const {title, tasks, ...restProps} = props
    const mappedTasks: JSX.Element[] = tasks.map(task => {
        return <li key={task.id}>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
        </li>
    })
    const tasksForRender: JSX.Element = tasks
        ? <ul className="list">{mappedTasks}</ul>
        : <p>Your todolist is empty!</p>
    return (
        <div className="todolist">
            <h2>{title}</h2>
            <div>
                <input/>
                <button>+</button>
            </div>
            {tasksForRender}
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

