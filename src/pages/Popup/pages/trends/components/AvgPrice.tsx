import React, { useEffect, useState } from "react";
import { num2Month } from "../../../utils";
import LineChartT from "../../components/LineChart";
import { TTitle } from "./components";

export const AvgPrice: React.FC<any> = ({
  priceMonthHistory
}) => {
  const [priceXdata, setPriceXdata] = useState<any>([])
  const [priceSdata, setPriceSdata] = useState<any>([])
  const [priceAvg, setPriceAvg] = useState(0)

  useEffect(() => {
    if (priceMonthHistory && priceMonthHistory.length > 0) {
      const xdata: any[] = []
      const priceData: any[] = []
      let total = 0
      priceMonthHistory.forEach((element: any) => {
        xdata.push(num2Month(element.transaction_month.slice(-2)))
        const volume = Number((element.price_avg).toFixed(1))
        priceData.push(volume)
        total += volume
      });
      setPriceSdata(priceData)
      setPriceXdata(xdata)
      setPriceAvg(total / xdata.length)
    }
  }, [priceMonthHistory])
  return (
    <div className="flex justify-between mt-3">
      <div className="avgprice-wrap p-3">
        <TTitle text="Price" tips="NFT transaction price in last 6 months" />
        <div className="flex items-baseline mt-1">
          <div className="text-base font-bold color-b2">{priceAvg.toFixed(3)} ETH</div>
          <div className="text-xs ml-1" style={{ color: '#7F8792' }}>(Avg)</div>
        </div>
        <LineChartT
          id="avgPrice"
          lineData={{
            xAxis: {
              data: priceXdata
            },
            series: [
              {
                data: priceSdata,
                type: 'line',
                color: '#FF532E',
                symbolSize: 3,
                lineStyle: {
                  width: 1
                },
              }
            ]
          }}
        />
      </div>
    </div>
  )
}