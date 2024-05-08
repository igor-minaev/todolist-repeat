import React from 'react';
import {FilterType, TaskType} from '../App';
import {Button} from './Button';

type TodolistPropsType = {
    filter: FilterType
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (newFilterValue: FilterType) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {filter, title, tasks, removeTask, changeFilter, ...restProps} = props

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

    return (
        <div className="todolist">
            <h2>{title}</h2>
            <div>
                <input/>
                <Button name="+" callBack={() => {
                }}/>
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

