import {type ChangeEvent, KeyboardEvent, useState} from "react";
import IconButton from '@mui/material/IconButton';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import TextField from '@mui/material/TextField';

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
            <TextField
                size="small"
                label="Item title"
                variant="standard"
                value={newTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={error}
                helperText={error && "Title is required!"}
            />
            <IconButton onClick={createTaskHandler}>
                <AddToQueueIcon/>
            </IconButton>
        </div>
    );
};