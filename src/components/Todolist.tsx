import {FilterType, TaskType} from "../types/task.ts";
import {Button} from "./Button.tsx";
import {Task} from "./Task.tsx";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterType) => void
}
export const Todolist = ({title, tasks, deleteTask, changeFilter}: TodolistPropsType) => {

    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(t => (
                <Task key={t.id} {...t} deleteTask={deleteTask}/>
            ))}
        </ul>
        : <p>You don't create any task</p>
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button>+</Button>
            </div>
            {mappedTasks}
            <div>
                <Button onClick={() => changeFilter('all')}>All</Button>
                <Button onClick={() => changeFilter('active')}> Active </Button>
                <Button onClick={() => changeFilter('completed')}>Completed</Button>
            </div>
        </div>
    );
};

