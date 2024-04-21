import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';

type AddItemFormPropsType = {
    addItem: (itemTitle: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = ({addItem}) => {
    const [newItemTitle, setNewItemTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setNewItemTitle(e.currentTarget.value)
    }
    const addItemHandler = () => {
        const trimmedTitle = newItemTitle.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setNewItemTitle('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addItemHandler()
    const errorMessage = error && <p style={{color: 'red'}}>Title is required!</p>
    const inputStyle = error ? 'error' : ''
    const buttonStyles = {maxWidth: '25px', maxHeight: '25px', minWidth: '25px', minHeight: '25px'}
    return (
        <div>
            <input className={inputStyle} value={newItemTitle} onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
            <Button style={buttonStyles} onClick={addItemHandler} variant="contained">+</Button>
            {errorMessage}
        </div>
    );
};

