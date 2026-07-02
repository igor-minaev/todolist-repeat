import {appReducer} from "@/app/app-reducer";
import {tasksReducer} from "@/model/tasks-reducer";
import {todolistsReducer} from "@/model/todolists-reducer";
import {combineReducers, configureStore} from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    app: appReducer,
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch