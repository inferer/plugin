import React, { useEffect, useState } from "react";
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
const walletPng = require('./images/wallet.png')
const closePng = require('./images/close.png')

const Recommend: React.FC<any> = ({ appState, onClick, address }) => {

  const onItemClick = (page: number) => {
    PopupAPI.changeState(page)
  }
  const [active, setActive] = useState(1)
  const [showWallet, setShowWallet] = useState(false)
  const [recommentData, setRecommentData] = useState({ like: [], other: [], risk: [] })
  useEffect(() => {
    PopupAPI.getCloseTime()
      .then((time: number) => {
        if (Date.now() - time > 2 * 24 * 60 * 60 * 1000) {
          setShowWallet(true)
        } else {
          setShowWallet(false)
        }
      })
    PopupAPI.getRecommend()
      .then((res: any) => {
        console.log(res)
        if (res.status === 200) {
          setRecommentData({ like: res.result.like || [], other: res.result.other || [], risk: res.result.risk || [] })
        }
      })

  }, [])

  const onSetShowWallet = async () => {
    await PopupAPI.setCloseTime(Date.now())
    setShowWallet(false)
  }

  return (
    <div className="page-root recommend-page">
      <div className="page-title">
        Recommend
      </div>
      <div className="page-content page-home-content">
        <div className="flex items-center justify-between collection-header mt-3 pb-3">
          <div className="flex items-center justify-center"
            onClick={() => setActive(1)}
          >
            {
              active === 1 ?
                <img src={like2Png} alt="" /> :
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
        {
          !address && showWallet &&
          <div className="connect-wallet flex items-center relative cursor-pointer"
            style={{ marginTop: 0 }}
            onClick={() => PopupAPI.changeState(APP_STATE.WALLET)}
          >
            <img
              onClick={(e) => {
                e.stopPropagation()
                onSetShowWallet()
              }}
              src={closePng} className=" absolute w-4 h-4" alt="" style={{ top: 6, right: 6 }} />
            <img className="walletimg" src={walletPng} alt="" />
            <div className="right-text">
              <div className=" text-sm font-bold text-white">Connect your wallet </div>
              <div className=" text-xs text-white opacity-50 mt-1">for better recommendation </div>
            </div>
          </div>
        }

        <div className="list-wrap overflow-auto" style={{ height: !address && showWallet ? 370 : 430 }}>
          {
            active === 1 && <Likes data={recommentData.like}
              onClick={(e: any) => {
                onClick && onClick(e)
              }} />
          }
          {
            active === 2 && <Risks data={recommentData.risk}
              onClick={(e: any) => {
                onClick && onClick(e)
              }} />
          }
          {
            active === 3 && <Others data={recommentData.other}
              onClick={(e: any) => {
                onClick && onClick(e)
              }} />
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