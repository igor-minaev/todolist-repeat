import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type PropsType = {
    title: string
    changeItemTitle: (title: string) => void
}

export const EditableSpan: React.FC<PropsType> = ({title, changeItemTitle}) => {
    const [newTitle, setNewTitle] = useState(title)
    const [edit, setEdit] = useState(false)
    const editHandler = () => {
        setEdit(!edit)
        edit && changeItemTitle(newTitle)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    return (
        edit
            ? <TextField size="small" id="outlined-basic" label="Title"
                         variant="outlined" value={newTitle} onChange={onChangeHandler} autoFocus onBlur={editHandler}/>
            : <span onDoubleClick={editHandler}>{title}</span>
    );
};

