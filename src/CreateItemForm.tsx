import {type ChangeEvent, KeyboardEvent, useState} from "react";
import AddTaskIcon from '@mui/icons-material/AddTask';
import IconButton from '@mui/material/IconButton';

type Props = {
    createItem: (title: string) => void
}

export const CreateItemForm = ({createItem}: Props) => {
    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
        setError(false)
    }
    const createItemHandler = () => {
        const trimmedTaskTitle = itemTitle.trim()
        if (trimmedTaskTitle) {
            createItem(trimmedTaskTitle)
            setItemTitle('')
        } else {
            setError(true)
        }
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && createItemHandler()
    }
    const errorClassName = error ? 'error' : ''

    return (
        <div>
            <input className={errorClassName} type="text" value={itemTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
            <IconButton color="secondary" onClick={createItemHandler}>
                <AddTaskIcon/>
            </IconButton>
            {error && <p className='errorMessage'>Title is required!</p>}
        </div>
    );
};

