import { Toast } from "antd-mobile";
import React from "react";

// 0xefe7572596cf5e3f908a3bb59fac20da8abad646

const item1Png = require('../../../../assets/img/item1.png')
const copyPng = require('../../../../assets/img/icon-url.png')

const DataItem3: React.FC<{
  itemData: { key: string, data: string }
}> = ({ itemData }) => {

  // const dataList = itemData.data.split(',').map(item => JSON.parse(item))
  const dataList = JSON.parse(itemData.data)
  return (
    <div className="dataitem dataitem1 txinfoitem2 flex justify-between mt-3 cursor-pointer" style={{ height: 104 }}>
      <div className="itemleft flex items-center justify-center" style={{ flex: '0 0 64px', height: 104 }}>
        <img src={item1Png} alt="" style={{ width: 24, height: 24 }} />
      </div>
      <div className="w-full flex flex-col justify-center">
        <div className="text-xs flex items-center pl-3" style={{ color: '#7F8792', height: 40, position: 'relative', top: 1 }}>{itemData.key}</div>
        <div className="text-sm font-bold  mt-1 flex pl-3 flex-wrap justify-start datacontent" style={{ color: '#3F4664', height: 64 }}>
          {
            dataList.slice(0, 3).map((item: any) => <div className="flex items-center flex-1 text-xs " style={{ flex: '0 0 110px', color: '#7F8792' }}>
              <div className="slug-item">{item.slug}</div>
              <img src={copyPng} style={{ width: 12, height: 12, marginLeft: 4 }} alt=""
                onClick={(e) => {
                  e.stopPropagation()
                  // navigator.clipboard.writeText(item)
                  //   .then(() => {
                  //     Toast.show({ content: 'Copied', position: 'bottom' })
                  //   })
                  window.open(item.url, '_blank')
                }}
              />
            </div>)
          }
          {
            dataList.length > 3 &&
            <div className="flex items-center flex-1 text-xs " style={{ flex: '0 0 110px', color: '#7F8792' }}>
              and more......
            </div>
          }

        </div>
      </div>
    </div>
  )

}

export default DataItem3