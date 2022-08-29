import React from "react";

const item1Png = require('../../../../assets/img/item1.png')

const DataItem1: React.FC<any> = () => {
  return (
    <div className="dataitem dataitem1 flex mt-3 cursor-pointer">
      <div className="itemleft flex items-center justify-center" style={{ flex: '0 0 64px', height: 64 }}>
        <img src={item1Png} alt="" style={{ width: 24, height: 24 }} />
      </div>
      <div className="w-full flex flex-col justify-center pl-3">
        <div className="text-xs" style={{ color: '#7F8792' }}>User First Tx Timestamp</div>
        <div className="text-sm font-bold mt-1" style={{ color: '#3F4664' }}>5/18/2021, 6:21:52 PM</div>
      </div>
    </div>
  )

}

export default DataItem1