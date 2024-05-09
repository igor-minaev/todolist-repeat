import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = ({addItem}) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(e.currentTarget.value)
    }
    const addItemHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else (
            setError(true)
        )
        setTaskTitle('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addItemHandler()
    const inputStyles = error ? 'error' : ''

    return (
        <div>
            <input className={inputStyles} value={taskTitle} onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
            <Button name="+" callBack={addItemHandler}/>
            {error && <p className="errorMessage">Title is required!</p>}
        </div>
    );
};
