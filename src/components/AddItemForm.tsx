import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
    const buttonStyles = {maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}
    return (
        <div>
            <TextField
                error={error}
                id="outlined-basic"
                label={error ? 'Error' : 'New item title'}
                helperText={error ? 'Incorrect entry' : null}
                variant="outlined"
                size={'small'}
                value={newItemTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}/>
            <Button style={buttonStyles} onClick={addItemHandler} variant="contained">+</Button>
        </div>
    );
};

