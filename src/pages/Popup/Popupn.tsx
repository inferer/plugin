import React, { useEffect, useState } from 'react';
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
import TrendAnalysis from './pages/trends/Analysis';
import PriceCollTrend from './pages/trends/PriceColl';
import PopularCollTrend from './pages/trends/PopularColl';
import PriceOneTrend from './pages/trends/PriceOne';
import PopularOneTrend from './pages/trends/PopularOne';
import TrendAnalysisOne from './pages/trends/AnalysisOne';
import TopAccountTrend from './pages/trends/TopAccount';
import ActiveAccountTrend from './pages/trends/ActiveAccount';
import TopProfitTrend from './pages/trends/TopProfit';
import Tickets from './pages/tickets';
import { getUrlParams } from './pages/search';

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
  const [ticketInfo, setTicketInfo] = useState<any>({ level: 1, searchList: [], ticket_level: '' })
  const [recommendData, setRecommendData] = useState<any>({})
  const [toTxInfo, setToTxInfo] = useState('')
  const [toTxInfer, setToTxInfer] = useState('')

  const onChangeState = (appState: number, data: any) => {

    setTxinfoData(data)
    if (appState === APP_STATE.TXINFO) {
      setToTxInfo('searchpage')
    }
    PopupAPI.changeState(appState)
  }
  const onChangeState2 = (appState: number, data: any) => {
    setTxinfoData(data)
    setToTxInfo('Tickets')
    PopupAPI.changeState(appState)
  }
  const onTicketChangeState = (appState: number, searchRet: any) => {
    let infoList: { key: string; data: any; }[] = []
    if (searchRet.result) {
      const info = searchRet.result.info || {}
      infoList = Object.keys(info).map(key => ({ key, data: info[key] }))
    }

    setTicketInfo({ level: searchRet.level, searchList: infoList, ticket_level: searchRet.result.level, search_address: searchRet.search_address })
    setRecommendData({})
    setToTxInfo('')
    setToTxInfer('')
    PopupAPI.changeState(appState)
  }
  const onClickRecommend = (data: any) => {
    localStorage.setItem('search_address', data.address)
    setTicketInfo({ level: 0, searchList: [], ticket_level: '' })
    setRecommendData(data)
    setToTxInfo('')
    setToTxInfer('Recommend')
    PopupAPI.changeState(APP_STATE.TICKETINFER)
  }
  const onClickLabels = (data: any) => {
    localStorage.setItem('search_address', data.address)
    setTicketInfo({ level: 0, searchList: [], ticket_level: '' })
    setRecommendData(data)
    setToTxInfo('')
    setToTxInfer('Labels')
    PopupAPI.changeState(APP_STATE.TICKETINFER)
  }
  const onCollectionClick = (data: any) => {
    setToTxInfer('collection')
    setRecommendData({ ...data, address: data.collect_address })
    PopupAPI.changeState(APP_STATE.TICKETINFER)
  }

  const onAnalysisOneClick = (data: any) => {
    setToTxInfer('AnalysisOne')
    setRecommendData({ ...data })
    PopupAPI.changeState(APP_STATE.TICKETINFER)
  }

  const onTopAccountClick = (data: any) => {
    setToTxInfer('TopAccount')
    setRecommendData({ ...data })
    PopupAPI.changeState(APP_STATE.TICKETINFER)
  }

  const onTopProfitClick = (data: any) => {
    setToTxInfer('TopProfit')
    setRecommendData({ ...data })
    PopupAPI.changeState(APP_STATE.TICKETINFER)
  }

  const onActiveAccountClick = (data: any) => {
    setToTxInfer('ActiveAccount')
    setRecommendData({ ...data })
    PopupAPI.changeState(APP_STATE.TICKETINFER)
  }
  const [ticketAni, setTicketAni] = useState(false)
  useEffect(() => {
    const params = getUrlParams(window.location.href)

    if (params.from === 'reddit') {
      localStorage.setItem('hide-page-title', 'true')
      if (Number(params.to) === APP_STATE.PRICEONE_TREND || Number(params.to) === APP_STATE.POPULARONE_TREND) {
        setTicketAni(true)
        PopupAPI.execApiTrends({
          action: 'get_analysis_item'
        }).then((res: any) => {
          localStorage.setItem('page-from', params.to)
          localStorage.setItem('analysis_item', JSON.stringify({ ...res }))
          PopupAPI.changeState(APP_STATE.ANALYSISONE_TREND)
        })
      }
      if (Number(params.to) === APP_STATE.PRICECOLL_TREND || Number(params.to) === APP_STATE.POPULARCOLL_TREND) {
        setTicketAni(true)

        PopupAPI.execApiTrends({
          action: 'get_analysis_item'
        }).then((res: any) => {
          localStorage.setItem('page-from', params.to)
          localStorage.setItem('hide-page-title', 'true')
          localStorage.setItem('analysis_item', JSON.stringify({ ...res }))
          PopupAPI.changeState(APP_STATE.ANALYSIS_TREND)
        })
      }
      if (Number(params.to) === APP_STATE.TOPACCOUNT_TREND) {
        PopupAPI.execApiTrends({
          action: 'get_analysis_item'
        }).then((res: any) => {
          localStorage.setItem('page-from', params.to)
          onTopAccountClick({ address: res })
        })
      }
      if (Number(params.to) === APP_STATE.ACTIVEACCOUNT_TREND) {
        PopupAPI.execApiTrends({
          action: 'get_analysis_item'
        }).then((res: any) => {
          localStorage.setItem('page-from', params.to)
          onActiveAccountClick({ address: res })
        })
      }
      if (Number(params.to) === APP_STATE.TOPPROFIT_TREND) {
        PopupAPI.execApiTrends({
          action: 'get_analysis_item'
        }).then((res: any) => {
          localStorage.setItem('page-from', params.to)
          onTopProfitClick({ address: res })
        })
      }
    }
  }, [getUrlParams])

  return (
    <IntlProvider locale={props.language || 'en'} messages={messages[props.language]}>
      <div className='popupn-root'>
        <div className={`pop-root-page popupn-page ${pageStack[0] === APP_STATE.ANALYSIS_TREND ? 'pop-root-page-in' : 'pop-root-page-right'}`}>
          <TrendAnalysis searchNum={searchNum} address={address} appState={appState} pageStack={pageStack} />
        </div>
        <div className={`pop-root-page popupn-page
          ${pageStack[0] === APP_STATE.ANALYSISONE_TREND ||
            pageStack[0] === APP_STATE.TICKETINFER ? 'pop-root-page-in' : 'pop-root-page-right'}`}>
          <TrendAnalysisOne searchNum={searchNum} address={address} appState={appState} pageStack={pageStack}
            goToTicket={onAnalysisOneClick}
          />
        </div>

        <div className={`pop-root-page ${pageStack[0] === APP_STATE.FEEDBACK ? 'pop-root-page-in' : 'pop-root-page-right'}`}
          style={{ zIndex: 999, background: '#ffffff', opacity: 1 }}
        >
          <FeedBack searchNum={searchNum} address={address} appState={appState} pageStack={pageStack} />
        </div>
        <div className={`pop-root-page 
          ${pageStack[0] === APP_STATE.TICKET ||
            pageStack[0] === APP_STATE.TICKETINFER ? 'pop-root-page-in' : 'pop-root-page-right'}`}>
          <Tickets appState={appState} onChangeState={onTicketChangeState} toSearch={() => {
            localStorage.setItem("from", "tickets")
            PopupAPI.changeState(APP_STATE.SEARCH)
          }
          } />
        </div>
        <div className={`pop-root-page ${pageStack[0] === APP_STATE.COLLECTION || pageStack[0] === APP_STATE.TICKETINFER ? 'pop-root-page-in' : 'pop-root-page-right'}`}>
          <Collection appState={appState} searchNum={searchNum}
            onClick={onCollectionClick}
          />
        </div>
        <div className={`pop-root-page ${pageStack[0] === APP_STATE.TXINFO ? 'pop-root-page-in' : 'pop-root-page-right'} ${txinfoData.key === 'Inferer Label' ? 'bglabel' : 'bgtxinfo'}`}
          style={{ zIndex: 999, opacity: 1 }}
        >
          <TxInfo language={language} txinfoData={txinfoData} toTxInfo={toTxInfo} />
        </div>
        <div className={`pop-root-page ${ticketAni ? '' : ' popupn-page'} ${pageStack[0] === APP_STATE.TICKETINFER || pageStack[0] === APP_STATE.TXINFO || pageStack[0] === APP_STATE.FEEDBACK ? 'pop-root-page-in' : 'pop-root-page-right'}`}
          style={{ zIndex: 900, background: '#ffffff', opacity: 1 }}
        >
          <TicketInfer
            appState={appState}
            toTxInfer={toTxInfer}
            onChangeState={onChangeState2}
            recommendData={recommendData}
            ticketInfo={{
              level: ticketInfo.level,
              ticket_level: ticketInfo.ticket_level,
              address: ticketInfo.search_address
            }}
            searchList={ticketInfo.searchList ?? []} />
        </div>
      </div>
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


