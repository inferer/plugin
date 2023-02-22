import React from "react";
import LineChartT from "../../components/LineChart";
import { TTitle } from "./components";

export const AvgPrice: React.FC<any> = () => {
  return (
    <div className="flex justify-between mt-3">
      <div className="avgprice-wrap p-3">
        <TTitle text="Price" tips="NFT transaction price in last 6 months" />
        <div className="flex items-baseline mt-1">
          <div className="text-base font-bold color-b2">3.599 ETH</div>
          <div className="text-xs ml-1" style={{ color: '#7F8792' }}>(Avg)</div>
        </div>
        <LineChartT
          lineData={{
            xAxis: {
              data: ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            series: [
              {
                data: [150, 230, 224, 218, 135, 147, 150, 230, 224, 218, 135, 147],
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