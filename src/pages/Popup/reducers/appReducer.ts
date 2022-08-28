import { createAction, createSlice, createReducer } from '@reduxjs/toolkit'
import { APP_STATE } from '../config/constants'
import { AppState } from './type'

const initialState: AppState = {
  appState: APP_STATE.HOME,
  language: 'en',
  searchnum: 20
}

export const setAppState = createAction('setAppState')
export const setLanguage = createAction('setLanguage')
export const setSearchNum = createAction('setSearchNum')

export const appReucer = createReducer(initialState, (builder) => {

  builder.addCase(setAppState, (state, { payload }: any) => {
    console.log(payload)
    state.appState = payload
  })
  builder.addCase(setLanguage, (state, { payload }: any) => {
    state.language = payload
  })
  builder.addCase(setSearchNum, (state, { payload }: any) => {
    state.searchnum = payload
  })
})

export default appReucer