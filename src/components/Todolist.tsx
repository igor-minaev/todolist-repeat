import {TaskType} from "../types/task.ts";
import {Button} from "./Button.tsx";
import {Task} from "./Task.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType} from "../types/todolist.ts";

type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterType
    deleteTask: (payload: { todolistId: string, taskId: string }) => void
    changeFilter: (payload: { todolistId: string, filter: FilterType }) => void
    addTask: (title: string) => void
    changeTaskStatus:  (payload: { todolistId: string, taskId: string, isDone: boolean }) => void
    deleteTodolist: (todolistId: string) => void
}
export const Todolist = ({
                             id,
                             title,
                             tasks,
                             filter,
                             deleteTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             deleteTodolist
                         }: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState(false)
    const minTaskTitleLength = 5
    const maxTaskTitleLength = 15

    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(t => {
                const deleteTaskHandler = () => deleteTask({todolistId: id, taskId: t.id})
                const changeTaskStatusHandler = (isDone:boolean)=>changeTaskStatus({todolistId:id,taskId:t.id,isDone})
                return <Task key={t.id} {...t} deleteTask={deleteTaskHandler} changeTaskStatus={changeTaskStatusHandler}/>
            })}
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

    const changeFilterAllHandler = () => changeFilter({todolistId: id, filter: 'all'})
    const changeFilterActiveHandler = () => changeFilter({todolistId: id, filter: 'active'})
    const changeFilterCompletedHandler = () => changeFilter({todolistId: id, filter: 'completed'})
    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    return (
        <div>
            <h3>
                {title}
                <Button onClick={deleteTodolistHandler}>x</Button>
            </h3>
            <div>
                <input value={newTaskTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <Button onClick={addTaskHandler} disabled={disableButton}>+</Button>
                {errorMessage}
                {!error && minLengthValidatingMessage}
                {!error && maxLengthValidatingMessage}
            </div>
            {mappedTasks}
            <div>
                <Button className={filter === 'all' ? 'filter-button active' : 'filter-button'} onClick={changeFilterAllHandler}>All</Button>
                <Button className={filter === 'active' ? 'filter-button active' : 'filter-button'} onClick={changeFilterActiveHandler}> Active </Button>
                <Button className={filter === 'completed' ? 'filter-button active' : 'filter-button'} onClick={changeFilterCompletedHandler}>Completed</Button>
            </div>
        </div>
    );
};

