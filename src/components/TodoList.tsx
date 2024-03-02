import React, {FC} from 'react';
import {TaskType} from '../App';

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
}
export const TodoList: FC<TodoListPropsType> = (
    {
        title,
        tasks
    }) => {
    const listItems: JSX.Element[] = tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
            </li>
        )
    })
    const todoListForRender: JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <p>Your todoList is empty</p>
    return (
        <div className='todolist'>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>x</button>
            </div>
            {todoListForRender}
            <div className='buttons'>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

