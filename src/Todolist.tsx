import {FilterValue, TaskType} from "./App.tsx";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValue) => void
}
export const Todolist = ({title, tasks, removeTask, changeFilter}: TodolistPropsType) => {

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
                }
            )
            }
        </ul>
        : <p>Your tasklist is empty!</p>

    const changeAllFilterHandler = () => changeFilter('all')
    const changeActiveFilterHandler = () => changeFilter('active')
    const changeCompletedFilterHandler = () => changeFilter('completed')

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {
                mappedTasks
            }
            <div>
                <button onClick={changeAllFilterHandler}>All</button>
                <button onClick={changeActiveFilterHandler}>Active</button>
                <button onClick={changeCompletedFilterHandler}>Completed</button>
            </div>
        </div>
    )
        ;
};

