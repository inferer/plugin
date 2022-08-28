import { APP_STATE } from "../config/constants"


export type AppState = {
  appState: number,
  language: string,
  searchnum: number
}

export type RootState = {
  app: AppState
}