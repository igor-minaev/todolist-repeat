import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';

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

    const errorMessage = error && <p className='error-message'>Title is required!</p>
    const disableButton = newItemTitle.length < minItemTitleLength || newItemTitle.length > maxItemTitleLength
    const minLengthValidatingMessage = newItemTitle.length < minItemTitleLength &&
        <p>Title of task should be more then 5 chars</p>
    const maxLengthValidatingMessage = newItemTitle.length > maxItemTitleLength &&
        <p>Title of task should be less then 15 chars</p>

    return (
        <div>
            <input className={error ? 'error' : ''} value={newItemTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
            <IconButton color='secondary' onClick={addItemHandler} disabled={disableButton}>
                <AddBoxIcon/>
            </IconButton>
            {/*<Button onClick={addItemHandler} disabled={disableButton}>+</Button>*/}
            {errorMessage}
            {!error && minLengthValidatingMessage}
            {!error && maxLengthValidatingMessage}
        </div>
    );
};

