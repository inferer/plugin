import React, { useRef, useState } from "react";
import { APP_STATE } from "../../config/constants";
import PageHeader from "../components/PageHeader";
import TrendItem from "./components/TrendItem";
import TrendItem2 from "./components/TrendItem2";
import './trends.scss';

const { PopupAPI } = require('../../../../api')
const DemoPng = require('./images/demo.png');
const SharePng = require('./images/share.png');

const TopAccountTrend: React.FC<any> = () => {
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
        title={'top account'}
        tip={
          <ul className="list-decimal list-outside tip-list pl-4">
            <li>Top account ranking focuses on user balance on chain.</li>
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
          new Array(20).fill('*').map((item, index) => {
            return <TrendItem2 key={index} from={APP_STATE.TOPACCOUNT_TREND} index={index} />
          })
        }

      </div>
    </div>
  )
}

export default TopAccountTrend