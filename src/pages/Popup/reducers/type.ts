import { APP_STATE } from "../config/constants"


export type AppState = {
  appState: number,
  language: string,
  searchnum: number,
  pageStack: number[]
}

export type RootState = {
  app: AppState
}