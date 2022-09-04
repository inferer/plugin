import React, { useState } from "react";
const iconPng = require('./images/icon.png')
const leftPng = require('./images/left.png')

const Likes: React.FC<any> = ({ data, onClick }) => {
  return (
    <div className="setting-list">
      {
        data.map((item: any, key: number) => (
          <div key={key} className="setting-item flex justify-between items-center"
            onClick={() => {
              onClick && onClick(item)
            }}
          >
            <div className="flex items-center ">
              <div className="flex icon-box justify-center items-center mr-3">
                <img src={iconPng} alt="" />
              </div>
              <div className="">
                <div className="item-text1 text-sm font-bold">{item.address.slice(0, 6) + '.....' + item.address.slice(-4)}</div>
                <div className="item-text2 text-xs">{item.recommend_info}</div>
              </div>
            </div>
            <img src={leftPng} style={{ width: 6, height: 8 }} alt="" />
          </div>

        ))
      }

    </div>
  )
}

export default React.memo(Likes)