import React, { useRef, useState } from "react";
import { APP_STATE } from "../../config/constants";
import './trends.scss';

const { PopupAPI } = require('../../../../api')
const DemoPng = require('./images/demo.png');
const SharePng = require('./images/share.png');

const TrendItem: React.FC<any> = ({
  index
}) => {
  return (
    <div className=" relative price-item mb-3 cursor-pointer">
      <div className={`flex justify-center items-center absolute left-0 top-0 num font-bold text-base num${index + 1}`}>No.{index + 1}</div>
      <div className="price-item-content flex items-center"
        onClick={() => {
          PopupAPI.changeState(APP_STATE.ANALYSIS_TREND)
        }}
      >
        <div className="img-wrap">
          <img src={DemoPng} className="w-full h-full" alt="" />
        </div>
        <div className="flex-1" style={{ paddingLeft: 9 }}>
          <div className="flex justify-between">
            <div>
              <div className="text-sm font-bold" style={{ color: '#3F4664' }}>Meme Team (100)</div>
              <div className="flex items-center">
                <div className="text-sm" style={{ color: '#7F8792' }}>By</div>
                <div className="text-sm font-bold" style={{ color: '#3F4664', marginLeft: 6, marginRight: 6 }}>Fear...8855</div>
                <img src={SharePng} style={{ width: 10, height: 10 }} className=" cursor-pointer" alt="" />
              </div>
            </div>
            <div className="color-image font-bold right-price" style={{ fontSize: 32, lineHeight: '42px' }}>
              0.99
            </div>
          </div>
          <div className="color-image text-xs font-bold text-right">ETH</div>
        </div>
      </div>

    </div>
  )
}

const PriceTrend: React.FC<any> = () => {
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
      <div className="page-title">
        Price (Coll.)
      </div>
      <div className="page-content pt-3 home-page-content"
        ref={listRef}
        onScroll={() => onSroll()}
      >
        {
          new Array(20).fill('*').map((item, index) => {
            return <TrendItem key={index} index={index} />
          })
        }

      </div>
    </div>
  )
}

export default PriceTrend