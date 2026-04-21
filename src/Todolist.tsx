import {FilterType, TaskType} from "./App.tsx";
import {Button} from "./components/Button.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";

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
                             removeTodolist
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
                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                        <span className={t.isDone ? 'taskDone' : 'task'}>{t.title}</span>
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

    return (
        <div>
            <h3>
                {title}
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

