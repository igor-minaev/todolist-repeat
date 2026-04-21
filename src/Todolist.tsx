import {FilterType, TaskType} from "./App.tsx";
import {Button} from "./components/Button.tsx";

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
                        <Button name='x' onClick={removeTaskHandler}/>
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
                <Button name='+'/>
            </div>
            {mappedTasks}
            <div>
                <Button name='All' onClick={changeFilterToAllHandler}/>
                <Button name='Active' onClick={changeFilterToActiveHandler}/>
                <Button name='Completed' onClick={changeFilterToCompletedHandler}/>
            </div>
        </div>
    );
};

