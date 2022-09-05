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
  onChangeState: (appState: number, data: any) => void
}> = ({
  onChangeState
}) => {
    const intl = useIntl()
    const holder = intl.formatMessage({ id: 'Search address identity', defaultMessage: 'Search address identity' })

    const [focus, setFocus] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [address, setAddress] = useState('')
    const [searchList, setSearchList] = useState<{ key: string, data: any }[]>([])
    const [ticketInfo, setTicketInfo] = useState({ level: 0, ticket_id: 0 })
    const [isLoading, setIsLoading] = useState(false)
    const [isValidAddress, setIsValidAddress] = useState(true)
    const onSearch = async () => {
      if (!focus) {
        setFocus(true)
        return
      }
      if (showResult) {
        setShowResult(false)
      }
      setIsLoading(true)
      const searchRet = await PopupAPI.searchByAddress(address)
      if (searchRet.status === 200 && searchRet.result) {
        const info = searchRet.result.info || {}
        const infoList = Object.keys(info).map(key => ({ key, data: info[key] }))
        setSearchList(infoList)
        const level = (searchRet.result.level as string).toLocaleLowerCase()
        setTicketInfo({ level: levelInfo[level], ticket_id: searchRet.result.ticket_id })
      }
      setShowResult(true)
      setIsLoading(false)

    }

    const collectTicket = useCallback(async () => {
      const collectRes = await PopupAPI.collectTicket({
        collect_address: address,
        chainid: 1,
        ticket_id: ticketInfo.ticket_id
      })
      if (collectRes.status === 200) {
        Toast.show('Success')
      } else {
        Toast.show('Error')
      }
    }, [address, ticketInfo])

    useEffect(() => {
      if (address === '') {
        setIsValidAddress(true)
        return
      }
      if (isAddress(address)) {
        setIsValidAddress(true)
      } else {
        setIsValidAddress(false)
      }
    }, [address])

    return (
      <div className="page-root search-page">
        {
          !focus && <SelectChain />
        }

        <img src={logoPng} className={`img-logo ${focus ? 'left-position' : ''}`} alt="" />
        <img src={logoTPng} className={`img-logo2 ${focus ? 'left-position' : ''}`} alt="" />

        <div className={`flex justify-center search-wrap  ${focus ? 'bg-image left-position' : ''} ${!isValidAddress ? 'valid' : ''}`}>
          <input type="text" className={`outline-none search-input `} placeholder={holder}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value)
            }}
            onFocus={() => setFocus(true)}
          />
          <div className={`search-btn flex justify-center items-center hover:opacity-80  ${focus ? 'focus' : ''}`}
            onClick={() => {
              onSearch()
            }}
          >
            <img src={searchPng} className=" w-6 h-6" alt="" />
          </div>
        </div>
        {
          !isValidAddress && <div className="text-sm font-medium absolute invalid-address">Invalid Address</div>
        }

        <div className={`search-loading absolute ${isLoading ? '' : 'hide'}`}>
          <Loading size={60} />
        </div>
        <div className={`search-result overflow-auto pb-4 ${showResult ? 'show' : ''}`} style={{ height: 402 }}>
          {/* <div className="ticket-score flex flex-col justify-center">
            <div className="flex items-center justify-center">
              <img src={ticket_scorePng} alt="" style={{ width: 20, height: 20 }} />
              <div className="text-base text-white font-bold ml-2">Evaluation Ticket</div>
            </div>
            <div className="flex items-center justify-center mt-2">
              <div className="flex items-center">
                <img src={star1Png} alt="" style={{ width: 16, height: 16 }}
                  className={` ${ticketInfo.level < 1 ? 'opacity-30' : ''} `} />
                <img src={star1Png} alt="" style={{ width: 16, height: 16 }}
                  className={` ${ticketInfo.level < 2 ? 'opacity-30' : ''} `}
                />
                <img src={star1Png} alt="" style={{ width: 16, height: 16 }}
                  className={` ${ticketInfo.level < 3 ? 'opacity-30' : ''} `}
                />
                <img src={star1Png} alt="" style={{ width: 16, height: 16 }}
                  className={` ${ticketInfo.level < 4 ? 'opacity-30' : ''} `}
                />
                <img src={star1Png} alt="" style={{ width: 16, height: 16 }}
                  className={` ${ticketInfo.level < 5 ? 'opacity-30' : ''} `}
                />
              </div>
              <div className="text-base text-white font-bold mx-2" style={{ fontSize: 20 }}>{Number(ticketInfo.level).toFixed(1)}</div>
              <img onClick={() => collectTicket()} src={ttipPng} alt="" style={{ width: 20, height: 20 }} />
            </div>
          </div> */}
          <TicketScore ticketInfo={ticketInfo} collectTicket={collectTicket} />
          {/* <div className="flex items-baseline mt-4">
            <div className="text-base font-bold color-image">Key Info</div>
            <div className="text-xs ml-1" style={{ color: 'rgba(127, 135, 146, 0.7)' }}>update: {transformTime(Date.now())}</div>
          </div> */}
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
          {/* <div
            onClick={() => PopupAPI.changeState(APP_STATE.FEEDBACK)}
            className="text-xs mt-3 flex justify-end cursor-pointer" style={{ color: 'rgba(63, 70, 100, 0.3)' }}>
            Incorrect? Feedback us
          </div> */}
          <FeedBackUS />
        </div>
      </div>
    )
  }

export default Search