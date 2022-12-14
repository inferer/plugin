import React, { useState } from "react";
const iconPng = require('./images/icon2.png')
const leftPng = require('./images/left.png')

const Risks: React.FC<any> = ({ data, onClick }) => {

  return (
    <div className="setting-list" style={{ marginTop: 0 }}>
      {
        data.map((item: any, key: number) => (
          <div key={key} className="setting-item flex justify-between items-center risks"
            onClick={() => {
              onClick && onClick(item)
            }}
          >
            <div className="flex items-center ">
              <div className="flex icon-box justify-center items-center mr-5 relative">
                <img src={iconPng} alt="" />
                <div className="icon-box-line"></div>
              </div>
              <div className="">
                <div className="item-text1 text-sm font-bold">{item.address.slice(0, 6) + '.....' + item.address.slice(-4)}</div>
                <div className="item-text2 text-xs">{item.reason}</div>
              </div>
            </div>
            <img src={leftPng} style={{ width: 6, height: 8 }} alt="" />
          </div>

        ))
      }

    </div>
  )
}

export default Risks