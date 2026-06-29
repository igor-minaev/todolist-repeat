import type {FilterValues, Task} from "@/App";
import {Button} from "@/Button";
import {type ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
};
export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask, changeTaskStatus}: Props) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState(false)

    const mappedTasks = tasks.length
        ? <ul>
            {
                tasks.map(task => {
                    const deleteTaskHandler = () => deleteTask(task.id)
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(task.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                            <span>{task.title}</span>
                            <Button onClick={deleteTaskHandler}>x</Button>
                        </li>
                    )
                })
            }
        </ul>
        : <p>You don't have any task</p>

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setNewTitle(e.currentTarget.value)
    }

    const createTaskHandler = () => {
        const trimmedTitle = newTitle.trim()
        if (trimmedTitle) {
            createTask(newTitle)
        } else {
            setError(true)
        }
        setNewTitle('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && createTaskHandler()
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input style={{border: error ? '1px solid red' : ''}} value={newTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <Button onClick={createTaskHandler}>+</Button>
                {error && <p style={{color: 'red'}}>Title is required!</p>}
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
