import List from "@mui/material/List";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "./model/tasks-reducer";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import {getListItemSX} from "@/Todolist.styles";
import type {ChangeEvent} from "react";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {selectTasks} from "@/model/tasks-selectors";
import type {FilterValues, Todolist} from "@/app/App";
import type {TaskType} from "@/TodolistItem";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";

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

    const dispatch = useAppDispatch()

    return (
        <>
            {filteredTasks.length === 0
                ? <p>Your tasks list is empty!</p>
                : <List>
                    {filteredTasks.map(task => {
                            const deleteTaskHandler = () => dispatch(deleteTaskAC({todolistId: id, taskId: task.id}))

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC({
                                todolistId: id,
                                taskId: task.id,
                                isDone: e.currentTarget.checked
                            }))
                            const changeTaskTitleHandler = (title: string) => dispatch(changeTaskTitleAC({
                                todolistId: id,
                                taskId: task.id,
                                title
                            }))
                            return (
                                <ListItem key={task.id} sx={getListItemSX(task.isDone)}>
                                    <div>
                                        <Checkbox size='small' color="secondary" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                        <EditableSpan className={task.isDone ? 'taskDone' : 'task'} value={task.title} onChange={changeTaskTitleHandler}/>
                                    </div>
                                    <IconButton color="secondary" onClick={deleteTaskHandler}>
                                        <DeleteForeverIcon/>
                                    </IconButton>
                                </ListItem>
                            )
                        }
                    )
                    }
                </List>}
        </>
    )
}