import { createAction, createSlice, createReducer } from '@reduxjs/toolkit'
import { APP_STATE } from '../config/constants'
import { AppState } from './type'

const initialState: AppState = {
  appState: APP_STATE.HOME,
  language: 'en',
  searchnum: 20,
  pageStack: [0],
  address: ''
}

export const setAppState = createAction('setAppState')
export const setLanguage = createAction('setLanguage')
export const setSearchNum = createAction('setSearchNum')
export const setAddress = createAction('setAddress')
export const setPageStack = createAction('setPagesStack')

export const appReucer = createReducer(initialState, (builder) => {

  builder.addCase(setAppState, (state, { payload }: any) => {
    state.appState = payload

    switch (state.appState) {
      case APP_STATE.SEARCH:
      case APP_STATE.TICKET:
      case APP_STATE.RECOMMEND:
      case APP_STATE.LABELS:
      case APP_STATE.SETTING:
        state.pageStack = [APP_STATE.HOME]
        break
      default:
        if (payload !== state.pageStack[state.pageStack.length - 1]) {
          state.pageStack = [payload, ...state.pageStack]
        } else {
          state.pageStack = state.pageStack.splice(0, state.pageStack.length - 1)
        }

    }
    console.log(state.pageStack)

  })
  builder.addCase(setLanguage, (state, { payload }: any) => {
    state.language = payload
  })
  builder.addCase(setSearchNum, (state, { payload }: any) => {
    state.searchnum = payload
  })
  builder.addCase(setAddress, (state, { payload }: any) => {
    state.address = payload
  })
})

export default appReucer