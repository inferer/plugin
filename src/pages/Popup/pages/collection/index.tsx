import React, { useCallback, useEffect, useRef, useState } from "react";
import { useIntl } from 'react-intl'
import { APP_STATE } from "../../config/constants";
import PageHeader from "../components/PageHeader";
import { transformTime } from "../../utils"
import { levelInfo } from "../search";
import { Toast } from "antd-mobile";
import Loading from "../components/Loading";

const { PopupAPI } = require('../../../../api')

const copyImg = require('./images/copy2.png')
const l1Png = require('./images/l1.png')
const l2Png = require('./images/l2.png')
const l3Png = require('./images/l3.png')
const l4Png = require('./images/l4.png')
const l5Png = require('./images/l5.png')
const l6Png = require('./images/l6.png')
const l11Png = require('./images/l11.png')
const l12Png = require('./images/l12.png')
const l13Png = require('./images/l13.png')
const l14Png = require('./images/l14.png')
const l15Png = require('./images/l15.png')
const l16Png = require('./images/l16.png')
const ticketsPng = require('./images/ticket.png')
const tickets2Png = require('./images/tickets2.png')
const labelsPng = require('./images/labels.png')
const labels2Png = require('./images/labels2.png')

const ticketsList = [
  { level: 1 },
  { level: 2 },
  { level: 3 },
  { level: 4 },
  { level: 5 },
  { level: 1 },
]

const labelsList = [
  { level: 1 },
  { level: 2 },
  { level: 3 },
  { level: 4 },
  { level: 5 },
  { level: 6 },
]

const userKey: any = {
  'new_users': '1',
  'real_users': '2',
  'interacted_users': '3',
  'nft_active_users': '4',
  'large_balance_users': '5',
  'poap_users': '6',
}

