import React from "react";
import { APP_STATE } from "../../config/constants";

const item2Png = require('../../../../assets/img/item2.png')
const leftPng = require('../setting/images/left.png')
const { PopupAPI } = require('../../../../api')

const DataItem2: React.FC<{
  itemData: { key: string, data: any },
  onChangeState: (appState: number, data: any) => void
}> = ({ itemData, onChangeState }) => {

  return (
    <div className="dataitem dataitem1 dataitem2 flex mt-3 cursor-pointer"
      onClick={() => onChangeState(APP_STATE.TXINFO, itemData)}
    >
      <div className="itemleft flex items-center justify-center" style={{ flex: '0 0 64px', height: 64 }}>
        <img src={item2Png} alt="" style={{ width: 24, height: 24 }} />
      </div>
      <div className="w-full flex justify-between items-center px-5">
        <div className="text-sm mt-1" style={{ color: '#3F4664' }}>{itemData.key}</div>
        <img src={leftPng} style={{ width: 6, height: 8 }} alt="" />
      </div>
    </div>
  )

}

export default DataItem2