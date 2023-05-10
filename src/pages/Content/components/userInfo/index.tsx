import React, { useEffect, useState } from "react";
import './index.scss';
import {
  LogoBgPng,
  bg1Png,
  CopyPng,
  bg2Png,
  bg3Png,
  bg4Png,
  details3Png,
  RankingNo,
  details1Png,
  details2Png
} from '../image'
import Loading from "../Loading";
import { Toast } from "antd-mobile";
import { formatAddress } from "../../../Popup/utils";

const fortmatTime = (str: string) => {
  return str ? str.slice(0, -3).replace(',', '') : ''
}

const UserInfo = ({ userName, userAddress }: { userName: string, userAddress: string }) => {

  const [accountRank, setaccountRank] = useState<any>({})
  const [accountInfo, setaccountInfo] = useState<any>({})

  useEffect(() => {
    if (userAddress) {
      // @ts-ignore
      const localQueryUserInfo = window.localQueryUserInfo
      if (localQueryUserInfo && localQueryUserInfo[userAddress]) {
        setaccountRank(localQueryUserInfo[userAddress] || {})
      } else {
        // @ts-ignore
        window.injectPlugin.extension.commonRequest({
          action: 'queryUserInfo',
          params: {
            action: 'getRedditInfoByAddress',
            address: userAddress
          }
        }, (res: any) => {
          setaccountRank(res.accountRank || {})
          // @ts-ignore
          if (!window.localQueryUserInfo) {
            // @ts-ignore
            window.localQueryUserInfo = {}
          }
          // @ts-ignore
          window.localQueryUserInfo[userAddress] = res.accountRank
        })
      }
      // @ts-ignore
      const localSearchByAddress = window.localSearchByAddress
      if (localSearchByAddress && localSearchByAddress[userAddress]) {
        setaccountInfo(localSearchByAddress[userAddress] || { 'Account Balance': '-1' })
      } else {
        // @ts-ignore
        window.injectPlugin.extension.commonRequest({
          action: 'searchByAddress',
          params: {
            action: 'searchByAddress',
            address: userAddress,
            chainid: 137
          }
        }, (res: any) => {
          console.log(res)
          setaccountInfo(res.info || { 'Account Balance': '-1' })
          // @ts-ignore
          if (!window.localSearchByAddress) {
            // @ts-ignore
            window.localSearchByAddress = {}
          }
          // @ts-ignore
          window.localSearchByAddress[userAddress] = res.info
        })
      }

    }

  }, [userAddress])

  return (
    <div className="w-full h-full inferer-userinfo-content">
      <div style={{ backgroundImage: `url(${bg1Png})` }} className="user-header relative flex items-center justify-center">
        <img src={LogoBgPng} className="inferer-logo" alt="" />
        <div>
          <div className="user-title">{userName}</div>
          <div className="user-address flex items-center justify-center">
            {formatAddress(userAddress)}
            <img src={CopyPng} className="w-3 h-3 ml-1 cursor-pointer" alt=""
              onClick={(e) => {
                e.stopPropagation()
                navigator.clipboard.writeText(userAddress)
                  .then(() => {
                    Toast.show({ content: 'Copied', position: 'top' })
                  })
              }}

            />
          </div>
        </div>
      </div>
      <div className="p-5">
        <div style={{ backgroundImage: `url(${bg2Png})` }} className="ranking-wrap p-3">
          <div className="inferer-title">Ranking</div>
          <div className="flex justify-between items-center mt-5">
            <div className="flex items-center">
              <img src={RankingNo} className=" w-6 h-6 mr-2" />
              <div className="text1">Top Price Avatar</div>
            </div>
            <div className="text2">No.{accountRank.account_rank}</div>
          </div>
        </div>
        <div style={{ backgroundImage: `url(${bg3Png})` }} className="details-wrap p-3 mt-5">
          <div className="inferer-title">Details</div>
          {
            !accountInfo['Account Balance'] ?
              <div className="mt-11 flex items-center justify-center">
                <Loading size={20} />
              </div> :
              <div className="mt-5">
                <div className="box px-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={details1Png} className="details-icon " />
                    <div className="text1">Transaction count</div>
                  </div>
                  <div className="text2">{accountInfo['User Total Tx Count']}</div>
                </div>
                <div style={{ backgroundColor: '#F8F9FF' }} className="box px-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={details2Png} className="details-icon " />
                    <div className="text1">First Tx Timestamp</div>
                  </div>
                  <div className="text2">{fortmatTime(accountInfo['User First Tx Timestamp'])}</div>
                </div>
                <div className="box px-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={details2Png} className="details-icon " />
                    <div className="text1">Latest Tx Timestamp</div>
                  </div>
                  <div className="text2">{fortmatTime(accountInfo['User Latest Tx Timestamp'])}</div>
                </div>
              </div>
          }
        </div>
        <div style={{ backgroundImage: `url(${bg4Png})` }} className="labels-wrap p-3 mt-5">
          <div className="inferer-title flex items-center">
            Inferer Labels
            <img src={details3Png} className="w-3 h-3 ml-1" alt="" />
          </div>

          {
            !accountInfo['Account Balance'] ?
              <div className="mt-5 flex items-center justify-center">
                <Loading size={20} />
              </div> :
              <div className="flex flex-wrap mt-3">
                {
                  accountInfo['Inferer Label'] && Object.keys(accountInfo['Inferer Label']).slice(0, 6).map((label: any) => {
                    return (
                      <div key={label} className="infer-label">
                        <div className="color-image">{label}</div>
                      </div>
                    )
                  })
                }
              </div>
          }


        </div>
      </div>
    </div>
  )
}

export default UserInfo