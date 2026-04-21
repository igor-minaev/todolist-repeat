import {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    oldTitle: string
    changeTitle: (title: string) => void
    className?: string
}

export const EditableSpan = ({oldTitle, changeTitle, className}: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(oldTitle)

    const onMode = () => setEditMode(true)
    const offMode = () => {
        setEditMode(false)
        changeTitle(newTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && offMode()
    }

    return (
        editMode
            ? <input autoFocus value={newTitle} onChange={onChangeHandler} onBlur={offMode} onKeyDown={onKeyDownHandler}/>
            : <span className={className} onDoubleClick={onMode}>{oldTitle}</span>
    );
};

