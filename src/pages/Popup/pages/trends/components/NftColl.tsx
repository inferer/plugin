import React from "react";
import { TTitle } from "./components";

const DemoPng = require('../images/demo.png')
const SharePng = require('../images/share.png')

const NftColl: React.FC<any> = () => {
  return (
    <div className="box-wrap mt-3 nftcoll-wrap" style={{ paddingBottom: '12px' }}>
      <TTitle text="NFT Collection" tips="" />
      <div className="flex mt-3 cursor-pointer">
        <div className="img-wrap">
          <img src={DemoPng} alt="" />
        </div>
        <div className=" pl-3">
          <div className="text-xs font-bold">Meme Team (100)</div>
          <div className="flex items-center text-xs mt-2">
            <div className="" style={{ color: '#7F8792' }}>By</div>
            <div className=" font-bold" style={{ color: '#3F4664', marginLeft: '6px', marginRight: '6px' }}>Fear...8855</div>
            <img src={SharePng} className="w-3 h-3" alt="" />
          </div>
        </div>
      </div>

    </div>
  )
}

export default NftColl