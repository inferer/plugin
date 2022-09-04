import React from "react";

const item1Png = require('../../../../assets/img/item1.png')
const copyPng = require('../../../../assets/img/copy.png')

const DataItem1: React.FC<{
  itemData: { key: string, data: string }
}> = ({ itemData }) => {
  const dataList = itemData.data.split(',').map(item => item.slice(0, 6) + '.....' + item.slice(-4))
  return (
    <div className="dataitem dataitem1 txinfoitem2 flex justify-between mt-3 cursor-pointer" style={{ height: 104 }}>
      <div className="itemleft flex items-center justify-center" style={{ flex: '0 0 64px', height: 104 }}>
        <img src={item1Png} alt="" style={{ width: 24, height: 24 }} />
      </div>
      <div className="w-full flex flex-col justify-center">
        <div className="text-xs flex items-center pl-3" style={{ color: '#7F8792', height: 40 }}>{itemData.key}</div>
        <div className="text-sm font-bold  mt-1 flex pl-3 flex-wrap justify-start datacontent" style={{ color: '#3F4664', height: 64 }}>
          {
            dataList.map(item => <div className="flex items-center flex-1 text-xs " style={{ flex: '0 0 110px', color: '#7F8792' }}>
              {item}
              <img src={copyPng} style={{ width: 12, height: 12 }} alt="" />
            </div>)
          }
        </div>
      </div>
    </div>
  )

}

export default DataItem1