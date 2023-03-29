import React, { useEffect, useState } from "react";
import { num2Month } from "../../../utils";
import LineChartT from "../../components/LineChart";
import { TTitle } from "./components";

export const VolumePrice: React.FC<any> = ({
  volumeMonthHistory,
  priceMonthHistory
}) => {
  const [volumeXdata, setVolumeXdata] = useState<any>([])
  const [volumeSdata, setVolumeSdata] = useState<any>([])
  const [volumeTotal, setVolumeTotal] = useState(0)

  const [priceXdata, setPriceXdata] = useState<any>([])
  const [priceSdata, setPriceSdata] = useState<any>([])
  const [priceAvg, setPriceAvg] = useState(0)

  useEffect(() => {
    if (volumeMonthHistory && volumeMonthHistory.length > 0) {
      const xdata: any[] = []
      const volumeData: any[] = []
      let total = 0
      volumeMonthHistory.forEach((element: any) => {
        xdata.push(num2Month(element.transaction_month.slice(-2)))
        const volume = Number((element.volume).toFixed(1))
        volumeData.push(volume)
        total += volume
      });
      setVolumeSdata(volumeData)
      setVolumeXdata(xdata)
      setVolumeTotal(total)
    }
  }, [volumeMonthHistory])

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
      <div className="volume-wrap p-3">
        <TTitle text="Volume" tips="NFT transaction volume in last 6 months" />
        <div className="flex items-baseline mt-1">
          <div className="text-base font-bold color-b2">{(volumeTotal / 16000).toFixed(1)} ETH</div>
          <div className="text-xs ml-1" style={{ color: '#7F8792' }}>(Total)</div>
        </div>
        <div>
          <LineChartT
            id="volumeMonthHistory"
            lineData={{
              xAxis: {
                data: volumeXdata
              },
              series: [
                {
                  data: volumeSdata,
                  type: 'line',
                  color: 'rgba(93, 243, 170, 1)',
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
      <div className="volume-wrap p-3">
        <TTitle text="Price" tips="NFT transaction price in last 6 months" />
        <div className="flex items-baseline mt-1">
          <div className="text-base font-bold color-b2">{(priceAvg / 1600).toFixed(1)} ETH</div>
          <div className="text-xs ml-1" style={{ color: '#7F8792' }}>(Avg)</div>
        </div>
        <div>
          <LineChartT
            id="priceMonthHistory"
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
    </div>
  )
}