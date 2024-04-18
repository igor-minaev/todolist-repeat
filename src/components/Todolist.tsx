import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';


type TodolistPropsType = {
    todolistId: string
    filter: FilterValuesType
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (todolistId: string, filter: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {
        todolistId,
        filter,
        title,
        tasks,
        removeTask,
        changeTodolistFilter,
        addTask,
        changeTaskStatus,
        removeTodolist,
        changeTodolistTitle,
        ...restProps
    } = props

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
        const removeTaskHandler = () => removeTask(todolistId, task.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistId, task.id, e.currentTarget.checked)
        const taskStyle = task.isDone ? 'done' : 'task'
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                <span className={taskStyle}>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })

    const tasksForRender: JSX.Element = tasks.length ?
        <ul>{mappedTasks}</ul> :
        <p>Your todolist is empty!</p>

    const changeFilterHandler = (filter: FilterValuesType) => () => changeTodolistFilter(todolistId, filter)
    const removeTodolistHandler = () => removeTodolist(todolistId)
    const addTaskHandler = (taskTitle: string) => addTask(todolistId, taskTitle)
    const changeTodolistTitleHandler = (newTitle: string) => changeTodolistTitle(todolistId, newTitle)
    return (
        <div className="todolist">
            <h2>
                <EditableSpan oldTitle={title} onClick={changeTodolistTitleHandler}/>
                {/*{title}*/}
                <button onClick={removeTodolistHandler}>x</button>
            </h2>
            <AddItemForm addItem={addTaskHandler}/>
            {tasksForRender}
            <div className="buttons">
                <button className={filter === 'all' ? 'active' : ''} onClick={changeFilterHandler('all')}>All</button>
                <button className={filter === 'active' ? 'active' : ''} onClick={changeFilterHandler('active')}>Active
                </button>
                <button className={filter === 'completed' ? 'active' : ''}
                        onClick={changeFilterHandler('completed')}>Completed
                </button>
            </div>
        </div>
    );
};

