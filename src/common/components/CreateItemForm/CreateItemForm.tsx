import {type ChangeEvent, KeyboardEvent, useState} from "react";
import AddTaskIcon from '@mui/icons-material/AddTask';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

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

    return (
        <div>
            <TextField
                size='small'
                variant="outlined"
                label="Enter title"
                error={error}
                helperText={error && 'Title is required!'}
                value={itemTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}/>
            <IconButton color="secondary" onClick={createItemHandler}>
                <AddTaskIcon/>
            </IconButton>
        </div>
    );
};

