import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {DirectionType, FilterValuesType, TaskType} from '../App';
import {Task} from './Task';
import {Button} from './Button';


type TodolistPropsType = {
    filter: FilterValuesType
    todolistTitle: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string, direction: DirectionType) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {filter, todolistTitle, tasks, removeTask, changeFilter, addTask, changeTaskStatus, ...restProps} = props
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [direction, setDirection] = useState<DirectionType>('-')
    const [error, setError] = useState(false)

    const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        switch (filter) {
            case 'Active':
                return tasks.filter(t => !t.isDone)
            case 'Completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }
    const tasksForTodolist = getFilteredTasks(tasks, filter)

    const listItems: JSX.Element[] = tasksForTodolist.map(task => <Task key={task.id} {...task}
                                                                        removeTask={removeTask} changeTaskStatus={changeTaskStatus}/>)

    const tasksForRender: JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <p>Your todolist is empty!</p>

    const changeFilterAllHandler = () => changeFilter('All')
    const changeFilterActiveHandler = () => changeFilter('Active')
    const changeFilterCompletedHandler = () => changeFilter('Completed')
    const addTaskHandler = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle && direction !== '-') {
            addTask(trimmedTitle, direction)
            setNewTaskTitle('')
            setDirection('-')
        } else {
            setError(true)
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()
    const onChangeDirectionHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        error && setError(false)
        setDirection(e.currentTarget.value as DirectionType)
    }
    const inputClass = error ? 'inputError' : ''


    return (
        <div className="todolist">
            <h3 className="title">{todolistTitle}</h3>
            <div>
                <input className={inputClass} placeholder="Enter new task title" value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <select className={inputClass} value={direction} onChange={onChangeDirectionHandler}>
                    <option value="-">Choose direction</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                </select>
                <Button name={'+'} onClick={addTaskHandler}/>
            </div>
            <p style={{color: 'red'}}>{error && 'Fields title and direction are required!'}</p>
            {tasksForRender}
            <div className="buttons">
                <Button name={'All'} onClick={changeFilterAllHandler}/>
                <Button name={'Active'} onClick={changeFilterActiveHandler}/>
                <Button name={'Completed'} onClick={changeFilterCompletedHandler}/>
            </div>
        </div>
    );
};

