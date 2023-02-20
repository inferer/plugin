import React from "react";
import { TTitle } from "./components";

const InfererLabels: React.FC<any> = () => {
  return (
    <div className="box-wrap mt-3" style={{ paddingBottom: '4px' }}>
      <TTitle text="Inferer Labels" tips="tips" />
      <div className="flex mt-3 flex-wrap">
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
        <div className="infer-label">
          <div className="color-image">Top NFT Holders</div>
        </div>
        <div className="infer-label">
          <div className="color-image">Defi Staker</div>
        </div>
      </div>
    </div>
  )
}

export default InfererLabels