import React, { ChangeEvent, useCallback, useEffect, useState } from "react"
import { useIntl } from 'react-intl'
import { Toast } from 'antd-mobile'
import { getAddress } from '@ethersproject/address'
import { APP_STATE } from "../../config/constants"
import DataItem1 from "./DataItem1"
import DataItem2 from "./DataItem2"
import SelectChain from "./SelectChain"
import Loading from '../components/Loading'
import { transformTime } from "../../utils"
import TicketScore from './TicketScore'
import UpdateInfo from "./UpdateInfo"
import FeedBackUS from "./FeedbackUS"

const { PopupAPI } = require('../../../../api')
const logoPng = require('../../../../assets/img/icon-128.png')
const logoTPng = require('../../../../assets/img/inferer.png')
const searchPng = require('../../../../assets/img/search_white.png')
const ticket_scorePng = require('../../../../assets/img/ticket_score.png')
const ttipPng = require('../../../../assets/img/ttip.png')
const star1Png = require('../../../../assets/img/star1.png')
const star2Png = require('../../../../assets/img/star2.png')
const loading2Png = require('../../../../assets/img/loading2.gif')
const nodataPng = require('../../../../assets/img/nodata.png')

const isAddress = (address: string) => {
  try {
    return getAddress(address)
  } catch (e) {
    return false
  }
}

export const levelInfo = {
  'exceptional': 5.0,
  'very good': 4.0,
  'good': 3.0,
  'fair': 2.0,
  'poor': 1.0
} as any
const Search: React.FC<{
  onChangeState: (appState: number, data: any) => void,
  appState: number
}> = ({
  onChangeState,
  appState
}) => {
    const intl = useIntl()
    const holder = intl.formatMessage({ id: 'Search address identity', defaultMessage: 'Search address identity' })

    const [focus, setFocus] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [address, setAddress] = useState('')
    const [searchList, setSearchList] = useState<{ key: string, data: any }[]>([])
    const [ticketInfo, setTicketInfo] = useState({ level: 0, ticket_id: 0, ticket_level: '' })
    const [isLoading, setIsLoading] = useState(false)
    const [isValidAddress, setIsValidAddress] = useState(true)
    const [noData, setNodata] = useState(false)
    const [collected, setCollected] = useState(false)

    const onSearch = async () => {
      if (!focus && address.length <= 0) {
        setFocus(true)
        return
      }
      if (isAddress(address)) {
        setIsValidAddress(true)
      } else {
        setIsValidAddress(false)
        setShowResult(false)
        return
      }
      if (showResult) {
        setShowResult(false)
      }
      setCollected(false)
      setIsLoading(true)
      const searchRet = await PopupAPI.searchByAddress(address)
      localStorage.setItem('search_address', address)
      console.log(searchRet)
      if (searchRet.status === 200 && searchRet.result) {
        const info = searchRet.result.info || {}
        const infoList = Object.keys(info).map(key => ({ key, data: info[key] }))
        setSearchList(infoList)
        const level = (searchRet.result.level as string).toLocaleLowerCase()
        setTicketInfo({ level: levelInfo[level], ticket_level: searchRet.result.level, ticket_id: searchRet.result.ticket_id })
        setNodata(false)
      } else {
        setNodata(true)
      }
      setShowResult(true)
      setIsLoading(false)

    }

    const collectTicket = useCallback(async () => {
      if (collected) {
        await cancelCollectTicket()
        return
      }
      const collectRes = await PopupAPI.collectTicket({
        collect_address: address,
        chainid: 1,
        ticket_id: ticketInfo.ticket_id,
        ticket_level: ticketInfo.ticket_level
      })
      console.log(collectRes)
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
    }, [address, ticketInfo, collected])

    const cancelCollectTicket = useCallback(async () => {
      const collectRes = await PopupAPI.cancelCollectTicket({
        collect_address: address,
        chainid: 1,
        ticket_id: ticketInfo.ticket_id
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
    }, [address, ticketInfo])
    const checkoutAddress = useCallback(() => {

    }, [address])
    useEffect(() => {
      if (address === '') {
        setIsValidAddress(true)
        setNodata(false)
        setShowResult(false)
        return
      }
      if (address.length > 0) {
        setFocus(true)
      }

    }, [address])

    return (
      <div className={`page-root search-page ${showResult ? 'inferer' : ' '}`}>
        {
          address.length === 0 && <SelectChain />
        }

        <img src={logoPng} className={`img-logo ${focus && address.length > 0 ? 'left-position' : ''}`} alt="" />
        <img src={logoTPng} className={`img-logo2 ${focus && address.length > 0 ? 'left-position' : ''}`} alt="" />

        <div className={`flex justify-center search-wrap  ${focus ? 'bg-image' : ''}  ${focus && address.length > 0 ? 'bg-image left-position' : ''} ${!isValidAddress ? 'valid' : ''}`} >
          <input type="text" className={`outline-none search-input `} placeholder={holder}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value)
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => (address.length === 0 && setFocus(false))}
          />
          <div className={`search-btn flex justify-center items-center hover:opacity-80  ${focus ? 'focus' : ''}`}
            onClick={() => {
              onSearch()
            }}
          >
            <img src={searchPng} className=" w-6 h-6" alt="" />
          </div>
          {
            !isValidAddress && <div className="text-sm font-medium absolute invalid-address">Invalid Address</div>
          }
        </div>


        <div className={`search-loading absolute ${isLoading ? '' : 'hide'}`} style={{ left: 20, top: 212 }}>
          {/* <Loading size={60} /> */}
          <img src={loading2Png} alt="" style={{ width: 320, height: 182 }} />
        </div>
        <div className={`search-result overflow-auto pb-4 ${showResult ? 'show' : ''}`} style={{ height: 402 }}>
          {
            !noData ?
              <>
                <TicketScore
                  ticketInfo={ticketInfo}
                  collectTicket={collectTicket}
                  collected={collected} />
                <UpdateInfo />
                <div className="result-list mt-4">
                  {
                    searchList.map(item => {
                      if (typeof item.data === 'string') {
                        return <DataItem1 key={item.key} itemData={item} />
                      }
                      return <DataItem2 key={item.key} itemData={item} onChangeState={onChangeState} />
                    })
                  }
                </div>
                <FeedBackUS from='search' appState={appState} />
              </> :
              <div className=" flex flex-col justify-center" style={{ marginLeft: 70, marginTop: 70 }}>
                <img src={nodataPng} alt="" style={{ width: 150, height: 150 }} />
                <div className=" text-center font-bold" style={{ color: 'rgba(63, 70, 100, 0.5)', marginTop: 20 }}>No result</div>
              </div>
          }

        </div>
      </div>
    )
  }

export default Search