const Collection: React.FC<any> = ({ appState, onClick }) => {

  const onItemClick = (type: string) => {
    if (type === 'language') {
      PopupAPI.changeState(APP_STATE.LANGUAGE)
    }
  }
  const intl = useIntl()
  const title = intl.formatMessage({ id: 'title.collection', defaultMessage: 'COLLECTION' })

  const [tickets, setTickets] = useState<any>([])
  const [labels, setLabels] = useState<any>([])

  const getLabelImg = (level: number) => {
    if (level === 1) return l11Png
    if (level === 2) return l12Png
    if (level === 3) return l13Png
    if (level === 4) return l14Png
    if (level === 5) return l15Png
    if (level === 6) return l16Png
  }

  const getUserImg = (level: number) => {
    if (level === 1) return l1Png
    if (level === 2) return l2Png
    if (level === 3) return l3Png
    if (level === 4) return l4Png
    if (level === 5) return l5Png
    if (level === 6) return l6Png
  }

  const [active, setActive2] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [noData, setNodata] = useState(false)
  const [noData2, setNodata2] = useState(false)
  const [canScroll, setCanScroll] = useState(true)
  const setActive = (type: number) => {
    localStorage.setItem('ticketinfer_from', '')
    setCanScroll(true)
    setActive2(type)
  }
  const getCollectTickets = (pageNo: number) => {
    if ((isLoading || noData) && pageNo > 0) {
      setCanScroll(true)
      return
    }
    setCanScroll(false)
    PopupAPI.getCollectTickets({ page_index: pageNo, page_size: 10 })
      .then((res: any) => {
        if (res.status === 200) {
          const newList = (typeof res.result === 'string' ? [] : res.result).map((item: any) => {
            return {
              ...item,
              date: transformTime(item.timestamp),
              level: item.ticket_level ? levelInfo[item.ticket_level.toLowerCase()] : 1
            }
          })
          if (newList.length < 10) {
            setNodata(true)
            setIsLoading(false)
          }
          if (pageNo > 0) {
            setTickets([...tickets, ...newList])
          } else {
            setTickets([...newList])
          }

        }

        setTimeout(() => {
          setIsLoading(false)
          setCanScroll(true)
        }, 500)
      })
  }
  const getCollectLabels = (pageNo: number) => {
    if ((isLoading || noData2) && pageNo > 0) {
      setCanScroll(true)
      return
    }
    setCanScroll(false)
    PopupAPI.getCollectLabels({ page_index: pageNo, page_size: 10 })
      .then((res: any) => {
        if (res.status === 200) {
          const newList = (typeof res.result === 'string' ? [] : res.result).map((item: any) => {
            return {
              ...item,
              date: transformTime(item.timestamp),
              level: Number(userKey[item.label])
            }
          })
          if (newList.length < 10) {
            setNodata2(true)
            setCanScroll(true)
            setIsLoading(false)
          }

          if (pageNo > 0) {
            setLabels([...labels, ...newList])
          } else {
            setLabels([...newList])
          }

        }
        setTimeout(() => {
          setIsLoading(false)
          setCanScroll(true)
        }, 500)
      })
  }
  const listRef = useRef<HTMLDivElement | null>(null)
  const pageNoRef = useRef<number>(0)
  const listRef2 = useRef<HTMLDivElement | null>(null)
  const pageNoRef2 = useRef<number>(0)
  console.log(tickets)
  useEffect(() => {
    const ticketinfer_from = localStorage.getItem('ticketinfer_from')
    if (appState === APP_STATE.COLLECTION && ticketinfer_from !== 'ticketinfer') {
      setTickets([])
      setLabels([])
      setIsLoading(false)
      setNodata(false)
      setNodata2(false)
      setActive2(1)
      pageNoRef.current = 0
      getCollectTickets(0)

      pageNoRef2.current = 0
      getCollectLabels(0)
    } else {

      localStorage.setItem('ticketinfer_from', '')
    }
  }, [appState])

  // useEffect(() => {
  //   const ticketinfer_from = localStorage.getItem('ticketinfer_from')
  //   if (appState === APP_STATE.COLLECTION && ticketinfer_from !== 'ticketinfer') {
  //     if (active === 2 && labels.length <= 0) {
  //       pageNoRef.current = 0
  //       getCollectLabels(0)
  //     }
  //   } else {
  //     localStorage.setItem('ticketinfer_from', '')
  //   }
  // }, [active, appState])


  const onTicketsSroll = async () => {
    if (listRef.current && tickets.length > 0) {
      const listDom = listRef.current
      const scrollTop = listDom.scrollTop;
      const scrollHeight = listDom.scrollHeight;
      const clientHeight = listDom.clientHeight;
      if (scrollHeight - clientHeight - scrollTop <= 2 && !isLoading) {
        setCanScroll(false)
        pageNoRef.current++
        getCollectTickets(pageNoRef.current)
      }
    }
  }

  const onTicketsSroll2 = async () => {
    if (listRef2.current && labels.length > 0) {
      const listDom = listRef2.current
      const scrollTop = listDom.scrollTop;
      const scrollHeight = listDom.scrollHeight;
      const clientHeight = listDom.clientHeight;
      if (scrollHeight - clientHeight - scrollTop <= 2 && !isLoading) {
        setCanScroll(false)
        pageNoRef2.current++
        getCollectLabels(pageNoRef2.current)
      }
    }
  }

  return (
    <div className="w-360 page-root collection-page">
      <PageHeader title={title} onBack={() => PopupAPI.changeState(APP_STATE.SETTING)} />
      <div className="page-content pt-3">
        <div className="flex items-center collection-header">
          <div className="flex items-center justify-center w-1/2"
            onClick={() => setActive(1)}
          >
            {
              active === 1 ?
                <img src={tickets2Png} alt="" /> :
                <img src={ticketsPng} alt="" />
            }
            <div className={`text-base font-bold ${active === 1 ? 'color-image' : 'text-title'}`}>Tickets</div>
          </div>
          <div className="flex items-center justify-center w-1/2"
            onClick={() => setActive(2)}
          >
            {
              active === 2 ?
                <img src={labels2Png} alt="" /> :
                <img src={labelsPng} alt="" />
            }
            <div className={`text-base font-bold ${active === 2 ? 'color-image' : 'text-title'}`}>Labels</div>
          </div>
        </div>
        {
          active === 1 &&
          <div className="setting-list" style={{ height: 470, overflow: canScroll ? 'auto' : 'hidden' }}
            ref={listRef}
            onScroll={() => onTicketsSroll()}
          >
            {
              tickets.map((item: any, key: number) =>
                <div key={key} className={`collection-item cursor-pointer flex items-center h-16 bg${item.level}`}
                  onClick={() => {
                    onClick && onClick(item)
                  }}
                >
                  <div className="flex justify-center items-center w-16 h-16">
                    <div className={`text text${item.level}`}>{item.level}.0</div>
                  </div>
                  <div className="ml-4 ">
                    <div className="text-sm font-bold flex items-center" style={{ color: '#7F8792' }}>
                      {item.collect_address.slice(0, 6) + '.....' + item.collect_address.slice(-6)}
                      <img src={copyImg} alt="" className="w-4 h-4 ml-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigator.clipboard.writeText(item.collect_address)
                            .then(() => {
                              Toast.show({ content: 'Copied', position: 'bottom' })
                            })
                        }}
                      />
                    </div>
                    <div className="text-xs " style={{ color: 'rgba(127, 135, 146, 0.7)' }}>Collect on {item.date}</div>
                  </div>
                </div>
              )
            }
            {
              noData ? <div className=" my-2 text-sm opacity-70 text-center">No more data</div>
                :
                <div className="flex justify-center pb-3">
                  <Loading size={20} />
                </div>
            }
          </div>
        }
        {
          active === 2 &&
          <div className="setting-list" style={{ height: 470, overflow: canScroll ? 'auto' : 'hidden' }}
            ref={listRef2}
            onScroll={() => onTicketsSroll2()}
          >
            {
              labels.map((item: any, key: number) =>
                <div key={key} className={`collection-item cursor-pointer flex items-center h-16 bg${item.level}`}
                  onClick={() => {
                    onClick && onClick(item)
                  }}
                >
                  <div className="flex justify-center items-center w-16 h-16">
                    <img className="userimgnormal" src={getUserImg(item.level)} alt="" style={{ width: 24, height: 24 }} />
                    <img className="userimghover" src={getLabelImg(item.level)} alt="" style={{ width: 24, height: 24 }} />
                  </div>
                  <div className="ml-4 ">
                    <div className="text-sm font-bold flex items-center" style={{ color: '#7F8792' }}>
                      {item.collect_address.slice(0, 6) + '.....' + item.collect_address.slice(-6)}
                      <img src={copyImg} alt="" className="w-4 h-4 ml-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigator.clipboard.writeText(item.collect_address)
                            .then(() => {
                              Toast.show({ content: 'Copied', position: 'bottom' })
                            })
                        }}
                      />
                    </div>
                    <div className="text-xs " style={{ color: 'rgba(127, 135, 146, 0.7)' }}>Collect on {item.date}</div>
                  </div>
                </div>
              )
            }
            {
              noData2 ? <div className=" my-2 text-sm opacity-70 text-center">No more data</div>
                :
                <div className="flex justify-center pb-3">
                  <Loading size={20} />
                </div>
            }
          </div>
        }


      </div>
    </div>
  )
}

export default Collection