import React, { useEffect, useRef, useState } from "react";
import { APP_STATE } from "../../config/constants";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import TrendItem from "./components/TrendItem";
import './trends.scss';

const { PopupAPI } = require('../../../../api')

const PopularCollTrend: React.FC<any> = ({ appState }) => {
  const [isLoading, setIsLoading] = useState(false)
  const listRef = useRef<HTMLDivElement | null>(null)
  const pageNoRef = useRef<number>(0)
  const [pageDataList, setPageDataList] = useState([])

  const getInitData = () => {
    setIsLoading(true)
    PopupAPI.execApiTrends({
      action: 'getTopPopularColl'
    }).then((res: any) => {
      if (res.code === 0) {
        setPageDataList(res.data || [])
      }
      setIsLoading(false)
    })
  }
  const onSroll = async () => {
    // if (listRef.current) {
    //   const listDom = listRef.current
    //   const scrollTop = listDom.scrollTop;
    //   const scrollHeight = listDom.scrollHeight;
    //   const clientHeight = listDom.clientHeight;
    //   if (scrollHeight - clientHeight - scrollTop <= 2 && !isLoading) {
    //     pageNoRef.current++
    //     // getTickets(pageNoRef.current)
    //   }
    // }
  }
  useEffect(() => {
    if (appState === APP_STATE.POPULARCOLL_TREND) {
      setIsLoading(false)
      getInitData()
    } else {
      setIsLoading(false)
    }
  }, [appState])
  return (
    <div className="w-360 page-root page-trend">
      <PageHeader
        title={'Popular(Coll.)'}
        tip={
          <ul className="list-decimal list-outside tip-list pl-4">
            <li>Popular ranking focuses on transaction count on chain.</li>
            <li>COLL. refers to collection.</li>
            <li>Ranking is based on weekly data range.</li>
          </ul>
        }
        onBack={() => {
          const from = localStorage.getItem('page-from')
          PopupAPI.changeState(APP_STATE.TRENDS_INDEX)
        }}
      />

      <div className="page-content pt-3 home-page-content"
        ref={listRef}
        onScroll={() => onSroll()}
      >
        {
          pageDataList.map((item: any, index) => {
            return <TrendItem
              key={item.token_address + index}
              itemData={item}
              from={APP_STATE.POPULARCOLL_TREND}
              index={index}
            />
          })
        }
        {
          isLoading && <div className="flex justify-center pb-3">
            <Loading size={20} />
          </div>
        }
      </div>
    </div>
  )
}

export default PopularCollTrend