import React, { useEffect, useState } from "react";
import { randomString } from "../../../utils";
import PieChartT from "../../components/PieChart";
import { TTitle } from "./components";

const HoldingAmount: React.FC<any> = ({
  itemData = []
}) => {
  const [precentData, setPrecentData] = useState({
    '1': '0.0',
    '2-3': '0.0',
    '4-10': '0.0',
    '>10': '0.0'
  })

  useEffect(() => {
    if (itemData.length > 0) {
      let precentObj: any = {}
      itemData.forEach((item: any) => {
        precentObj[item.holder_type] = (item.precent * 100).toFixed(1)
      });
      setPrecentData({ ...precentData, ...precentObj })
    }

  }, [itemData])

  return (
    <div className="box-wrap mt-3">
      <TTitle text="Holding Amount distribution" tips="" />
      <div className="flex justify-between items-center mt-2">
        <div>
          <PieChartT dataList={precentData} id={randomString()} />
        </div>
        <div className="flex pl-8 flex-1 holding-amount">
          <div className="">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="holding-dot _1"></div>
                1
              </div>
              <div className="ml-4 font-medium">{precentData['1']}%</div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center">
                <div className="holding-dot _23"></div>
                2-3
              </div>
              <div className="ml-4 font-medium">{precentData['2-3']}%</div>
            </div>
          </div>
          <div className="ml-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="holding-dot _410"></div>
                4-10
              </div>
              <div className="ml-4 font-medium">{precentData['4-10']}%</div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center">
                <div className="holding-dot _10"></div>
                {">"}10
              </div>
              <div className="ml-4 font-medium">{precentData['>10']}%</div>
            </div>
          </div>

        </div>
      </div>
      <div className="text-xs color-b2 holding-amount" style={{ marginTop: '2px' }}>2.34k Holders</div>

    </div>
  )
}

export default HoldingAmount