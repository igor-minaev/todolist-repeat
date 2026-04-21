import {FilterType, TaskType} from "./App.tsx";
import {Button} from "./components/Button.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type TodolistPropsType = {
    id: string
    title: string
    filter: FilterType
    tasks: TaskType[]
    removeTask: (payload: { todolistId: string, taskId: string }) => void
    changeTodolistFilter: (payload: { todolistId: string, filter: FilterType }) => void
    addTask: (payload: { todolistId: string, title: string }) => void
    changeTaskStatus: (payload: { todolistId: string, taskId: string, isDone: boolean }) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (payload: { todolistId: string, taskId: string, title: string }) => void
    changeTodolistTitle: (payload: { todolistId: string, title: string }) => void
}

export const Todolist = ({
                             id,
                             title,
                             filter,
                             tasks,
                             removeTask,
                             changeTodolistFilter,
                             addTask,
                             changeTaskStatus,
                             removeTodolist,
                             changeTaskTitle,
                             changeTodolistTitle
                         }: TodolistPropsType) => {

    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(t => {
                const removeTaskHandler = () => removeTask({todolistId: id, taskId: t.id})
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus({
                    todolistId: id,
                    taskId: t.id,
                    isDone: e.currentTarget.checked
                })
                const changeTaskTitleHandler = (title: string) => {
                    changeTaskTitle({todolistId: id, taskId: t.id, title})
                }
                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                        <EditableSpan oldTitle={t.title} changeTitle={changeTaskTitleHandler} className={t.isDone ? 'taskDone' : 'task'}/>
                        <Button name='x' onClick={removeTaskHandler}/>
                    </li>
                )
            })}
        </ul>
        : <p>Your taskslist is empty!</p>

    const changeFilterToAllHandler = () => changeTodolistFilter({todolistId: id, filter: 'all'})
    const changeFilterToActiveHandler = () => changeTodolistFilter({todolistId: id, filter: 'active'})
    const changeFilterToCompletedHandler = () => changeTodolistFilter({todolistId: id, filter: 'completed'})


    const addTaskHandler = (title: string) => {
        addTask({todolistId: id, title})
    }

    const removeTodolistHandler = () => removeTodolist(id)
    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle({todolistId: id, title})
    }

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={title} changeTitle={changeTodolistTitleHandler}/>
                <Button name='x' onClick={removeTodolistHandler}/>
            </h3>
            <CreateItemForm createItem={addTaskHandler}/>
            {mappedTasks}
            <div>
                <Button className={filter === 'all' ? `button active` : 'button'} name='All' onClick={changeFilterToAllHandler}/>
                <Button className={filter === 'active' ? `button active` : 'button'} name='Active' onClick={changeFilterToActiveHandler}/>
                <Button className={filter === 'completed' ? `button active` : 'button'} name='Completed' onClick={changeFilterToCompletedHandler}/>
            </div>
        </div>
    );
};

