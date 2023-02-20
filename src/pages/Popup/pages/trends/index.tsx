import React from "react";
import { APP_STATE } from "../../config/constants";
const { PopupAPI } = require('../../../../api')

const TrendsIndex: React.FC<any> = () => {
  return (
    <div className="page-root">
      <div className="page-title color-image">
        Trends
      </div>
      <div className="page-content pt-3">
        <div className="h-10 leading-10 border mb-2 pl-3 cursor-pointer"
          onClick={() => {
            PopupAPI.changeState(APP_STATE.PRICECOLL_TREND)
          }}
        >Price (Coll.)</div>
        <div className="h-10 leading-10 border mb-2 pl-3 cursor-pointer"
          onClick={() => {
            PopupAPI.changeState(APP_STATE.POPULARCOLL_TREND)
          }}
        >Popular(Coll.)</div>
        <div className="h-10 leading-10 border mb-2 pl-3 cursor-pointer"
          onClick={() => {
            PopupAPI.changeState(APP_STATE.PRICEONE_TREND)
          }}
        >Price</div>
        <div className="h-10 leading-10 border mb-2 pl-3 cursor-pointer"
          onClick={() => {
            PopupAPI.changeState(APP_STATE.POPULARONE_TREND)
          }}
        >Popular</div>
      </div>
    </div>
  )
}

export default TrendsIndex