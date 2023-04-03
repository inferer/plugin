import React from "react";
import { TTitle } from "./components";

const InfererLabels: React.FC<any> = ({
  infererLabels = []
}) => {
  return (
    <div className="box-wrap mt-3" style={{ paddingBottom: '4px' }}>
      <TTitle text="Inferer Labels" tips="Top 6 labels in all Coll. holders" />
      <div className="flex mt-3 flex-wrap">
        {
          infererLabels.map((label: any) => {
            return (
              <div key={label.label_name} className="infer-label">
                <div className="color-image">{label.label_name}</div>
              </div>
            )
          })
        }
        {/* <div className="infer-label">
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
        </div> */}
      </div>
    </div>
  )
}

export default InfererLabels