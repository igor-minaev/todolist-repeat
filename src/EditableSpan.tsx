import {type ChangeEvent, useState} from "react";

type Props = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan = ({value, onChange}: Props) => {
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
                ? <input value={title} onChange={onChangeHandler} autoFocus/>
                : <span onDoubleClick={onEdit}>{value}</span>
            }
        </>

    );
};
