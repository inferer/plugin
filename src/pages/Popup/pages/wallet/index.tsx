import React from "react";
import { useIntl } from 'react-intl'
import { APP_STATE } from "../../config/constants";
import PageHeader from '../components/PageHeader'
const { PopupAPI } = require('../../../../api')
const leftPng = require('../setting/images/left.png')
const metamaskPng = require('../setting/images/metamask.png')
const wccPng = require('../setting/images/wcc.png')
const copyPng = require('../setting/images/copy.png')
const dicPng = require('../setting/images/dic.png')


export type WalletProps = {
  searchNum: number,
}

const Wallet: React.FC<WalletProps> = ({
  searchNum
}) => {
  const intl = useIntl()
  const title = intl.formatMessage({ id: 'title.wallet', defaultMessage: 'WALLET' })

  const changeNum = (num: number) => {
    PopupAPI.setSearchNum(num)
  }

  return (
    <div className="w-360 page-root page-language">
      <PageHeader title={title} onBack={() => PopupAPI.changeState(APP_STATE.SETTING)} />

      <div className="page-content">
        <div className="setting-list">
          <div className="setting-item flex justify-between items-center"
            onClick={() => changeNum(20)}
          >
            <div className="flex items-center ">
              <img src={metamaskPng} alt="" style={{ width: 24, height: 24 }} />
              <div className={`item-text1 ml-1 `}>Connect Metamask</div>
            </div>
            <img src={leftPng} alt="" style={{ width: 5, height: 7 }} />
          </div>
          <div className="setting-item flex justify-between items-center"
            onClick={() => changeNum(10)}
          >
            <div className="flex items-center ">
              <img src={wccPng} alt="" style={{ width: 24, height: 24 }} />
              <div className={`item-text1 ml-1`}>Connect WalletConnect</div>
            </div>
            <img src={leftPng} alt="" style={{ width: 5, height: 7 }} />
          </div>
        </div>
        <div className="wallet-card pb-3 pr-3">
          <div className=" text-base text-white font-bold">Wallet</div>
          <div className="flex items-center">
            <div className="text-white font-bold text-xs opacity-80 mr-1">0x8eb8.....3f23</div>
            <img src={copyPng} alt="" style={{ width: 16, height: 16 }} />
          </div>
          <div className="flex mt-10 justify-end">
            <div className=" hover:opacity-80 border cursor-pointer rounded border-white flex justify-center items-center text-white font-bold text-xs" style={{ width: 103, height: 28 }}>
              <img src={dicPng} alt="" style={{ width: 14, height: 14, marginRight: 4 }} />
              Disconnect
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet