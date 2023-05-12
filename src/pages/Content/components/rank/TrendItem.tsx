import React from "react";
import { APP_STATE, redditUserUrl } from "../../../Popup/config/constants";
import { formatAddress, formatNumber, openBrowser } from "../../../Popup/utils";
import { DemoPng, SharePng } from '../image'

export const formatName = (name: string) => {
  if (name.length <= 12) return name
  return name.slice(0, 12) + '...'
}

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
        <div className={`flex justify-center items-center absolute left-0 top-0 num font-bold text-base num${index + 1}`}>R{index + 1}</div>
        <div className="price-item-content flex items-center"
          onClick={() => {
            localStorage.setItem('page-from', String(from))
            localStorage.setItem('analysis_address', itemData?.token_address)
            localStorage.setItem('analysis_item', JSON.stringify({ ...itemData, index } || {}))
            // @ts-ignore
            window.injectPlugin.extension.commonRequest({
              action: 'openAnalysis',
              to: from,
              from: 'reddit',
              analysis_item: { ...itemData, index }
            })

          }}
        >
          <div className="img-wrap">
            <img src={itemData.series_img_url || itemData.NFT_img_url || DemoPng} className="w-full h-full" alt="" />
          </div>
          <div className="flex-1" style={{ paddingLeft: 9 }}>
            <div className="flex justify-between">
              <div>
                <div className="text-sm font-bold" style={{ color: '#3F4664' }}>
                  {(itemData.series_name || itemData.NFT_name) ? formatName(itemData.series_name || itemData.NFT_name) : 'Meme Team (100)'}
                </div>
                <div className="flex items-center">
                  <div className="text-sm" style={{ color: '#7F8792' }}>By</div>
                  <div className="text-sm font-bold" style={{ color: '#3F4664', marginLeft: 6, marginRight: 6 }}>
                    {(itemData?.series_creator || itemData?.NFT_creator) && formatName(itemData?.series_creator || itemData?.NFT_creator)}
                  </div>
                  <img src={SharePng} style={{ width: 10, height: 10 }} className=" cursor-pointer" alt=""
                    onClick={e => {
                      e.stopPropagation()
                      openBrowser(redditUserUrl + `${itemData?.series_creator || itemData?.NFT_creator}`)
                    }}
                  />
                </div>
              </div>
              <div className="color-image font-bold right-price" style={{ fontSize: 24, lineHeight: '42px' }}>
                {
                  (from === APP_STATE.PRICECOLL_TREND ||
                    from === APP_STATE.PRICEONE_TREND
                  ) && <><span className=" text-xs" style={{ marginRight: 2 }}>$</span>{formatNumber(Number(itemData?.price))}</>
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
              ) && <div className="color-image text-xs font-bold text-right"></div>
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