import React, { useRef, useState } from "react";
import { APP_STATE } from "../../config/constants";
import PageHeader from "../components/PageHeader";
import TrendItem from "./components/TrendItem";
import './trends.scss';

const { PopupAPI } = require('../../../../api')

const PopularOneTrend: React.FC<any> = () => {
  const [isLoading, setIsLoading] = useState(false)
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
        // getTickets(pageNoRef.current)
      }
    }
  }
  return (
    <div className="w-360 page-root page-trend">
      <PageHeader
        title={'Popular'}
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
          new Array(20).fill('*').map((item, index) => {
            return <TrendItem key={index} from={APP_STATE.POPULARONE_TREND} index={index} />
          })
        }

      </div>
    </div>
  )
}

export default PopularOneTrend