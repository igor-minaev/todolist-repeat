import {TaskType} from "../types/task.ts";
import {Button} from "./Button.tsx";
import {Task} from "./Task.tsx";
import {FilterType} from "../types/todolist.ts";
import {CreateItemForm} from "./CreateItemForm.tsx";

type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterType
    deleteTask: (payload: { todolistId: string, taskId: string }) => void
    changeFilter: (payload: { todolistId: string, filter: FilterType }) => void
    addTask: (payload: { todolistId: string, title: string }) => void
    changeTaskStatus: (payload: { todolistId: string, taskId: string, isDone: boolean }) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (payload: { todolistId: string, taskId: string, title: string }) => void
}
export const Todolist = ({
                             id,
                             title,
                             tasks,
                             filter,
                             deleteTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             deleteTodolist,
                             changeTaskTitle
                         }: TodolistPropsType) => {


    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(t => {
                const deleteTaskHandler = () => deleteTask({todolistId: id, taskId: t.id})
                const changeTaskStatusHandler = (isDone: boolean) => changeTaskStatus({
                    todolistId: id,
                    taskId: t.id,
                    isDone
                })
                const changeTaskTitleHandler = (title: string) => changeTaskTitle({todolistId: id, taskId: t.id, title})
                return <Task key={t.id} {...t} deleteTask={deleteTaskHandler} changeTaskStatus={changeTaskStatusHandler} changeTitle={changeTaskTitleHandler}/>
            })}
        </ul>
        : <p>You don't create any task</p>


    const addTaskHandler = (title: string) => addTask({todolistId: id, title})


    const changeFilterAllHandler = () => changeFilter({todolistId: id, filter: 'all'})
    const changeFilterActiveHandler = () => changeFilter({todolistId: id, filter: 'active'})
    const changeFilterCompletedHandler = () => changeFilter({todolistId: id, filter: 'completed'})
    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    return (
        <div>
            <h3>
                {title}
                <Button onClick={deleteTodolistHandler}>x</Button>
            </h3>
            <CreateItemForm addItem={addTaskHandler}/>
            {mappedTasks}
            <div>
                <Button className={filter === 'all' ? 'filter-button active' : 'filter-button'} onClick={changeFilterAllHandler}>All</Button>
                <Button className={filter === 'active' ? 'filter-button active' : 'filter-button'} onClick={changeFilterActiveHandler}> Active </Button>
                <Button className={filter === 'completed' ? 'filter-button active' : 'filter-button'} onClick={changeFilterCompletedHandler}>Completed</Button>
            </div>
        </div>
    );
};

