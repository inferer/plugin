import { Toast } from "antd-mobile";
import React from "react";
import { APP_STATE, redditUserUrl } from "../../../config/constants";
import { formatAddress, formatNumber, openBrowser } from "../../../utils";
import { formatName } from "./TrendItem";

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
            goToTicket && goToTicket({ address: itemData?.holder_address })
          }}
        >
          <div className="img-wrap flex items-center justify-center">
            <img src={itemData.img_url || DemoPng} className="" alt="" />
          </div>
          <div className="flex-1" style={{ paddingLeft: 9 }}>
            <div className="flex justify-between">
              <div>
                <div className="flex items-center">
                  <img src={BridgePng} style={{ width: 14, height: 14 }} className=" cursor-pointer" alt="" />
                  {
                    itemData?.user_name ?
                      <>
                        <div className="text-xs font-bold" style={{ color: '#3F4664', paddingLeft: '6px', paddingRight: '6px' }}>
                          {formatName(itemData?.user_name)}
                        </div>
                        <img src={SharePng} style={{ width: '10px', height: '10px' }} className=" cursor-pointer" alt=""
                          onClick={e => {
                            e.stopPropagation()
                            openBrowser(redditUserUrl + `${itemData.user_name}`)
                          }}
                        />
                      </> :
                      <div className="text-xs" style={{ color: '#7F8792', paddingLeft: '6px' }}>{'unknown'} </div>
                  }

                </div>
                <div className="flex items-center mt-2">
                  <img src={AddressPng} style={{ width: 14, height: 14 }} className=" cursor-pointer" alt="" />
                  <div className="text-xs font-bold" style={{ color: '#3F4664', marginLeft: 6, marginRight: 6 }}>
                    {formatAddress(itemData?.holder_address)}
                  </div>
                  <img src={CopyPng} style={{ width: 12, height: 12 }} className=" cursor-pointer" alt=""
                    onClick={(e) => {
                      e.stopPropagation()
                      navigator.clipboard.writeText(itemData?.holder_address)
                        .then(() => {
                          Toast.show({ content: 'Copied', position: 'bottom' })
                        })
                    }}
                  />
                </div>
              </div>
              {
                (from === APP_STATE.TOPACCOUNT_TREND
                ) &&
                <div className="color-image font-bold right-price" style={{ fontSize: 32, lineHeight: '42px' }}>
                  <span className=" text-xs" style={{ marginRight: 2 }}>$</span>{formatNumber(Number(itemData?.volume))}
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
                    <div style={{ fontSize: 16 }}>+</div>
                    {(itemData.wealth_appreciation * 100).toFixed(0)}
                    <div style={{ fontSize: 16 }}>%</div>
                  </div>
                )
              }

            </div>
            {
              (from === APP_STATE.TOPACCOUNT_TREND
              ) && <div className="color-image text-xs font-bold text-right"></div>
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