import List from "@mui/material/List";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {selectTasks} from "@/model/tasks-selectors";
import type {FilterValues, Todolist} from "@/app/App";
import type {TaskType} from "@/TodolistItem";
import {TaskItem} from "@/TaskItem";

type Props = {
    todolist: Todolist
}

export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist

    const tasks = useAppSelector(selectTasks)

    const getFilteredTasks = (tasks: TaskType[], filter: FilterValues): TaskType[] => {
        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }
    const filteredTasks = getFilteredTasks(tasks[id], filter)

    return (
        <>
            {filteredTasks.length === 0
                ? <p>Your tasks list is empty!</p>
                : <List>
                    {filteredTasks.map(task => {
                            return (
                                <TaskItem key={task.id} task={task} todolistId={id}/>
                            )
                        }
                    )
                    }
                </List>}
        </>
    )
}