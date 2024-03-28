import React, {ChangeEvent} from 'react';
import {TaskType} from './Todolist';
import {Button} from './Button';
import {EditableSpan} from './EditableSpan';

type PropsType = TaskType & {
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
}

export const Task: React.FC<PropsType> = props => {
    const {id, title, isDone, removeTask, changeTaskStatus, changeTaskTitle, ...restProps} = props
    const removeTaskHandler = () => removeTask(id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(id, e.currentTarget.checked)
    const changeTaskTitleHandler = (title: string) => changeTaskTitle(id, title)
    return (
        <li className={isDone ? 'completedTask' : 'activeTask'}>
            <input type="checkbox" checked={isDone} onChange={onChangeHandler}/>
            {/*<span >{title}</span>*/}
            <EditableSpan oldTitle={title} onClick={changeTaskTitleHandler}/>
            <Button name="x" onClick={removeTaskHandler}/>
        </li>
    );
};

