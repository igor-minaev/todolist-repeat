import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    oldTitle: string
    onClick: (newTitle: string) => void
}

export const EditableSpan = (props: PropsType) => {
    const [newTitle, setNewTitle] = useState(props.oldTitle)
    const [edit, setEdit] = useState(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    const editHandler = () => {
        setEdit(!edit)
        edit && changeTitle()
    }
    const changeTitle = () => props.onClick(newTitle)
    return (
        edit
            ? <input value={newTitle} onBlur={editHandler} onChange={onChangeHandler} autoFocus/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
};

