import React, {ChangeEvent} from 'react';
import {TaskType} from './Todolist';
import {Button} from './Button';

type PropsType = TaskType & {
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Task: React.FC<PropsType> = props => {
    const {id, title, isDone, removeTask, changeTaskStatus, ...restProps} = props
    const removeTaskHandler = () => removeTask(id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(id, e.currentTarget.checked)
    return (
        <li>
            <input type="checkbox" checked={isDone} onChange={onChangeHandler}/>
            <span className={isDone ? 'completedTask' : 'activeTask'}>{title}</span>
            <Button name="x" onClick={removeTaskHandler}/>
        </li>
    );
};

