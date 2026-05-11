import {Button} from "./Button.tsx";
import {TaskType} from "../types/task.ts";
import {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from '@mui/material/IconButton';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import {getListItemSx} from "../styles/Todolist.styles.ts";

type TaskPropsType = TaskType & {
    deleteTask: () => void
    changeTaskStatus: (isDone: boolean) => void
    changeTitle: (title: string) => void
}


export const Task = ({id, title, isDone, deleteTask, changeTaskStatus, changeTitle}: TaskPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(e.currentTarget.checked)
    }

    return (
        <ListItem disablePadding sx={{p: 0, justifyContent: 'space-between'}}>
            <Box sx={{display:'flex',alignItems:'center'}}>
                <Checkbox checked={isDone} onChange={onChangeHandler} color="secondary" size='small'/>
                <Box sx={getListItemSx(isDone)}>
                    <EditableSpan value={title} changeTitle={changeTitle}/>
                </Box>
            </Box>
            <IconButton color='secondary' onClick={deleteTask}>
                <DeleteSweepIcon/>
            </IconButton>
        </ListItem>
    );
};

