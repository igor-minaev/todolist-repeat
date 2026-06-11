import {type ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";

type Props = {
    value: string
    onChange: (title: string) => void
    className?: string
}

export const EditableSpan = ({value, onChange, className}: Props) => {
    const [title, setTitle] = useState(value)
    const [editMode, setEditMode] = useState(false)

    const onEdit = () => setEditMode(true)
    const offEditMode = () => {
        onChange(title)
        setEditMode(false)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return (
        <>
            {editMode
                ? <TextField
                    size='small'
                    variant="standard"
                    value={title}
                    onChange={onChangeHandler} onBlur={offEditMode} autoFocus/>
                : <span className={className} onDoubleClick={onEdit}>{value}</span>
            }
        </>

    );
};
