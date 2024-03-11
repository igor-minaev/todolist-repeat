import React from 'react';
import {TaskType} from '../App';

type TodolistPropsType = {
    todolistTitle: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {todolistTitle, tasks, removeTask, ...restProps} = props
    const listItems: JSX.Element[] = tasks.map(task => {
        const removeTaskHandler = () => removeTask(task.id)
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <span>- {task.direction}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })
    const tasksForTodolist: JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <p>Your todolist is empty!</p>
    return (
        <div className="todolist">
            <h3 className="title">{todolistTitle}</h3>
            <div>
                <input/>
                <select>
                    <option value="-">Choose direction</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                </select>
                <button>+</button>
            </div>
            {tasksForTodolist}
            <div className="buttons">
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

