import { Toast } from 'antd-mobile'
import React, { useCallback, useEffect, useState } from 'react'
import { getUrlParams, levelInfo } from '.'
import { APP_STATE } from '../../config/constants'
import Loading from '../components/Loading'
import PageHeader from '../components/PageHeader'
import DataItem1 from './DataItem1'
import DataItem2 from './DataItem2'
import FeedBackUS from './FeedbackUS'
import TicketScore from './TicketScore'
import UpdateInfo from './UpdateInfo'

const logoTPng = require('../../../../assets/img/inferer.png')
const loading2Png = require('../../../../assets/img/loading2.gif')
const nodataPng = require('../../../../assets/img/nodata.png')
const { PopupAPI } = require('../../../../api')

const TicketInfer: React.FC<{
  appState: number,
  toTxInfer: string,
  ticketInfo: { level: any, ticket_level: any, address: any },
  searchList: any[],
  recommendData: any,
  onChangeState: (appState: number, data: any) => void
}> = ({
  appState,
  toTxInfer,
  ticketInfo,
  searchList,
  recommendData,
  onChangeState
}) => {
    const [newTicketInfo, setNewTicketInfo] = useState<any>({ level: 0, ticket_id: '', ticket_level: '' })
    const [newSearchList, setNewSearchList] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [noData, setNodata] = useState(false)
    const [collected, setCollected] = useState(false)

    useEffect(() => {
      const fetch = async () => {
        if (!recommendData.address) {
          setCollected(false)
          setNodata(false)
          setShowResult(true)
          setNewTicketInfo(ticketInfo)
          setNewSearchList(searchList)
        }
      }
      fetch()

    }, [ticketInfo, searchList, recommendData])
    useEffect(() => {
      const fetch = async () => {
        if (recommendData.address) {
          setCollected(false)
          setIsLoading(true)
          setShowResult(false)
          setNodata(false)

          const searchRet = await PopupAPI.searchByAddress({ address: recommendData.address, chainid: recommendData.chainid })
          if (searchRet.status === 200 && searchRet.result) {
            const info = searchRet.result.info || {}
            const infoList = Object.keys(info).map(key => ({ key, data: info[key] }))
            setNewSearchList(infoList)
            const level = (searchRet.result.level as string).toLocaleLowerCase()
            setNewTicketInfo({ level: levelInfo[level], ticket_level: searchRet.result.level, ticket_id: searchRet.result.ticket_id })
            setShowResult(true)
            setNodata(false)
          } else {
            // Toast.show(searchRet.message)
            setNodata(true)
            setShowResult(true)
          }
          setIsLoading(false)
        }
      }
      fetch()
    }, [recommendData])
    const collectTicket = useCallback(async () => {
      if (collected) {
        await cancelCollectTicket()
        return
      }
      const collectRes = await PopupAPI.collectTicket({
        collect_address: recommendData.address || newTicketInfo.address,
        chainid: recommendData.chainid || 1,
        ticket_id: newTicketInfo.ticket_id,
        ticket_level: newTicketInfo.ticket_level
      })
      if (collectRes.status === 200) {
        setCollected(true)
        Toast.show({
          content: 'Collected',
          position: 'bottom'
        })
      } else {
        Toast.show({
          content: 'Error',
          position: 'bottom'
        })
      }
    }, [recommendData, newTicketInfo, collected])
    const cancelCollectTicket = useCallback(async () => {
      const collectRes = await PopupAPI.cancelCollectTicket({
        collect_address: recommendData.address || newTicketInfo.address,
        chainid: recommendData.chainid || 1,
        ticket_id: newTicketInfo.ticket_id
      })
      if (collectRes.status === 200) {
        setCollected(false)
        Toast.show({
          content: 'Canceled',
          position: 'bottom'
        })
      } else {
        Toast.show({
          content: 'Error',
          position: 'bottom'
        })
      }
    }, [recommendData, newTicketInfo])

    const [showBack, setShowBack] = useState(true)

    useEffect(() => {
      const params = getUrlParams(window.location.href)
      const hideTitle = localStorage.getItem('hide-page-title')
      if (params.from === 'reddit' && hideTitle === 'true' && appState === APP_STATE.TICKETINFER) {
        setShowBack(false)
      }
    }, [getUrlParams, appState])

    return (
      <div className='page-root search-page inferer'>
        <PageHeader showBack={showBack} title={'INFERER'} onBack={() => {
          if (toTxInfer === 'collection') {
            localStorage.setItem('ticketinfer_from', 'ticketinfer')
          } else if (toTxInfer === 'AnalysisOne') {
            localStorage.setItem('ticketinfer_from', 'AnalysisOne')
          } else {
            localStorage.setItem('ticketinfer_from', '')
          }
          let backPage = APP_STATE.TICKET
          if (toTxInfer === 'Labels') {
            backPage = APP_STATE.LABELS
          }
          if (toTxInfer === 'Recommend') {
            backPage = APP_STATE.RECOMMEND
          }
          if (toTxInfer === 'collection') {
            backPage = APP_STATE.COLLECTION
          }
          if (toTxInfer === 'AnalysisOne') {
            backPage = APP_STATE.ANALYSISONE_TREND
          }
          if (toTxInfer === 'TopAccount') {
            backPage = APP_STATE.TOPACCOUNT_TREND
          }
          if (toTxInfer === 'TopProfit') {
            backPage = APP_STATE.TOPPROFIT_TREND
          }
          if (toTxInfer === 'ActiveAccount') {
            backPage = APP_STATE.ACTIVEACCOUNT_TREND
          }
          // PopupAPI.changeState(toTxInfer === 'collection' ? APP_STATE.COLLECTION : APP_STATE.TICKET)
          PopupAPI.changeState(backPage)
        }} />
        <div className={`search-loading absolute ${isLoading ? '' : 'hide'}`} style={{ left: 20, top: 212 }}>
          <img src={loading2Png} alt="" style={{ width: 320, height: 182 }} />
        </div>
        {
          showResult && (!noData ?
            <div className={`search-result overflow-auto pb-4 show`} style={{ height: 520, top: 78 }}>
              <TicketScore ticketInfo={newTicketInfo} collectTicket={collectTicket} collected={collected} />
              <UpdateInfo />
              <div className="result-list mt-4">
                {
                  newSearchList.map((item: any, key: number) => {
                    if (typeof item.data === 'string') {
                      return <DataItem1 key={key} itemData={item} />
                    }
                    return <DataItem2 key={key} itemData={item} onChangeState={onChangeState} />
                  })
                }
              </div>
              <FeedBackUS />
            </div> :
            <div className=" flex flex-col justify-center items-center" style={{ marginTop: 70 }}>
              <img src={nodataPng} alt="" style={{ width: 150, height: 150 }} />
              <div className=" text-center" style={{ color: 'rgba(63, 70, 100, 0.3)', marginTop: 10 }}>No result yet, or maybe</div>
              <div className=" text-center" style={{ color: 'rgba(63, 70, 100, 0.3)' }}>it’s a contract</div>
            </div>)
        }

      </div>
    )
  }

export default TicketInfer