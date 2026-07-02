import type {ThemeMode} from "@/app/app-reducer";
import type {RootState} from "@/app/store";

export const selectApp = (state: RootState): ThemeMode => state.app.themeMode