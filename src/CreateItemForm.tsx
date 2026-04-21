import {Button} from "./components/Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type CreateItemFormPropsType = {
    createItem: (title: string) => void
}

export const CreateItemForm = ({createItem}: CreateItemFormPropsType) => {
    const [newTitleText, setNewTitleText] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTitleText(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        const trimmedTitle = newTitleText.trim()
        if (trimmedTitle) {
            createItem(trimmedTitle)
        } else {
            setError(true)
        }
        setNewTitleText('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addTaskHandler()
    }

    const disableButtonValidation = newTitleText.length < 5 || newTitleText.length > 20

    const minLengthTitleValidation = newTitleText.length < 5 && <p>Title should be more then 5 chars</p>
    const maxLengthTitleValidation = newTitleText.length > 20 && <p>Title should be less then 20 chars</p>
    const errorMessage = error && <p className='errorMessage'>Title is required!</p>

    return (
        <div>
            <input className={error ? 'error' : ''} onChange={onChangeHandler} value={newTitleText} onKeyDown={onKeyDownHandler}/>
            <Button name='+' onClick={addTaskHandler} disabled={disableButtonValidation}/>
            {!error && minLengthTitleValidation}
            {!error && maxLengthTitleValidation}
            {errorMessage}
        </div>
    );
};

