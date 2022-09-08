import { Toast } from 'antd-mobile'
import React, { useCallback, useEffect, useState } from 'react'
import { levelInfo } from '.'
import { APP_STATE } from '../../config/constants'
import Loading from '../components/Loading'
import PageHeader from '../components/PageHeader'
import DataItem1 from './DataItem1'
import DataItem2 from './DataItem2'
import FeedBackUS from './FeedbackUS'
import TicketScore from './TicketScore'
import UpdateInfo from './UpdateInfo'

const logoTPng = require('../../../../assets/img/inferer.png')
const { PopupAPI } = require('../../../../api')

const TicketInfer: React.FC<{
  toTxInfer: string,
  ticketInfo: { level: any, ticket_level: any, address: any },
  searchList: any[],
  recommendData: any,
  onChangeState: (appState: number, data: any) => void
}> = ({
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
    useEffect(() => {
      const fetch = async () => {
        if (!recommendData.address) {
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
          setIsLoading(true)
          setShowResult(false)
          const searchRet = await PopupAPI.searchByAddress(recommendData.address)
          if (searchRet.status === 200 && searchRet.result) {
            const info = searchRet.result.info || {}
            const infoList = Object.keys(info).map(key => ({ key, data: info[key] }))
            setNewSearchList(infoList)
            const level = (searchRet.result.level as string).toLocaleLowerCase()
            setNewTicketInfo({ level: levelInfo[level], ticket_level: searchRet.result.level, ticket_id: searchRet.result.ticket_id })
            setShowResult(true)
          } else {
            Toast.show(searchRet.message)
          }
          setIsLoading(false)
        }
      }
      fetch()
    }, [recommendData.address])
    const collectTicket = useCallback(async () => {
      const collectRes = await PopupAPI.collectTicket({
        collect_address: recommendData.address || newTicketInfo.address,
        chainid: 1,
        ticket_id: newTicketInfo.ticket_id,
        ticket_level: newTicketInfo.ticket_level
      })
      if (collectRes.status === 200) {
        Toast.show('Success')
      } else {
        Toast.show('Error')
      }
    }, [recommendData.address, newTicketInfo])

    return (
      <div className='page-root search-page inferer'>
        <PageHeader title={'INFERER'} onBack={() => PopupAPI.changeState(toTxInfer === 'collection' ? APP_STATE.COLLECTION : APP_STATE.TICKET)} />
        <div className={`search-loading absolute ${isLoading ? '' : 'hide'}`} style={{ left: 160 }}>
          <Loading size={40} />
        </div>
        {
          showResult &&
          <div className={`search-result overflow-auto pb-4 show`} style={{ height: 520, top: 78 }}>
            <TicketScore ticketInfo={newTicketInfo} collectTicket={collectTicket} />
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
          </div>
        }

      </div>
    )
  }

export default TicketInfer