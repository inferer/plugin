import React, { useState } from "react";
import { APP_STATE } from "../../config/constants";
import Likes from './Likes'
import Others from "./Others";
import Risks from "./Risks";

const { PopupAPI } = require('../../../../api')

const like1Png = require('./images/like1.png')
const like2Png = require('./images/like2.png')
const risk1Png = require('./images/risk1.png')
const risk2Png = require('./images/risk2.png')
const other1Png = require('./images/other1.png')
const other2Png = require('./images/other2.png')


const Recommend: React.FC<any> = () => {

  const onItemClick = (page: number) => {
    PopupAPI.changeState(page)
  }
  const [active, setActive] = useState(1)

  return (
    <div className="page-root recommend-page">
      <div className="page-title">
        Recommend
      </div>
      <div className="page-content page-home-content">
        <div className="flex items-center justify-between collection-header mt-3">
          <div className="flex items-center justify-center"
            onClick={() => setActive(1)}
          >
            {
              active === 1 ?
                <img src={like2Png} alt="" style={{ width: 15, height: 12 }} /> :
                <img src={like1Png} alt="" />
            }
            <div className={`text-base font-bold ${active === 1 ? 'color-image' : 'text-title'}`}>Like</div>
          </div>
          <div className="flex items-center justify-center"
            onClick={() => setActive(2)}
          >
            {
              active === 2 ?
                <img src={risk2Png} alt="" /> :
                <img src={risk1Png} alt="" />
            }
            <div className={`text-base font-bold ${active === 2 ? 'color-image2' : 'text-title'}`}>Risk</div>
          </div>
          <div className="flex items-center justify-center"
            onClick={() => setActive(3)}
          >
            {
              active === 3 ?
                <img src={other2Png} alt="" /> :
                <img src={other1Png} alt="" />
            }
            <div className={`text-base font-bold ${active === 3 ? 'color-image3' : 'text-title'}`}>Other</div>
          </div>
        </div>
        <div className="list-wrap overflow-auto" style={{ height: 440 }}>
          {
            active === 1 && <Likes />
          }
          {
            active === 2 && <Risks />
          }
          {
            active === 3 && <Others />
          }
        </div>
        {/* <div className="setting-list">
          <div className="setting-item flex justify-between items-center"
          >
            <div className="flex items-center ">
              <div className="flex icon-box justify-center items-center mr-3">
                <img src={iconPng} alt="" />
              </div>
              <div className="">
                <div className="item-text1 text-sm font-bold">0x8eb8.....3f23</div>
                <div className="item-text2 text-xs">你会发送NFT给它</div>
              </div>
            </div>
            <img src={leftPng} style={{ width: 6, height: 8 }} alt="" />
          </div>
        </div> */}

      </div>
    </div>
  )
}

export default Recommend