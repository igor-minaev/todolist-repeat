import React from 'react';
import {TaskType} from './Todolist';

export const Task: React.FC<TaskType> = (props) => {
    const {title, isDone, ...restProps} = props
    return (
        <li>
            <input type="checkbox" checked={isDone}/>
            <span>{title}</span>
        </li>
    );
};

