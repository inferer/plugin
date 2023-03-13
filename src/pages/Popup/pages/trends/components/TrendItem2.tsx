import React from "react";
import { APP_STATE } from "../../../config/constants";
import { formatAddress } from "../../../utils";

const { PopupAPI } = require('../../../../../api')

const DemoPng = require('../images/demo2.png');
const SharePng = require('../images/share.png');
const CopyPng = require('../images/copy.png');
const BridgePng = require('../images/bridge.png');
const AddressPng = require('../images/address.png');

const TrendItem: React.FC<{
  itemData?: any,
  from: number,
  index: number,
  goToTicket?: (e: any) => void
}> = ({
  itemData,
  from,
  index,
  goToTicket
}) => {
    return (
      <div className=" relative price-item top-account-item mb-3 cursor-pointer">
        <div className={`flex justify-center items-center absolute left-0 top-0 num font-bold italic text-base num${index + 1}`}>No.{index + 1}</div>
        <div className="price-item-content flex items-center"
          onClick={() => {
            localStorage.setItem('page-from', String(from))
            const toPage = (from === APP_STATE.POPULARCOLL_TREND || from === APP_STATE.PRICECOLL_TREND) ? APP_STATE.ANALYSIS_TREND : APP_STATE.ANALYSISONE_TREND
            PopupAPI.changeState(toPage)
            goToTicket && goToTicket({ address: itemData?.holder_address })
          }}
        >
          <div className="img-wrap flex items-center justify-center">
            <img src={DemoPng} className="" alt="" />
          </div>
          <div className="flex-1" style={{ paddingLeft: 9 }}>
            <div className="flex justify-between">
              <div>
                <div className="flex items-center">
                  <img src={BridgePng} style={{ width: 14, height: 14 }} className=" cursor-pointer" alt="" />
                  <div className="text-xs font-bold" style={{ color: '#3F4664', paddingLeft: '6px', paddingRight: '6px' }}>jjuniorxljjunio...</div>
                  <img src={SharePng} style={{ width: '10px', height: '10px' }} className=" cursor-pointer" alt="" />
                </div>
                <div className="flex items-center mt-2">
                  <img src={AddressPng} style={{ width: 14, height: 14 }} className=" cursor-pointer" alt="" />
                  <div className="text-xs font-bold" style={{ color: '#3F4664', marginLeft: 6, marginRight: 6 }}>
                    {formatAddress(itemData?.holder_address)}
                  </div>
                  <img src={CopyPng} style={{ width: 12, height: 12 }} className=" cursor-pointer" alt="" />
                </div>
              </div>
              {
                (from === APP_STATE.TOPACCOUNT_TREND
                ) &&
                <div className="color-image font-bold right-price" style={{ fontSize: 32, lineHeight: '42px' }}>
                  {Number(itemData?.volume / 1200).toFixed(2)}
                </div>
              }
              {
                (from === APP_STATE.ACTIVEACCOUNT_TREND
                ) &&
                <div className="color-image font-bold right-price" style={{ fontSize: 32, lineHeight: '42px' }}>
                  {itemData?.transaction_num}
                </div>
              }
              {
                from === APP_STATE.TOPPROFIT_TREND && (
                  <div className="color-image font-bold right-price flex items-baseline" style={{ fontSize: 32, lineHeight: '42px' }}>
                    {/* <div style={{ fontSize: 16 }}>+</div>
                    56.2
                    <div style={{ fontSize: 16 }}>%</div> */}
                    {itemData?.NFT_counts}
                  </div>
                )
              }

            </div>
            {
              (from === APP_STATE.TOPACCOUNT_TREND
              ) && <div className="color-image text-xs font-bold text-right">ETH</div>
            }
            {
              (from === APP_STATE.ACTIVEACCOUNT_TREND
              ) && <div className="color-image text-xs font-bold text-right">transfers</div>
            }
            {
              (from === APP_STATE.TOPPROFIT_TREND
              ) && <div className="color-image text-xs font-bold text-right opacity-0">transfers</div>
            }
          </div>
        </div>

      </div>
    )
  }

export default TrendItem