import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from '../App';


type TodolistPropsType = {
    filter: FilterValuesType
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {filter, title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, ...restProps} = props
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
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

    const mappedTasks: JSX.Element[] = filteredTasks.map(task => {
        const removeTaskHandler = () => removeTask(task.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                <span>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })

    const tasksForRender: JSX.Element = tasks.length ?
        <ul>{mappedTasks}</ul> :
        <p>Your todolist is empty!</p>

    const changeFilterHandler = (filter: FilterValuesType) => () => changeFilter(filter)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
    const addTaskHandler = () => {
        addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()

    return (
        <div className="todolist">
            <h2>{title}</h2>
            <div>
                <input value={newTaskTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            {tasksForRender}
            <div className="buttons">
                <button onClick={changeFilterHandler('all')}>All</button>
                <button onClick={changeFilterHandler('active')}>Active</button>
                <button onClick={changeFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    );
};

