import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';

export const AddItemForm = () => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            addTask(todolistId, trimmedTitle)
        } else (
            setError(true)
        )
        setTaskTitle('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()
    const inputStyles = error ? 'error' : ''

    return (
        <div>
            <input className={inputStyles} value={taskTitle} onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
            <Button name="+" callBack={addTaskHandler}/>
            {error && <p className="errorMessage">Title is required!</p>}
        </div>
    );
};
