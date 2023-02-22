import React from "react";
import { TTitle } from "./components";

const NftPng = require('../images/nft-asset.png')
const BridgePng = require('../images/bridge.png')
const AddressPng = require('../images/address.png')
const HoldPng = require('../images/hold.png')
const CopyPng = require('../images/copy.png')
const SharePng = require('../images/share.png')

const OwnerOne: React.FC<any> = () => {
  return (
    <div className="box-wrap mt-3" style={{ paddingBottom: '4px' }}>
      <TTitle text="Owner" tips="" />
      <div className="flex owner-wrap mt-2 cursor-pointer">
        <div className="owner-img flex items-center justify-center">
          <img src={NftPng} alt="" />
        </div>
        <div className="flex-1 ml-3">
          <div className="flex items-center mb-2">
            <img className="img-left" src={BridgePng} alt="" />
            <div className="text-xs font-bold">BridgetheDivide</div>
            <img className="img-right" src={SharePng} alt="" />
          </div>
          <div className="flex items-center mb-2">
            <img className="img-left" src={AddressPng} alt="" />
            <div className="text-xs font-bold">0x8eb8.....3f23</div>
            <img className="img-right" src={CopyPng} alt="" />
          </div>
          <div className="flex items-center">
            <img className="img-left" src={HoldPng} alt="" />
            <div className="text-xs">Hold 239 Reddit NFTs</div>
          </div>
          <div className="flex mt-2 flex-wrap">
            <div className="infer-label">
              <div className="color-image">Defi Staker</div>
            </div>
            <div className="infer-label">
              <div className="color-image">Defi Staker</div>
            </div>
            <div className="infer-label">
              <div className="color-image">Opensea Trader</div>
            </div>
            <div className="infer-label">
              <div className="color-image">ENS User</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default OwnerOne