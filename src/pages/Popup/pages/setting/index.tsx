import React from "react";
import { APP_STATE } from "../../config/constants";

const { PopupAPI } = require('../../../../api')

const leftPng = require('./images/left.png')
const walletPng = require('./images/wallet.png')
const favPng = require('./images/fav.png')
const searchPng = require('./images/search.png')
const languagePng = require('./images/language.png')

const Setting: React.FC<any> = () => {

  const onItemClick = (type: string) => {
    if (type === 'language') {
      PopupAPI.changeState(APP_STATE.LANGUAGE)
    }
  }
  return (
    <div className="page-root">
      <div className="page-title">
        Settings
      </div>
      <div className="page-content">
        <div className="setting-list">
          <div className="setting-item flex justify-between items-center"
          >
            <div className="flex items-center ">
              <div className="flex icon-box justify-center items-center mr-3">
                <img src={walletPng} alt="" />
              </div>
              <div className="">
                <div className="item-text1">Wallet</div>
                <div className="item-text2">Wallet settings</div>
              </div>
            </div>
            <img src={leftPng} style={{ width: 6, height: 8 }} alt="" />
          </div>
          <div className="setting-item flex justify-between items-center">
            <div className="flex items-center ">
              <div className="flex icon-box justify-center items-center mr-3">
                <img src={favPng} alt="" />
              </div>
              <div className="">
                <div className="item-text1">Collection</div>
                <div className="item-text2">Collect address</div>
              </div>
            </div>
            <img src={leftPng} style={{ width: 6, height: 8 }} alt="" />
          </div>
          <div className="setting-item flex justify-between items-center">
            <div className="flex items-center ">
              <div className="flex icon-box justify-center items-center mr-3">
                <img src={searchPng} alt="" />
              </div>
              <div className="">
                <div className="item-text1">Search</div>
                <div className="item-text2">Search settings</div>
              </div>
            </div>
            <img src={leftPng} style={{ width: 6, height: 8 }} alt="" />
          </div>
          <div className="setting-item flex justify-between items-center"
            onClick={() => onItemClick('language')}
          >
            <div className="flex items-center ">
              <div className="flex icon-box justify-center items-center mr-3">
                <img src={languagePng} alt="" />
              </div>
              <div className="">
                <div className="item-text1">Display Language</div>
                <div className="item-text2">English</div>
              </div>
            </div>
            <img src={leftPng} style={{ width: 6, height: 8 }} alt="" />
          </div>

        </div>

      </div>
    </div>
  )
}

export default Setting