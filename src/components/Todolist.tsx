import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {FilterType, TaskType} from '../App';
import {Button} from './Button';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

type TodolistPropsType = {
    todolistId: string
    filter: FilterType
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (todolistId: string, filter: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
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
        changeTaskTitle,
        changeTodolistTitle,
        ...restProps
    } = props

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
        const removeTaskHandler = () => removeTask(todolistId, t.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistId, t.id, e.currentTarget.checked)
        const taskStyle = t.isDone ? 'taskDone' : 'task'
        const changeTaskTitleHandler = (title: string) => changeTaskTitle(todolistId, t.id, title)
        return (
            <li key={t.id} className={taskStyle}>
                <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                <EditableSpan title={t.title} changeItemTitle={changeTaskTitleHandler}/>
                <Button name="x" callBack={removeTaskHandler}/>
            </li>
        )
    })

    const mappedTasks: JSX.Element = filteredTasks.length
        ? <ul>{listItems}</ul>
        : <p>Your todolist is empty!</p>

    const changeFilterHandler = (newFilterValue: FilterType) => changeTodolistFilter(todolistId, newFilterValue)

    const removeTodolistHandler = () => removeTodolist(todolistId)
    const addTaskHandler = (title: string) => addTask(todolistId, title)
    const changeTodolistTitleHandler = (title: string) => changeTodolistTitle(todolistId, title)
    return (
        <div className="todolist">
            <h2>
                <EditableSpan title={title} changeItemTitle={changeTodolistTitleHandler}/>
                <Button name="x" callBack={removeTodolistHandler}/>
            </h2>
            <AddItemForm addItem={addTaskHandler}/>
            {mappedTasks}
            <div>
                <Button className={filter === 'all' ? 'btn' : ''} name="All"
                        callBack={() => changeFilterHandler('all')}/>
                <Button className={filter === 'active' ? 'btn' : ''} name="Active"
                        callBack={() => changeFilterHandler('active')}/>
                <Button className={filter === 'completed' ? 'btn' : ''} name="Complete"
                        callBack={() => changeFilterHandler('completed')}/>
            </div>
        </div>
    );
};

