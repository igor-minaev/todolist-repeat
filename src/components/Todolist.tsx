import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Task} from './Task';
import {Button} from './Button';
import {FilterType} from '../App';

type TodolistType = {
    filter: FilterType
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist: React.FC<TodolistType> = props => {
    const {filter, title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, ...restProps} = props

    const [taskTitle, setTaskTitle] = useState('')

    const getFilteredTasks = (tasks: TaskType[], filter: FilterType): TaskType[] => {
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

    const mappedTasks: JSX.Element[] = tasksForTodolist.map(task => {
        return <Task key={task.id} {...task} removeTask={removeTask} changeTaskStatus={changeTaskStatus}/>
    })
    const tasksForRender: JSX.Element = tasks.length
        ? <ul className="list">{mappedTasks}</ul>
        : <p>Your todolist is empty!</p>

    const changeFilterHandler = (filter: FilterType) => changeFilter(filter)
    // const changeFilterAllHandler = () => changeFilter('All')
    // const changeFilterActiveHandler = () => changeFilter('Active')
    // const changeFilterCompletedHandler = () => changeFilter('Completed')

    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()

    return (
        <div className="todolist">
            <h2>{title}</h2>
            <div>
                <input value={taskTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <Button name="+" onClick={addTaskHandler}/>
            </div>
            {tasksForRender}
            <div>
                <Button name="All" onClick={() => changeFilterHandler('All')}/>
                <Button name="Active" onClick={() => changeFilterHandler('Active')}/>
                <Button name="Completed" onClick={() => changeFilterHandler('Completed')}/>
            </div>
        </div>
    );
};

