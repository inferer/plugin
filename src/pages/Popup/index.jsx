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
  setAppState, setLanguage
} from './reducers/appReducer'

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
    const [
      appState,
      language
    ] = await Promise.all([
      PopupAPI.requestState(),
      PopupAPI.getLanguage()
    ])

    this.store.dispatch(setAppState(appState))
    this.store.dispatch(setLanguage(language))
  },
  bindDuplexRequests() {
    this.duplex.on('setLanguage', language => this.store.dispatch(
      setLanguage(language)
    ))
    this.duplex.on('setState', appState => this.store.dispatch(
      setAppState(appState)
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
