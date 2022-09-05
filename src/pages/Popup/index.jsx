import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers'
import { PopupAPI } from '../../api';
import Popup from './Popup'
import './tailwind.min.css'
import MessageDuplex from '../../MessageDuplex'

import {
  setAddress,
  setAppState, setLanguage, setSearchNum
} from './reducers/appReducer'
import { APP_STATE } from './config/constants'

export const app = {
  duplex: new MessageDuplex.Popup(),
  async run() {
    this.createStore()
    await this.getAppState()
    this.bindDuplexRequests()
    this.render()
  },
  createStore() {
    this.store = configureStore({
      reducer
    })
  },
  async getAppState() {
    PopupAPI.init(this.duplex)
    await PopupAPI.initData()
    const [
      appState,
      language,
      searchnum,
      address,
    ] = await Promise.all([
      PopupAPI.requestState(),
      PopupAPI.getLanguage(),
      PopupAPI.getSearchNum(),
      PopupAPI.getAddress(),
    ])

    this.store.dispatch(setAppState(APP_STATE.SEARCH))
    this.store.dispatch(setLanguage(language))
    this.store.dispatch(setSearchNum(searchnum))
    this.store.dispatch(setAddress(address))
  },
  bindDuplexRequests() {
    this.duplex.on('setLanguage', language => this.store.dispatch(
      setLanguage(language)
    ))
    this.duplex.on('setState', appState => this.store.dispatch(
      setAppState(appState)
    ))
    this.duplex.on('setSearchNum', num => this.store.dispatch(
      setSearchNum(num)
    ))
    this.duplex.on('setAddress', address => this.store.dispatch(
      setAddress(address)
    ))
  },

  render() {
    render(
      <Provider store={this.store}>
        <Popup />
      </Provider>,
      window.document.querySelector('#app-container')
    )
    if (module.hot) module.hot.accept()
  }
}
app.run()
