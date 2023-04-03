import { Toast } from "antd-mobile";
import React from "react";
import { redditChatUrl, redditUserUrl } from "../../../config/constants";
import { formatAddress, openBrowser } from "../../../utils";
import { TTitle } from "./components";
import { formatName } from "./TrendItem";

const NftPng = require('../images/nft-asset.png')
const BridgePng = require('../images/bridge.png')
const AddressPng = require('../images/address.png')
const HoldPng = require('../images/hold.png')
const CopyPng = require('../images/copy.png')
const SharePng = require('../images/share.png')

const OwnerOne: React.FC<any> = ({
  ownerInfo,
  infererLabels = []
}) => {
  return (
    <div className="box-wrap mt-3" style={{ paddingBottom: '4px' }}>
      <TTitle text="Owner" tips="" />
      <div className="flex owner-wrap mt-2 cursor-pointer">
        <div className="owner-img flex items-center justify-center">
          <img src={ownerInfo?.img_url || NftPng} alt="" />
        </div>
        <div className="flex-1 ml-3">
          <div className="flex items-center mb-2">
            <img className="img-left" src={BridgePng} alt="" />
            {
              ownerInfo?.user_name ?
                <>
                  <div className="text-xs font-bold">{formatName(ownerInfo.user_name)} </div>
                  <img className="img-right" src={SharePng} alt=""
                    onClick={e => {
                      e.stopPropagation()
                      openBrowser(redditUserUrl + `${ownerInfo.user_name}`)
                    }}
                  />
                </> :
                <div className="text-xs" style={{ color: '#7F8792' }}>{'unknown'} </div>
            }
          </div>
          <div className="flex items-center mb-2">
            <img className="img-left" src={AddressPng} alt="" />
            <div className="text-xs font-bold">{formatAddress(ownerInfo?.holder_address)}</div>
            <img className="img-right" src={CopyPng} alt=""
              onClick={(e) => {
                e.stopPropagation()
                navigator.clipboard.writeText(ownerInfo?.holder_address)
                  .then(() => {
                    Toast.show({ content: 'Copied', position: 'bottom' })
                  })
              }}
            />
          </div>
          <div className="flex items-center">
            <img className="img-left" src={HoldPng} alt="" />
            <div className="text-xs">Hold {ownerInfo?.nft_nums || 0} Reddit NFTs</div>
          </div>
          <div className="flex mt-2 flex-wrap">
            {
              infererLabels.slice(0, 4).map((label: any) => {
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
            </div> */}
          </div>
        </div>
      </div>

    </div>
  )
}

export default OwnerOne