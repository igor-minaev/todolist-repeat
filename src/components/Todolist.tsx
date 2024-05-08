import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {FilterType, TaskType} from '../App';
import {Button} from './Button';

type TodolistPropsType = {
    filter: FilterType
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (newFilterValue: FilterType) => void
    addTask: (title: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {filter, title, tasks, removeTask, changeFilter, addTask, ...restProps} = props

    const [taskTitle, setTaskTitle] = useState('')

    const getFilteredTasks = (tasks: TaskType[], filter: FilterType): TaskType[] => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone)
            case 'completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks

        }
    }

    const filteredTasks = getFilteredTasks(tasks, filter)

    const listItems: JSX.Element[] = filteredTasks.map(t => {
        const removeTaskHandler = () => removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <Button name="x" callBack={removeTaskHandler}/>
            </li>
        )
    })

    const mappedTasks: JSX.Element = filteredTasks.length
        ? <ul>{listItems}</ul>
        : <p>Your todolist is empty!</p>

    const changeFilterHandler = (newFilterValue: FilterType) => changeFilter(newFilterValue)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)
    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()
    return (
        <div className="todolist">
            <h2>{title}</h2>
            <div>
                <input value={taskTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <Button name="+" callBack={addTaskHandler}/>
            </div>
            {mappedTasks}
            <div>
                <Button name="All" callBack={() => changeFilterHandler('all')}/>
                <Button name="Active" callBack={() => changeFilterHandler('active')}/>
                <Button name="Complete" callBack={() => changeFilterHandler('completed')}/>
            </div>
        </div>
    );
};

