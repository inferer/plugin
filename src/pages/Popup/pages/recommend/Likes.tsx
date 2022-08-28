import React, { useState } from "react";
const iconPng = require('./images/icon.png')
const leftPng = require('./images/left.png')

const Likes: React.FC<any> = () => {
  const [likesList, setLikesList] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
  ])
  return (
    <div className="setting-list">
      {
        likesList.map(item => (
          <div key={item.id} className="setting-item flex justify-between items-center"
          >
            <div className="flex items-center ">
              <div className="flex icon-box justify-center items-center mr-3">
                <img src={iconPng} alt="" />
              </div>
              <div className="">
                <div className="item-text1 text-sm font-bold">0x8eb8.....3f23</div>
                <div className="item-text2 text-xs">你会发送NFT给它</div>
              </div>
            </div>
            <img src={leftPng} style={{ width: 6, height: 8 }} alt="" />
          </div>

        ))
      }

    </div>
  )
}

export default Likes