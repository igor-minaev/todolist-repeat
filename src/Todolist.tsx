import {FilterType, TaskType} from "./App.tsx";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeTodolistFilter: (filter: FilterType) => void
}

export const Todolist = ({title, tasks, removeTask, changeTodolistFilter}: TodolistPropsType) => {
    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(t => {
                const removeTaskHandler = () => removeTask(t.id)
                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={removeTaskHandler}>x</button>
                    </li>
                )
            })}
        </ul>
        : <p>Your taskslist is empty!</p>

    const changeFilterToAllHandler = () => changeTodolistFilter('all')
    const changeFilterToActiveHandler = () => changeTodolistFilter('active')
    const changeFilterToCompletedHandler = () => changeTodolistFilter('completed')

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {mappedTasks}
            <div>
                <button onClick={changeFilterToAllHandler}>All</button>
                <button onClick={changeFilterToActiveHandler}>Active</button>
                <button onClick={changeFilterToCompletedHandler}>Completed</button>
            </div>
        </div>
    );
};

