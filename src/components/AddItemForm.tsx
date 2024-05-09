import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
    const buttonStyles = {maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}

    return (
        <div>
            <TextField size="small" id="outlined-basic" label={error ? 'Error' : 'Title'}
                       helperText={error ? 'Title is required!' : null} variant="outlined"
                       value={taskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler} error={error}/>
            <Button style={buttonStyles} onClick={addItemHandler} variant="contained">+</Button>
        </div>
    );
};
