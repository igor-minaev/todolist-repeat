import {SxProps} from "@mui/material";

export const containerSX: SxProps = {
    display: 'flex',
    justifyContent: 'space-between'
}

export const getListItemSx = (isDone: boolean): SxProps => ({
    fontStyle: isDone ? 'italic' : 'normal',
    fontWeight: isDone ? 'bold' : 'normal',
    textDecoration: isDone ? 'line-through' : 'none',
    opacity: isDone ? 0.5 : 1
})