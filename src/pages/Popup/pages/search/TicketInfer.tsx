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
const loading2Png = require('../../../../assets/img/loading2.gif')
const nodataPng = require('../../../../assets/img/nodata.png')
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
          const searchRet = await PopupAPI.searchByAddress(recommendData.address)
          console.log(searchRet)
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
    }, [recommendData.address])
    const collectTicket = useCallback(async () => {
      if (collected) {
        await cancelCollectTicket()
        return
      }
      const collectRes = await PopupAPI.collectTicket({
        collect_address: recommendData.address || newTicketInfo.address,
        chainid: 1,
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
    }, [recommendData.address, newTicketInfo, collected])
    const cancelCollectTicket = useCallback(async () => {
      const collectRes = await PopupAPI.cancelCollectTicket({
        collect_address: recommendData.address || newTicketInfo.address,
        chainid: 1,
        ticket_id: newTicketInfo.ticket_id
      })
      console.log(collectRes)
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
    }, [recommendData.address, newTicketInfo])
    return (
      <div className='page-root search-page inferer'>
        <PageHeader title={'INFERER'} onBack={() => {
          if (toTxInfer === 'collection') {
            localStorage.setItem('ticketinfer_from', 'ticketinfer')
          } else {
            localStorage.setItem('ticketinfer_from', '')
          }

          PopupAPI.changeState(toTxInfer === 'collection' ? APP_STATE.COLLECTION : APP_STATE.TICKET)
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
              <div className=" text-center font-bold" style={{ color: 'rgba(63, 70, 100, 0.5)', marginTop: 20 }}>No result</div>
            </div>)
        }

      </div>
    )
  }

export default TicketInfer