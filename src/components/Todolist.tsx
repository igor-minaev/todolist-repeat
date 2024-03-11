import React from 'react';
import {FilterValuesType, TaskType} from '../App';
import {Task} from './Task';
import {Button} from './Button';

type TodolistPropsType = {
    filter: FilterValuesType
    todolistTitle: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {filter, todolistTitle, tasks, removeTask, changeFilter, ...restProps} = props

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
                                                                        removeTask={removeTask}/>)

    const tasksForRender: JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <p>Your todolist is empty!</p>

    const changeFilterAllHandler = () => changeFilter('All')
    const changeFilterActiveHandler = () => changeFilter('Active')
    const changeFilterCompletedHandler = () => changeFilter('Completed')

    return (
        <div className="todolist">
            <h3 className="title">{todolistTitle}</h3>
            <div>
                <input/>
                <select>
                    <option value="-">Choose direction</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                </select>
                <button>+</button>
            </div>
            {tasksForRender}
            <div className="buttons">
                <Button name={'All'} onClick={changeFilterAllHandler}/>
                <Button name={'Active'} onClick={changeFilterActiveHandler}/>
                <Button name={'Completed'} onClick={changeFilterCompletedHandler}/>
            </div>
        </div>
    );
};

