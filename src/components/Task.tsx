import React from 'react';
import {TaskType} from '../App';
import {Button} from './Button';

type TaskPropsType = {
    removeTask: (taskId: string) => void
} & TaskType
export const Task: React.FC<TaskPropsType> = (props) => {
    const {id, title, direction, isDone, removeTask, ...restProps} = props

    const removeTaskHandler = () => removeTask(id)

    return (
        <li>
            <input type="checkbox" checked={isDone}/>
            <span>{title}</span>
            <span>- {direction}</span>
            <Button name={'x'} onClick={removeTaskHandler}/>
        </li>
    );
};

