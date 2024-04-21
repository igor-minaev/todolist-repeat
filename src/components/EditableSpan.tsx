import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    oldTitle: string
    onClick: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = ({oldTitle, onClick}) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(oldTitle)
    const editHandler = () => {
        setEdit(!edit)
        edit && editTask()
    }
    const editTask = () => onClick(newTitle)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    return (
        edit
            ? <TextField
                id="outlined-basic"
                label={'Task title'}
                variant="outlined"
                size={'small'}
                value={newTitle}
                onChange={onChangeHandler}
                onBlur={editHandler} autoFocus/>
            : <span onDoubleClick={editHandler}>{oldTitle}</span>
    );
};

