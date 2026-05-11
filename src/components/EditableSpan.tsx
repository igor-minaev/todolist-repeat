import {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    value: string
    changeTitle: (title: string) => void
    className?: string
}
export const EditableSpan = ({value, changeTitle, className}: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(value)

    const turnOnEditMode = () => setEditMode(true)
    const turnOffEditMode = () => {
        setEditMode(false)
        changeTitle(newTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && turnOffEditMode()
    }

    return (
        editMode
            ?
            <TextField
                variant="standard"
                autoFocus
                value={newTitle}
                onChange={onChangeHandler}
                onBlur={turnOffEditMode}
                onKeyDown={onKeyDownHandler}/>
            // <input autoFocus value={newTitle} onChange={onChangeHandler} onBlur={turnOffEditMode} onKeyDown={onKeyDownHandler}/>
            : <span className={className} onDoubleClick={turnOnEditMode}>{value}</span>
    );
};

