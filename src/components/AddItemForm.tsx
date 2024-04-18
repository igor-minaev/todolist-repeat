import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (itemTitle: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = ({addItem}) => {
    const [newItemTitle, setNewItemTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setNewItemTitle(e.currentTarget.value)
    }
    const addItemHandler = () => {
        const trimmedTitle = newItemTitle.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setNewItemTitle('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addItemHandler()
    const errorMessage = error && <p style={{color: 'red'}}>Title is required!</p>
    const inputStyle = error ? 'error' : ''
    return (
        <div>
            <input className={inputStyle} value={newItemTitle} onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
            <button onClick={addItemHandler}>+</button>
            {errorMessage}
        </div>
    );
};

