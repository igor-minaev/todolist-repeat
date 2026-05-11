import {ChangeEvent, KeyboardEvent, useState} from "react";
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';

type CreateItemFormPropsType = {
    addItem: (title: string) => void
}

export const CreateItemForm = ({addItem}: CreateItemFormPropsType) => {
    const [newItemTitle, setNewItemTitle] = useState('')
    const [error, setError] = useState(false)
    const minItemTitleLength = 5
    const maxItemTitleLength = 15

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setNewItemTitle(e.currentTarget.value)
    }

    const addItemHandler = () => {
        const trimmedTitle = newItemTitle.trim()
        if (trimmedTitle && newItemTitle.length > minItemTitleLength && newItemTitle.length < maxItemTitleLength) {
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setNewItemTitle('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addItemHandler()
    }

    const disableButton = newItemTitle.length < minItemTitleLength || newItemTitle.length > maxItemTitleLength
    const minLengthValidatingMessage = newItemTitle.length < minItemTitleLength &&
        <p>Title should be more then 5 chars</p>
    const maxLengthValidatingMessage = newItemTitle.length > maxItemTitleLength &&
        <p>Title should be less then 15 chars</p>

    return (
        <div>
            <TextField
                label="Task title"
                variant="outlined"
                value={newItemTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                size='small'
                error={error}
                helperText={error && 'Title is required!'}/>
            {/*<input className={error ? 'error' : ''} value={newItemTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>*/}
            <IconButton color='secondary' onClick={addItemHandler} disabled={disableButton}>
                <AddBoxIcon/>
            </IconButton>
            {/*<Button onClick={addItemHandler} disabled={disableButton}>+</Button>*/}
            {!error && minLengthValidatingMessage}
            {!error && maxLengthValidatingMessage}
        </div>
    );
};

