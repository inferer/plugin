import React, { useEffect, useState } from "react";
import { formatAddress, transformTime } from "../../../utils";
import { TTitle } from "./components";

const demoData = [
  { time: '09/20', from: '0x8eb8.....3f23', to: 'Atcxl', price: '0.078' },
  { time: '08/28', from: 'Atcxl', to: '0x8eb8.....3f23', price: '0.078' },
  { time: '07/21', from: '0x8eb8.....3f23', to: 'BridgetheDiv...', price: '0.078' },
  { time: '06/20', from: 'amonetize', to: '0x8eb8.....3f23', price: '0.078' },
  { time: '05/19', from: '0x8eb8.....3f23', to: '0x8eb8.....3f23', price: '0.078' },
]

const HistoryOne: React.FC<any> = ({
  txHistory = []
}) => {
  const [list, setList] = useState(demoData)
  useEffect(() => {
    if (txHistory && txHistory.length > 0) {
      const tmpList = txHistory.map((_item: any) => {
        return {
          ..._item,
          time: transformTime(_item.time * 1000).slice(6, 12)
        }
      })
      setList(tmpList)
    }
  }, [txHistory])
  return (
    <div className="box-wrap mt-3" style={{ paddingBottom: '10px' }}>
      <TTitle text="History" tips="" />
      <div className="history-list" style={{ marginTop: '3px' }}>
        <div className="flex items-center history-title">
          <div className="history-item item-time">Time</div>
          <div className="history-item item-from">From</div>
          <div className="history-item item-to">To</div>
          <div className=" item-price">Price</div>
        </div>
        {
          list.map((item, index) => {
            return (
              <div key={item.from + index} className={`flex items-center history-content ${index % 2 === 1 ? 'bg-1' : ''}`}
              >
                <div className="history-item item-time">{item.time}</div>
                <div className="history-item item-from">{formatAddress(item.from)}</div>
                <div className="history-item item-to">{formatAddress(item.to)}</div>
                <div className=" item-price">{item.price}<span style={{ paddingLeft: '2px', color: '#3F4664' }}>ETH</span></div>
              </div>
            )
          })
        }

      </div>
    </div>
  )
}

export default HistoryOne