import React from "react";
import { BuyIcon, CollectIcon, Like, MsgIcon, ShareIcon, StarList, TTitle, UnLike } from "./components";
const DemoPng = require('../images/demo.png');

const ProjectInfo: React.FC<any> = () => {
  return (
    <div className=" bg-white rounded p-3 flex">
      <div className="big-img">
        <img src={DemoPng} alt="" />
        <div className="left-text flex justify-between items-center">
          <Like />
          <div className="div-line"></div>
          <UnLike />
        </div>
      </div>
      <div className="flex flex-col justify-between flex-1 text-wrap pl-5">
        <div className="flex justify-between">
          <div>
            <div className=" text-xs font-bold">Meme Team (100)</div>
            <div className="mt-1">
              <StarList score={4} />
            </div>
          </div>
          <div>
            <div className="color-image font-bold right-price">0.99</div>
            <div className="color-image text-xs font-bold text-right">ETH</div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className=" rounded flex justify-between items-center space-x-3 " style={{ background: '#F8F9FF', width: 175, height: 28, padding: '0 12px' }}>
            <CollectIcon />
            <div className="icon-line"></div>
            <ShareIcon />
            <div className="icon-line"></div>
            <BuyIcon />
            <div className="icon-line"></div>
            <MsgIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectInfo