import {FilterValue, TaskType} from "./App.tsx";
import {Button} from "./components/Button.tsx";
import {ChangeEvent} from "react";
import {Task} from "./Task.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";

type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValue
    tasks: TaskType[]
    removeTask: (payload: { todolistId: string, taskId: string }) => void
    changeFilter: (payload: { todolistId: string, filter: FilterValue }) => void
    addTask: (payload: { todolistId: string, title: string }) => void
    changeTaskStatus: (payload: { todolistId: string, taskId: string, isDone: boolean }) => void
    deleteTodolist: (todolistId: string) => void
}
export const Todolist = ({
                             id,
                             title,
                             filter,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             deleteTodolist
                         }: TodolistPropsType) => {


    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(t => {
                    const removeTaskHandler = () => removeTask({todolistId: id, taskId: t.id})
                    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus({
                        todolistId: id,
                        taskId: t.id,
                        isDone: e.currentTarget.checked
                    })
                    return (
                        <Task key={t.id} {...t} removeTaskHandler={removeTaskHandler} onChangeTaskStatusHandler={onChangeTaskStatusHandler}/>
                    )
                }
            )
            }
        </ul>
        : <p>Your tasklist is empty!</p>


    const addTaskHandler = (title: string) => {
        addTask({todolistId: id, title})
    }


    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }


    const changeAllFilterHandler = () => changeFilter({todolistId: id, filter: "all"})
    const changeActiveFilterHandler = () => changeFilter({todolistId: id, filter: "active"})
    const changeCompletedFilterHandler = () => changeFilter({todolistId: id, filter: "completed"})

    return (
        <div>
            <h3>
                {title}
                <Button onClick={deleteTodolistHandler}>x</Button>
            </h3>
            <CreateItemForm addItem={addTaskHandler}/>
            {
                mappedTasks
            }
            <div>
                <Button className={`button ${filter === "all" ? 'active' : ''}`} onClick={changeAllFilterHandler}>All</Button>
                <Button className={`button ${filter === "active" ? 'active' : ''}`} onClick={changeActiveFilterHandler}>Active</Button>
                <Button className={`button ${filter === "completed" ? 'active' : ''}`} onClick={changeCompletedFilterHandler}>Completed</Button>
            </div>
        </div>
    )
        ;
};

