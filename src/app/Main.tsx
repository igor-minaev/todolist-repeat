import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {CreateItemForm} from "@/CreateItemForm";
import Paper from "@mui/material/Paper";
import type {FilterValues} from "@/app/App";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {selectTodolists} from "@/model/todolists-selectors";
import {selectTasks} from "@/model/tasks-selectors";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "@/model/tasks-reducer";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from "@/model/todolists-reducer";
import {type TaskType, Todolist} from "@/Todolist";

export const Main = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }
    const createTask = (todolistId: string, title: string) => {
        dispatch(createTaskAC({todolistId, title}))
    }
    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId: id, isDone}))
    }
    const changeTaskTitle = (todolistId: string, id: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId: id, title}))
    }

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))

    }
    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}))
    }
    const changeTodolistFilter = (todolistId: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter}))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, title}))
    }

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
    return (
        <Container maxWidth='lg'>
            <Grid container sx={{mb: '30px'}}>
                <CreateItemForm createItem={createTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                {todolists.length === 0
                    ? <p>Create new todolist!</p>
                    : todolists.map(todolist => {
                        return (
                            <Grid key={todolist.id}>
                                <Paper elevation={5} sx={{p: '15px'}}>
                                    <Todolist
                                        id={todolist.id}
                                        title={todolist.title}
                                        filter={todolist.filter}
                                        tasks={getFilteredTasks(tasks[todolist.id], todolist.filter)}
                                        deleteTask={deleteTask}
                                        changeTodolistFilter={changeTodolistFilter}
                                        createTask={createTask}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        deleteTodolist={deleteTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
            </Grid>
        </Container>
    );
};

