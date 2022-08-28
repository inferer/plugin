import React, { useState } from "react";
const iconPng = require('./images/icon.png')
const leftPng = require('./images/left.png')

const Others: React.FC<any> = () => {
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
    <div className="setting-list flex flex-wrap justify-between">
      {
        likesList.map(item => (
          <div key={item.id} className="setting-item setting-item2 flex justify-between items-center w-1/2"
          >
            <div className="flex items-center ">
              <div className="flex icon-box justify-center items-center mr-2">
                <img src={iconPng} alt="" />
              </div>
              <div className="">
                <div className="item-text1 text-xs">0x8eb8......3f23</div>
              </div>
            </div>
          </div>

        ))
      }

    </div>
  )
}

export default Others