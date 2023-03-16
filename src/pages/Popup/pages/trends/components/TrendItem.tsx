import React from "react";
import { APP_STATE } from "../../../config/constants";
import { formatAddress } from "../../../utils";

const { PopupAPI } = require('../../../../../api')

const DemoPng = require('../images/demo.png');
const SharePng = require('../images/share.png');

const TrendItem: React.FC<{
  itemData?: any,
  from: number,
  index: number
}> = ({
  itemData,
  from,
  index
}) => {
    return (
      <div className=" relative price-item mb-3 cursor-pointer">
        <div className={`flex justify-center items-center absolute left-0 top-0 num font-bold italic text-base num${index + 1}`}>No.{index + 1}</div>
        <div className="price-item-content flex items-center"
          onClick={() => {
            localStorage.setItem('page-from', String(from))
            localStorage.setItem('analysis_address', itemData?.token_address)
            const toPage = (from === APP_STATE.POPULARCOLL_TREND || from === APP_STATE.PRICECOLL_TREND) ? APP_STATE.ANALYSIS_TREND : APP_STATE.ANALYSISONE_TREND
            PopupAPI.changeState(toPage)
          }}
        >
          <div className="img-wrap">
            <img src={DemoPng} className="w-full h-full" alt="" />
          </div>
          <div className="flex-1" style={{ paddingLeft: 9 }}>
            <div className="flex justify-between">
              <div>
                <div className="text-sm font-bold" style={{ color: '#3F4664' }}>Meme Team (100)</div>
                <div className="flex items-center">
                  <div className="text-sm" style={{ color: '#7F8792' }}>By</div>
                  <div className="text-sm font-bold" style={{ color: '#3F4664', marginLeft: 6, marginRight: 6 }}>
                    {formatAddress(itemData?.token_address)}
                  </div>
                  <img src={SharePng} style={{ width: 10, height: 10 }} className=" cursor-pointer" alt="" />
                </div>
              </div>
              <div className="color-image font-bold right-price" style={{ fontSize: 32, lineHeight: '42px' }}>
                {
                  (from === APP_STATE.PRICECOLL_TREND ||
                    from === APP_STATE.PRICEONE_TREND
                  ) && Number(itemData?.price / 1200).toFixed(2)
                }
                {
                  (from === APP_STATE.POPULARCOLL_TREND ||
                    from === APP_STATE.POPULARONE_TREND
                  ) && (itemData?.nums || itemData?.transaction_num)
                }
              </div>
            </div>
            {
              (from === APP_STATE.PRICECOLL_TREND ||
                from === APP_STATE.PRICEONE_TREND
              ) && <div className="color-image text-xs font-bold text-right">ETH</div>
            }
            {
              (from === APP_STATE.POPULARCOLL_TREND ||
                from === APP_STATE.POPULARONE_TREND
              ) && <div className="color-image text-xs font-bold text-right">transfers</div>
            }
          </div>
        </div>

      </div>
    )
  }

export default TrendItem