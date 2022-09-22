import React, { useCallback, useEffect, useRef, useState } from "react";
import { useIntl } from 'react-intl'
import { APP_STATE } from "../../config/constants";
import { transformTime } from "../../utils";
import PageHeader from "../components/PageHeader";
import NoData from "./NoData";
import { levelInfo } from '../search/index'
import { Toast } from "antd-mobile";
import Loading from "../components/Loading";

const { PopupAPI } = require('../../../../api')

const copyImg = require('./images/copy2.png')
const chainEthImg = require('./images/chain_eth.png')
const chainPlatonImg = require('./images/chain_platon.png')

const ticketsList = [
  { id: 1, level: 1 },
  { id: 2, level: 2 },
  { id: 3, level: 3 },
  { id: 4, level: 4 },
  { id: 5, level: 5 },
  { id: 6, level: 1 },
  { id: 7, level: 4 },
  { id: 8, level: 3 },
  { id: 9, level: 2 },
  { id: 10, level: 1 },
]

const Collection: React.FC<any> = ({ appState, onChangeState, toSearch }) => {

  const onItemClick = (type: string) => {
    if (type === 'language') {
      PopupAPI.changeState(APP_STATE.LANGUAGE)
    }
  }
  const intl = useIntl()
  const title = intl.formatMessage({ id: 'title.collection', defaultMessage: 'COLLECTION' })

  const [tickets, setTickets] = useState<any>([])
  const [showResult, setShowResult] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [noData, setNodata] = useState(false)
  const getTickets = (pageNo: number) => {
    if (isLoading || noData) return
    // setIsLoading(true)
    PopupAPI.getTickets(pageNo)
      .then((res: any) => {
        if (res && res.status === 200) {
          console.log(res)
          const result = typeof res.result === 'string' ? [] : res.result
          const tmpList = result.map((item: any) => {
            const contentJson = JSON.parse(item.content)
            return {
              chainid: item.chainid,
              search_address: item.search_address,
              timestamp: transformTime(new Date(item.timestamp).getTime()),
              level: levelInfo[contentJson.level.toLocaleLowerCase()],
              result: contentJson
            }
          })
          if (tmpList.length < 10) {
            setNodata(true)
            setIsLoading(false)
          }
          setTickets([...tickets, ...tmpList])
          setShowResult(true)
          setTimeout(() => {
            setIsLoading(false)
          }, 500)
        }
      })
  }

  useEffect(() => {
    if (appState === APP_STATE.TICKET) {
      setIsLoading(false)
      setNodata(false)
      getTickets(0)
    }
  }, [appState])

  const openTicketInfer = (item: any) => {
    localStorage.setItem('search_address', item.search_address)
    onChangeState(APP_STATE.TICKETINFER, item)
  }
  const listRef = useRef<HTMLDivElement | null>(null)
  const pageNoRef = useRef<number>(0)
  const onSroll = async () => {
    if (listRef.current) {
      const listDom = listRef.current
      const scrollTop = listDom.scrollTop;
      const scrollHeight = listDom.scrollHeight;
      const clientHeight = listDom.clientHeight;
      if (scrollHeight - clientHeight - scrollTop <= 2 && !isLoading) {
        pageNoRef.current++
        getTickets(pageNoRef.current)
      }
    }
  }

  return (
    <div className="w-360 page-root collection-page tickets-page">
      <div className="page-title">
        TICKETS
      </div>
      <div className="page-content pt-3 home-page-content"
        ref={listRef}
        onScroll={() => onSroll()}
      >
        <div className="setting-list">
          {
            tickets.map((item: any, key: number) =>
              <div key={key} className={`collection-item flex items-center h-16 bg${item.level}`}
                onClick={() => openTicketInfer(item)}
              >
                <div className="flex justify-center items-center w-16 h-16">
                  <div className={`text text${item.level}`}>{item.level}.0</div>
                  <div className={`text text-text`}>{item.level}.0</div>
                </div>
                <div className="ml-4 ">
                  <div className="text-sm font-bold flex items-center" style={{ color: '#7F8792' }}>
                    {item.search_address.slice(0, 6) + '.....' + item.search_address.slice(-4)}
                    <img src={copyImg} alt="" className="w-3 h-3 ml-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigator.clipboard.writeText(item.search_address)
                          .then(() => {
                            Toast.show({ content: 'Copied', position: 'bottom' })
                          })
                      }}
                    />
                    <img src={item.chainid === 1 ? chainEthImg : chainPlatonImg} alt="" className="w-3 h-3 ml-1"/>
                  </div>
                  <div className="text-xs " style={{ color: 'rgba(127, 135, 146, 0.7)' }}>{item.timestamp}</div>
                </div>
              </div>

            )
          }
          {/* <div key={item.id} className={`collection-item flex items-center h-16 bg${item.level}`}
                onClick={() => openTicketInfer()}
              >
                <div className="flex justify-center items-center w-16 h-16">
                  <div className={`text text${item.level}`}>{item.level}.0</div>
                  <div className={`text text-text`}>{item.level}.0</div>
                </div>
                <div className="ml-4 ">
                  <div className="text-sm font-bold flex items-center" style={{ color: '#7F8792' }}>
                    0x8eb8.....3f23
                    <img src={copyImg} alt="" className="w-4 h-4 ml-1" />
                  </div>
                  <div className="text-xs " style={{ color: 'rgba(127, 135, 146, 0.7)' }}>15:00 7/22 2022</div>
                </div>
              </div> */}
          {
            noData && tickets.length > 0 ? <div className=" my-2 text-sm opacity-70 text-center">END</div>
              :
              <div className="flex justify-center pb-3">
                <Loading size={20} />
              </div>
          }

        </div>
        {
          showResult && tickets.length <= 0 && <NoData onClick={() => {
            toSearch()
          }} />
        }

      </div>
    </div>
  )
}

export default Collection