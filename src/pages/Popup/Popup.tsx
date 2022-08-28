import React from 'react';
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'
// import logo from '../../assets/img/logo.svg';
// import searchPng from '../../assets/img/search.png';
// import searchActivePng from '../../assets/img/search_active.png';
// import ticketPng from '../../assets/img/ticket.png';
// import ticketActivePng from '../../assets/img/ticket_active.png';
// import favPng from '../../assets/img/fav.png';
// import favActivePng from '../../assets/img/fav_active.png';
// import tipPng from '../../assets/img/tip.png';
// import tipActivePng from '../../assets/img/tip_active.png';
// import settingPng from '../../assets/img/setting.png';
// import settingActivePng from '../../assets/img/setting_active.png';

import './Popup.scss';
import { RootState } from './reducers/type';
import { APP_STATE } from './config/constants';
import Home from './pages/home'
import Language from './pages/language'

import enMessages from './translations/en.json'
import zhMessages from './translations/zh.json'

export type PopupProps = {
  appState: number,
  language: string
}

const Popup: React.FC<PopupProps> = (props) => {

  const messages = {
    en: enMessages,
    zh: zhMessages
  } as any

  const { appState, language } = props

  let dom = null

  switch (props.appState) {
    case APP_STATE.SEARCH:
    case APP_STATE.TICKET:
    case APP_STATE.RECOMMEND:
    case APP_STATE.LABELS:
    case APP_STATE.SETTING:
      dom = <Home appState={appState} />
      break;
    case APP_STATE.LANGUAGE:
      dom = <Language language={language} />
      break
  }
  return (
    <IntlProvider locale={props.language || 'en'} messages={messages[props.language]}>
      {dom}
    </IntlProvider>
  )
};


export default connect((state: RootState) => ({
  language: state.app.language,
  appState: state.app.appState
}))(Popup);
