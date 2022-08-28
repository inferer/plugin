import { APP_STATE } from "../config/constants"


export type AppState = {
  appState: number,
  language: string
}

export type RootState = {
  app: AppState
}