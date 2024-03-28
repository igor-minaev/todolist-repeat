import React from 'react';
import {TaskType} from './Todolist';
import {Button} from './Button';

type PropsType = TaskType & {
    removeTask: (taskId: string) => void
}

export const Task: React.FC<PropsType> = props => {
    const {id, title, isDone, removeTask, ...restProps} = props
    const removeTaskHandler = () => removeTask(id)
    return (
        <li>
            <input type="checkbox" checked={isDone}/>
            <span>{title}</span>
            <Button name="x" onClick={removeTaskHandler}/>
        </li>
    );
};

