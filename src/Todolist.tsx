import {FilterValue, TaskType} from "./App.tsx";
import {Button} from "./components/Button.tsx";
import {ChangeEvent} from "react";
import {Task} from "./Task.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValue
    tasks: TaskType[]
    removeTask: (payload: { todolistId: string, taskId: string }) => void
    changeTodolistFilter: (payload: { todolistId: string, filter: FilterValue }) => void
    addTask: (payload: { todolistId: string, title: string }) => void
    changeTaskStatus: (payload: { todolistId: string, taskId: string, isDone: boolean }) => void
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (payload: { todolistId: string, title: string }) => void
    changeTaskTitle: (payload: { todolistId: string, taskId: string, title: string }) => void
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
                             deleteTodolist,
                             changeTodolistTitle,
                             changeTaskTitle
                         }: TodolistPropsType) => {


    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(t => {
                    const changeTaskTitleHandler = (title: string) => changeTaskTitle({todolistId: id, title, taskId: t.id})
                    const removeTaskHandler = () => removeTask({todolistId: id, taskId: t.id})
                    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus({
                        todolistId: id,
                        taskId: t.id,
                        isDone: e.currentTarget.checked
                    })
                    return (
                        <Task key={t.id} {...t} removeTaskHandler={removeTaskHandler} onChangeTaskStatusHandler={onChangeTaskStatusHandler} changeTaskTitle={changeTaskTitleHandler}/>
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

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle({todolistId: id, title})
    }


    const changeAllFilterHandler = () => changeTodolistFilter({todolistId: id, filter: "all"})
    const changeActiveFilterHandler = () => changeTodolistFilter({todolistId: id, filter: "active"})
    const changeCompletedFilterHandler = () => changeTodolistFilter({todolistId: id, filter: "completed"})

    return (
        <div>
            <h3>
                <EditableSpan title={title} editTitle={changeTodolistTitleHandler}/>
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

