import {type ChangeEvent, useState} from "react";
import TextField from '@mui/material/TextField';

type Props = {
    oldTitle: string
    changeTitle: (title: string) => void
};
export const EditableSpan = ({oldTitle, changeTitle}: Props) => {
    const [title, setTitle] = useState(oldTitle)
    const [edit, setEdit] = useState(false)

    const editOn = () => {
        setEdit(true)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const editOff = () => {
        changeTitle(title)
        setEdit(false)
    }

    return (
        <>
            {
                edit
                    ? <TextField
                        size="small"
                        value={title}
                        onChange={onChangeHandler}
                        autoFocus onBlur={editOff}
                        variant="outlined"}/>
                    : <span onDoubleClick={editOn}>{oldTitle}</span>
            }
        </>
    );
};