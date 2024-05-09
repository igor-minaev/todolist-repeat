import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {FilterType, TaskType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

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
        const changeTaskTitleHandler = (title: string) => changeTaskTitle(todolistId, t.id, title)
        return (
            <ListItem key={t.id}>
                <Checkbox checked={t.isDone} onChange={onChangeHandler}/>
                <EditableSpan title={t.title} changeItemTitle={changeTaskTitleHandler}/>
                <IconButton color="primary" onClick={removeTaskHandler}>
                    <DeleteForeverIcon/>
                </IconButton>
            </ListItem>
        )
    })

    const mappedTasks: JSX.Element = filteredTasks.length
        ? <List>{listItems}</List>
        : <p>Your todolist is empty!</p>

    const changeFilterHandler = (newFilterValue: FilterType) => changeTodolistFilter(todolistId, newFilterValue)

    const removeTodolistHandler = () => removeTodolist(todolistId)
    const addTaskHandler = (title: string) => addTask(todolistId, title)
    const changeTodolistTitleHandler = (title: string) => changeTodolistTitle(todolistId, title)
    return (
        <div className="todolist">
            <h2>
                <EditableSpan title={title} changeItemTitle={changeTodolistTitleHandler}/>
                <IconButton color="primary" onClick={removeTodolistHandler}>
                    <DeleteForeverIcon/>
                </IconButton>
            </h2>
            <AddItemForm addItem={addTaskHandler}/>
            {mappedTasks}
            <div>
                <Button variant={filter === 'all' ? 'contained' : 'outlined'} color="primary"
                        onClick={() => changeFilterHandler('all')}>All</Button>
                <Button variant={filter === 'active' ? 'contained' : 'outlined'} color="secondary"
                        onClick={() => changeFilterHandler('active')}>Active</Button>
                <Button variant={filter === 'completed' ? 'contained' : 'outlined'} color="success"
                        onClick={() => changeFilterHandler('completed')}>Complete</Button>
            </div>
        </div>
    );
};

