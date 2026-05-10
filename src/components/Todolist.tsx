import {FilterType, TaskType} from "../types/task.ts";
import {Button} from "./Button.tsx";
import {Task} from "./Task.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}
export const Todolist = ({title, tasks, deleteTask, changeFilter, addTask, changeTaskStatus}: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState(false)
    const minTaskTitleLength = 5
    const maxTaskTitleLength = 15

    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(t => (
                <Task key={t.id} {...t} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus}/>
            ))}
        </ul>
        : <p>You don't create any task</p>

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setNewTaskTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle) {
            addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setNewTaskTitle('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTaskHandler()
    }

    const errorMessage = error && <p className='errorMessage'>Title is required!</p>
    const disableButton = newTaskTitle.length < minTaskTitleLength || newTaskTitle.length > maxTaskTitleLength
    const minLengthValidatingMessage = newTaskTitle.length < minTaskTitleLength &&
        <p>Title of task should be more then 5 chars</p>
    const maxLengthValidatingMessage = newTaskTitle.length > maxTaskTitleLength &&
        <p>Title of task should be less then 15 chars</p>

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <Button onClick={addTaskHandler} disabled={disableButton}>+</Button>
                {errorMessage}
                {!error && minLengthValidatingMessage}
                {!error && maxLengthValidatingMessage}
            </div>
            {mappedTasks}
            <div>
                <Button onClick={() => changeFilter('all')}>All</Button>
                <Button onClick={() => changeFilter('active')}> Active </Button>
                <Button onClick={() => changeFilter('completed')}>Completed</Button>
            </div>
        </div>
    );
};

