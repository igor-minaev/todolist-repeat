import {type ChangeEvent, KeyboardEvent, useState} from "react";
import IconButton from '@mui/material/IconButton';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';

type Props = {
    createItem: (title: string) => void
};
export const CreateItemForm = ({createItem}: Props) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setNewTitle(e.currentTarget.value)
    }

    const createTaskHandler = () => {
        const trimmedTitle = newTitle.trim()
        if (trimmedTitle) {
            createItem(newTitle)
        } else {
            setError(true)
        }
        setNewTitle('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && createTaskHandler()
    }
    return (
        <div>
            <input style={{border: error ? '1px solid red' : ''}} value={newTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
            <IconButton onClick={createTaskHandler}>
                <AddToQueueIcon/>
            </IconButton>
            {error && <p style={{color: 'red'}}>Title is required!</p>}
        </div>
    );
};