import {FilterValue, TaskType} from "./App.tsx";
import {Button} from "./components/Button.tsx";

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
                            <Button onClick={removeTaskHandler}>x</Button>
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
                <Button>+</Button>
            </div>
            {
                mappedTasks
            }
            <div>
                <Button onClick={changeAllFilterHandler}>All</Button>
                <Button onClick={changeActiveFilterHandler}>Active</Button>
                <Button onClick={changeCompletedFilterHandler}>Completed</Button>
            </div>
        </div>
    )
        ;
};

