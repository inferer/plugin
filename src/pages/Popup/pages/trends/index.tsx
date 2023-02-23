import React from "react";
import { APP_STATE } from "../../config/constants";
const { PopupAPI } = require('../../../../api')

const TrendsIndex: React.FC<any> = () => {
  return (
    <div className="page-root">
      <div className="page-title color-image uppercase">
        Rankings
      </div>
      <div className="page-content page-content-scroll pt-3">
        <div className="ranking-item item1 relative flex items-center pl-5 font-bold text-base color-b2 cursor-pointer"
          onClick={() => {
            PopupAPI.changeState(APP_STATE.PRICEONE_TREND)
          }}
        >
          <div className=" absolute left-0 top-0 item-tip"></div>
          <div className="img-icon mr-2">
          </div>
          <div>Top Price Avatar</div>
        </div>
        <div className="ranking-item item2 relative flex items-center pl-5 font-bold text-base color-b2 cursor-pointer"
          onClick={() => {
            PopupAPI.changeState(APP_STATE.POPULARONE_TREND)
          }}
        >
          <div className=" absolute left-0 top-0 item-tip"></div>
          <div className="img-icon mr-2">
          </div>
          <div>Top Popular Avatar</div>
        </div>
        <div className="ranking-item item3 relative flex items-center pl-5 font-bold text-base color-b2 cursor-pointer"
          onClick={() => {
            PopupAPI.changeState(APP_STATE.PRICECOLL_TREND)
          }}
        >
          <div className=" absolute left-0 top-0 item-tip"></div>
          <div className="img-icon mr-2">
          </div>
          <div>Top Price Avatar(Coll.)</div>
        </div>
        <div className="ranking-item item4 relative flex items-center pl-5 font-bold text-base color-b2 cursor-pointer"
          onClick={() => {
            PopupAPI.changeState(APP_STATE.POPULARCOLL_TREND)
          }}
        >
          <div className=" absolute left-0 top-0 item-tip"></div>
          <div className="img-icon mr-2">
          </div>
          <div>Top Popular Avatar(Coll.)</div>
        </div>
        <div className="ranking-item item5 relative flex items-center pl-5 font-bold text-base color-b2 cursor-pointer"
          onClick={() => {
            PopupAPI.changeState(APP_STATE.TOPACCOUNT_TREND)
          }}
        >
          <div className=" absolute left-0 top-0 item-tip"></div>
          <div className="img-icon mr-2">
          </div>
          <div>Top Accounts</div>
        </div>
        <div className="ranking-item item6 relative flex items-center pl-5 font-bold text-base color-b2 cursor-pointer"
          onClick={() => {
            PopupAPI.changeState(APP_STATE.ACTIVEACCOUNT_TREND)
          }}
        >
          <div className=" absolute left-0 top-0 item-tip"></div>
          <div className="img-icon mr-2">
          </div>
          <div>Top Active Users</div>
        </div>
        <div className="ranking-item item7 relative flex items-center pl-5 font-bold text-base color-b2 cursor-pointer"
          onClick={() => {
            PopupAPI.changeState(APP_STATE.TOPPROFIT_TREND)
          }}
        >
          <div className=" absolute left-0 top-0 item-tip"></div>
          <div className="img-icon mr-2">
          </div>
          <div>Top Profit Ratios</div>
        </div>
      </div>
    </div>
  )
}

export default TrendsIndex