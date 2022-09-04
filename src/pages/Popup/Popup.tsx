import React, { useState } from 'react';
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
import SetSearch from './pages/setsearch'
import Wallet from './pages/wallet'
import FeedBack from './pages/feedback'
import Collection from './pages/collection'
import TxInfo from './pages/txinfo'

import enMessages from './translations/en.json'
import zhMessages from './translations/zh.json'
import TicketInfer from './pages/search/TicketInfer';

const { PopupAPI } = require('../../api')

export type PopupProps = {
  appState: number,
  language: string,
  searchNum: number,
  pageStack: number[],
  address: string,
}

const Popup: React.FC<PopupProps> = (props) => {
  const messages = {
    en: enMessages,
    zh: zhMessages
  } as any

  const { appState, language, searchNum, pageStack, address } = props
  const [pagesStack, setPageStack] = useState([])
  const [txinfoData, setTxinfoData] = useState<any>({ key: '', data: {} })
  const [ticketInfo, setTicketInfo] = useState<any>({ level: 1, searchList: [] })
  let dom = null
  switch (props.appState) {
    case APP_STATE.SEARCH:
    case APP_STATE.TICKET:
    case APP_STATE.RECOMMEND:
    case APP_STATE.LABELS:
    case APP_STATE.SETTING:
      // dom = <Home appState={appState} />
      // setPageStack([...pagesStack, APP_STATE.HOME])
      break;
    case APP_STATE.LANGUAGE:
      // dom = <Language language={language} />
      break
    case APP_STATE.SETSEARCH:
      // dom = <SetSearch searchNum={searchNum} />
      break
    case APP_STATE.WALLET:
      // dom = <Wallet searchNum={searchNum} />
      break
    case APP_STATE.FEEDBACK:
      // dom = <FeedBack searchNum={searchNum} />
      break
    case APP_STATE.COLLECTION:
      // dom = <Collection searchNum={searchNum} />
      break
    case APP_STATE.TXINFO:
      // dom = <TxInfo language={language} />
      break
  }
  const onChangeState = (appState: number, data: any) => {
    setTxinfoData(data)
    PopupAPI.changeState(appState)
  }
  const onTicketChangeState = (appState: number, searchRet: any) => {
    let infoList: { key: string; data: any; }[] = []
    if (searchRet.result) {
      const info = searchRet.result.info || {}
      infoList = Object.keys(info).map(key => ({ key, data: info[key] }))
    }
    setTicketInfo({ level: searchRet.level, searchList: infoList })
    PopupAPI.changeState(appState)
  }
  return (
    <IntlProvider locale={props.language || 'en'} messages={messages[props.language]}>
      <>
        <div className={`pop-root-page ${pageStack[0] === APP_STATE.HOME ? 'pop-root-page-in' : 'pop-root-page-out'}`}>
          <Home appState={appState} onChangeState={onChangeState} onTicketChangeState={onTicketChangeState} />
        </div>
        <div className={`pop-root-page ${pageStack[0] === APP_STATE.LANGUAGE ? 'pop-root-page-in' : 'pop-root-page-right'}`}>
          <Language language={language} />
        </div>
        <div className={`pop-root-page ${pageStack[0] === APP_STATE.SETSEARCH ? 'pop-root-page-in' : 'pop-root-page-right'}`}>
          <SetSearch searchNum={searchNum} />
        </div>
        <div className={`pop-root-page ${pageStack[0] === APP_STATE.WALLET ? 'pop-root-page-in' : 'pop-root-page-right'}`}>
          <Wallet searchNum={searchNum} address={address} />
        </div>
        <div className={`pop-root-page ${pageStack[0] === APP_STATE.FEEDBACK ? 'pop-root-page-in' : 'pop-root-page-right'}`}>
          <FeedBack searchNum={searchNum} />
        </div>
        <div className={`pop-root-page ${pageStack[0] === APP_STATE.COLLECTION ? 'pop-root-page-in' : 'pop-root-page-right'}`}>
          <Collection appState={appState} searchNum={searchNum} />
        </div>
        <div className={`pop-root-page ${pageStack[0] === APP_STATE.TXINFO ? 'pop-root-page-in' : 'pop-root-page-right'}`}>
          <TxInfo language={language} txinfoData={txinfoData} />
        </div>
        <div className={`pop-root-page ${pageStack[0] === APP_STATE.TICKETINFER ? 'pop-root-page-in' : 'pop-root-page-right'}`}>
          <TicketInfer
            onChangeState={onChangeState}
            ticketInfo={{
              level: ticketInfo.level
            }}
            searchList={ticketInfo.searchList ?? []} />
        </div>
      </>
    </IntlProvider>
  )
};


export default connect((state: RootState) => ({
  language: state.app.language,
  appState: state.app.appState,
  searchNum: state.app.searchnum,
  pageStack: state.app.pageStack,
  address: state.app.address
}))(Popup);
