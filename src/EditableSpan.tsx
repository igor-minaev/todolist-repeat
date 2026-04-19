import {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    editTitle: (title: string) => void
    className?: string
}

export const EditableSpan = ({title, editTitle,className}: EditableSpanPropsType) => {

    const [newTitle, setNewTitle] = useState(title)
    const [editMode, setEditMode] = useState(false)

    const onEdit = () => setEditMode(true)
    const offEdit = () => {
        editTitle(newTitle)
        setEditMode(false)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)

    return (
        <>
            {editMode
                ? <input
                    autoFocus
                    value={newTitle}
                    onChange={onChangeHandler}
                    onBlur={offEdit}
                    onKeyDown={(e) => e.key === 'Enter' && offEdit()}
                />
                : <span className={className} onDoubleClick={onEdit}>{title}</span>
            }
        </>
    );
};

