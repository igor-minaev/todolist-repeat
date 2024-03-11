import React, {ChangeEvent} from 'react';
import {TaskType} from '../App';
import {Button} from './Button';

type TaskPropsType = {
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
} & TaskType
export const Task: React.FC<TaskPropsType> = (props) => {
    const {id, title, direction, isDone, removeTask, changeTaskStatus, ...restProps} = props

    const removeTaskHandler = () => removeTask(id)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(id, e.currentTarget.checked)
    return (
        <li>
            <input type="checkbox" checked={isDone} onChange={onChangeStatusHandler}/>
            <span className={isDone ? 'done' : 'task'}>{title} - {direction}</span>
            <Button name={'x'} onClick={removeTaskHandler}/>
        </li>
    );
};

