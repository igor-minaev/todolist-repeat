import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormType> = ({addItem}) => {
    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState(false)
    const addItemHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setItemTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setItemTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addItemHandler()
    const errorMessage = error && <p style={{color: 'red'}}>Title is required!</p>
    const errorInput = error ? 'error' : ''
    return (
        <div>
            <input className={errorInput} value={itemTitle} onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
            <Button name="+" onClick={addItemHandler}/>
            {errorMessage}
        </div>
    );
};

