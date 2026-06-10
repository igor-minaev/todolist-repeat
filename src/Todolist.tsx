export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
}

export const Todolist = ({title, tasks}: TodolistPropsType) => {

    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(task => {
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button>x</button>
                    </li>
                )
            })}
        </ul>
        : <p>Your tasks list is empty!</p>


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <button>x</button>
            </div>
            {mappedTasks}
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
