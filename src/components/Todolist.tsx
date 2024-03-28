import React from 'react';
import {Task} from './Task';
import {Button} from './Button';
import {FilterType} from '../App';

type TodolistType = {
    filter: FilterType
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterType) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist: React.FC<TodolistType> = props => {
    const {filter, title, tasks, removeTask, changeFilter, ...restProps} = props

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
        return <Task key={task.id} {...task} removeTask={removeTask}/>
    })
    const tasksForRender: JSX.Element = tasks.length
        ? <ul className="list">{mappedTasks}</ul>
        : <p>Your todolist is empty!</p>

    const changeFilterAllHandler = () => changeFilter('All')
    const changeFilterActiveHandler = () => changeFilter('Active')
    const changeFilterCompletedHandler = () => changeFilter('Completed')

    return (
        <div className="todolist">
            <h2>{title}</h2>
            <div>
                <input/>
                <Button name="+" onClick={() => {
                }}/>
            </div>
            {tasksForRender}
            <div>
                <Button name="All" onClick={changeFilterAllHandler}/>
                <Button name="Active" onClick={changeFilterActiveHandler}/>
                <Button name="Completed" onClick={changeFilterCompletedHandler}/>
            </div>
        </div>
    );
};

