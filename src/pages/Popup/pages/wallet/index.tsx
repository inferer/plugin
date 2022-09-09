import { Toast } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { useIntl } from 'react-intl'
import { APP_STATE } from "../../config/constants"
import Loading from "../components/Loading";
import PageHeader from '../components/PageHeader'


const { PopupAPI } = require('../../../../api')
const leftPng = require('../setting/images/left.png')
const metamaskPng = require('../setting/images/metamask.png')
const wccPng = require('../setting/images/wcc.png')
const copyPng = require('../setting/images/copy.png')
const dicPng = require('../setting/images/dic.png')
const loadingPng = require('./images/loading.png')

// 92041db07d8142bdbc0717a0e0e34ed9
export type WalletProps = {
  searchNum: number,
  address: string
}

const Wallet: React.FC<WalletProps> = ({
  searchNum,
  address
}) => {
  const intl = useIntl()
  const title = intl.formatMessage({ id: 'title.wallet', defaultMessage: 'WALLET' })

  const changeNum = (num: number) => {
    PopupAPI.setSearchNum(num)
  }
  const [isLoading, setIsLoading] = useState(false)

  const connectWallet = async (type: string) => {
    if (type === 'walletconnect') {
    } else {
      setIsLoading(true)
      PopupAPI.connectWallet(type)
    }
  }

  useEffect(() => {

  }, [])
  return (
    <div className="w-360 page-root page-language">
      <PageHeader title={title} onBack={() => PopupAPI.changeState(APP_STATE.SETTING)} />

      <div className="page-content">
        {
          !address ?
            <div className="setting-list">
              <div className="setting-item flex justify-between items-center"
                onClick={() => connectWallet('metamask')}
              >
                <div className="flex items-center ">
                  <img src={metamaskPng} alt="" style={{ width: 24, height: 24 }} />
                  <div className={`item-text1 ml-1 `}>Connect Metamask</div>

                </div>
                <div className="flex items-center">
                  <div className={`loading-box ${isLoading ? '' : 'hide'}`} style={{ width: 18, height: 18, marginRight: 10 }}>
                    <img src={loadingPng} alt="" className="loading-wrap" style={{ width: 18, height: 18 }} />
                  </div>
                  <img src={leftPng} alt="" style={{ width: 5, height: 7 }} />
                </div>
              </div>
              <div className="setting-item flex justify-between items-center"
                onClick={() => connectWallet('walletconnect')}
              >
                <div className="flex items-center ">
                  <img src={wccPng} alt="" style={{ width: 24, height: 24 }} />
                  <div className={`item-text1 ml-1`}>Connect WalletConnect</div>
                </div>
                <img src={leftPng} alt="" style={{ width: 5, height: 7 }} />
              </div>
            </div> :
            <div className="wallet-card pb-3 pr-3 mt-3">
              <div className=" text-base text-white font-bold">Wallet</div>
              <div className="flex items-center">
                <div className="text-white font-bold text-xs opacity-80 mr-1">{address.slice(0, 6) + '.....' + address.slice(-6)}</div>
                <img src={copyPng} alt="" style={{ width: 16, height: 16 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    navigator.clipboard.writeText(address)
                      .then(() => {
                        Toast.show({ content: 'Copied', position: 'bottom' })
                      })
                  }}
                />
              </div>
              <div className="flex mt-10 justify-end">
                <div
                  onClick={() => {
                    setIsLoading(false)
                    PopupAPI.setAddress()
                  }}
                  className=" hover:opacity-80 border cursor-pointer rounded border-white flex justify-center items-center text-white font-bold text-xs" style={{ width: 103, height: 28 }}>
                  <img src={dicPng} alt="" style={{ width: 14, height: 14, marginRight: 4 }} />
                  Disconnect
                </div>
              </div>
            </div>
        }


      </div>
    </div>
  )
}

export default Wallet