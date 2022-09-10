import React, { useEffect, useState } from "react";
import { Toast } from 'antd-mobile'

const { PopupAPI } = require('../../../../api')

const iconPng = require('./images/1.png')
const icon2Png = require('./images/2.png')
const icon3Png = require('./images/3.png')
const icon4Png = require('./images/4.png')
const icon5Png = require('./images/5.png')
const icon6Png = require('./images/6.png')
const copyPng = require('./images/copy.png')
const copiedPng = require('./images/copied.png')
const favPng = require('./images/fav.png')

const Others: React.FC<any> = ({ showData = [], activeKey = '', active, onCollectSuccess, onClick }) => {

  const getIconPng = ((active: number) => {
    switch (active) {
      case 1:
        return iconPng
        break;
      case 2:
        return icon2Png
        break;
      case 3:
        return icon3Png
        break;
      case 4:
        return icon4Png
        break;
      case 5:
        return icon5Png
        break;
      case 6:
        return icon6Png
        break;
    }
  })(active)
  const collectLabel = async (item: any, key: number) => {
    let res
    if (item.is_collected) {
      res = await PopupAPI.cancelCollectLabel({
        collect_address: item.address,
        timestamp: Date.now(),
        label_info: activeKey,
        chainid: 1
      })
    } else {
      res = await PopupAPI.collectLabel({
        collect_address: item.address,
        timestamp: Date.now(),
        label_info: activeKey,
        chainid: 1
      })
    }

    if (res.status === 200) {
      onCollectSuccess && onCollectSuccess(key, item.is_collected)
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
            onClick={(e: any) => {
              onClick && onClick(item)
            }}
          >
            <div className=" absolute top-0 right-0 h-full flex items-center shoucanglabels">

              <img src={copyPng} alt="" style={{ width: 16, height: 16, marginLeft: 8 }}
                onClick={(e) => {
                  e.stopPropagation()
                  navigator.clipboard.writeText(item.address)
                    .then(() => {
                      Toast.show({ content: 'Copied', position: 'bottom' })
                    })
                }}
              />

              <img src={item.is_collected ? copiedPng : favPng} alt="" style={{ width: 16, height: 16, marginLeft: 4, marginRight: 8 }}
                onClick={(e) => {
                  e.stopPropagation()
                  collectLabel(item, key)
                }}
              />
            </div>
            <div className="flex items-center ">
              <div className={`flex icon-box justify-center items-center mr-2 ${item.isLocal ? 'label-user' : ''}`}>
                <img src={getIconPng} alt="" />
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