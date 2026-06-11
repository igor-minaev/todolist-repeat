import {Button} from "./Button"
import type {FilterValues} from "./App";
import {type ChangeEvent, KeyboardEvent, useState} from "react";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type Props = {
    title: string
    id: string
    filter: FilterValues
    tasks: TaskType[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
}

export const Todolist = ({
                             title,
                             id,
                             filter,
                             tasks,
                             deleteTask,
                             changeTodolistFilter,
                             createTask,
                             changeTaskStatus,
                             deleteTodolist
                         }: Props) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState(false)


    const mappedTasks = tasks.length === 0
        ? <p>Your tasks list is empty!</p>
        : <ul>
            {tasks.map(task => {
                const deleteTaskHandler = () => deleteTask(id, task.id)
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(id, task.id, e.currentTarget.checked)
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                        <span className={task.isDone ? 'taskDone' : 'task'}>{task.title}</span>
                        <Button name='x' onClick={deleteTaskHandler}/>
                    </li>
                )
            })}
        </ul>
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(false)
    }

    const createTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle) {
            createTask(id, trimmedTaskTitle)
            setTaskTitle('')
        } else {
            setError(true)
        }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && createTaskHandler()
    }

    const filterAllHandler = () => changeTodolistFilter(id, "all")
    const filterActiveHandler = () => changeTodolistFilter(id, "active")
    const filterCompletedHandler = () => changeTodolistFilter(id, "completed")
    const errorClassName = error ? 'error' : ''
    const deleteTodolistHandler = () => deleteTodolist(id)

    return (
        <div>
            <h3>
                {title}
                <Button name='x' onClick={deleteTodolistHandler}/>
            </h3>
            <div>
                <input className={errorClassName} type="text" value={taskTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <Button name='+' onClick={createTaskHandler}/>
                {error && <p className='errorMessage'>Title is required!</p>}
            </div>
            {mappedTasks}
            <div className='buttonsWrapper'>
                <Button className={filter === 'all' ? 'activeButton' : 'button'} name='All' onClick={filterAllHandler}/>
                <Button className={filter === 'active' ? 'activeButton' : 'button'} name='Active' onClick={filterActiveHandler}/>
                <Button className={filter === 'completed' ? 'activeButton' : 'button'} name='Completed' onClick={filterCompletedHandler}/>
            </div>
        </div>
    );
};
