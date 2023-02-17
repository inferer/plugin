import React from "react";
import LineChartT from "../components/LineChart";
import { TTitle } from "./components";

export const VolumePrice: React.FC<any> = () => {
  return (
    <div className="flex justify-between mt-3">
      <div className="volume-wrap p-3">
        <TTitle text="Volume" tips="NFT transaction volume in last 6 months" />
        <div className="flex items-baseline mt-1">
          <div className="text-base font-bold color-b2">3.599 ETH</div>
          <div className="text-xs ml-1" style={{ color: '#7F8792' }}>(Total)</div>
        </div>
        <div>
          <LineChartT
            lineData={{
              series: [
                {
                  data: [150, 230, 224, 218, 135, 147],
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
          <div className="text-base font-bold color-b2">3.599 ETH</div>
          <div className="text-xs ml-1" style={{ color: '#7F8792' }}>(Avg)</div>
        </div>
        <div>
          <LineChartT
            lineData={{
              series: [
                {
                  data: [150, 230, 224, 218, 135, 147],
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