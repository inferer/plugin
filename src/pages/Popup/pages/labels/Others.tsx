import React, { useState } from "react";
import { Toast } from 'antd-mobile'

const { PopupAPI } = require('../../../../api')

const iconPng = require('./images/icon.png')
const copyPng = require('./images/copy.png')
const favPng = require('./images/fav.png')

const Others: React.FC<any> = ({ showData = [], activeKey = '' }) => {
  const collectLabel = async (item: any) => {
    console.log(item)
    const res = await PopupAPI.collectLabel({
      collect_address: item.address,
      timestamp: Date.now(),
      collect_info: activeKey
    })
    console.log(res)
    if (res.status === 200) {
      Toast.show('Success')
    } else {
      Toast.show('Error')
    }
  }
  return (
    <div className="setting-list flex flex-wrap justify-between labels-item">
      {
        showData.map((item: any, key: number) => (
          <div key={key} className="setting-item setting-item2 flex justify-between items-center w-1/2 relative"
          >
            <div className=" absolute top-0 right-0 h-full flex items-center shoucanglabels">
              <img src={copyPng} alt="" style={{ width: 16, height: 16, marginLeft: 8 }} />
              <img src={favPng} alt="" style={{ width: 16, height: 16, marginLeft: 4, marginRight: 8 }}
                onClick={() => collectLabel(item)}
              />
            </div>
            <div className="flex items-center ">
              <div className="flex icon-box justify-center items-center mr-2">
                <img src={iconPng} alt="" />
              </div>
              <div className="">
                <div className="item-text1 text-xs">{item.address.slice(0, 6) + '.....' + item.address.slice(-4)}</div>
              </div>
            </div>
          </div>

        ))
      }

    </div>
  )
}

export default Others