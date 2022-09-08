import React, { useState } from "react";
const iconPng = require('./images/icon.png')
const leftPng = require('./images/left.png')

const Others: React.FC<any> = ({ data, onClick }) => {
  return (
    <div className="setting-list flex flex-wrap justify-between">
      {
        data.map((item: any, key: number) => (
          <div key={key} className="setting-item setting-item2 flex justify-between items-center w-1/2 others"
            onClick={() => {
              onClick && onClick(item)
            }}
          >
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

export default React.memo(Others)