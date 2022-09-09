import React, { useEffect, useState } from "react";
import { APP_STATE } from "../../config/constants";
import Others from "./Others";

const { PopupAPI } = require('../../../../api')
const linePng = require('./images/line.png')
const user1Png = require('./images/user6.png')
const user2Png = require('./images/user1.png')
const user3Png = require('./images/user2.png')
const user4Png = require('./images/user3.png')
const user5Png = require('./images/user4.png')
const user6Png = require('./images/user5.png')
const infoPng = require('./images/info.png')
const userPng = require('./images/user.png')

const userKey = {
  '1': 'new_users',
  '2': 'real_users',
  '3': 'interacted_users',
  '4': 'nft_active_users',
  '5': 'large_balance_users',
  '6': 'poap_users',
}

const Labels: React.FC<any> = ({ appState, onClick }) => {
  const onItemClick = (page: number) => {
    PopupAPI.changeState(page)
  }
  const [active, setActive] = useState(1)
  const [activeKey, setActiveKey] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const [userData, setUserData] = useState<any>({})
  const [showData, setShowData] = useState([])
  const [matchAddress, setMatchAddress] = useState<any>([])

  useEffect(() => {
    if (appState === APP_STATE.LABELS) {
      PopupAPI.getLabels()
        .then((res: any) => {
          console.log(res)
          if (res.status === 200) {
            setMatchAddress(res.matchAddress)
            setUserData(res.result)
          }
        })
    }

  }, [appState])

  useEffect(() => {
    if (active && userData) {
      let userKey = 'new_users'
      if (active === 2) {
        userKey = 'real_users'
      }
      if (active === 3) {
        userKey = 'interacted_users'
      }
      if (active === 4) {
        userKey = 'nft_active_users'
      }
      if (active === 5) {
        userKey = 'large_balance_users'
      }
      if (active === 6) {
        userKey = 'poap_users'
      }
      const newData = userData[userKey] || []
      const newDataLocal = newData.map((item: any) => {
        let isLocal = false
        if (matchAddress.includes(item.address)) {
          isLocal = true
        }
        return {
          ...item,
          isLocal
        }
      })
      setActiveKey(userKey)
      setShowData(newDataLocal)
    }
  }, [active, userData, matchAddress])

  const onCollectSuccess = (idx: number, is_collected: boolean) => {
    const newData = [...userData[activeKey]];
    (newData[idx] as any).is_collected = !is_collected
    userData[activeKey] = newData
    setShowData(newData as any)
    setUserData(userData)
  }

  return (
    <div className="page-root recommend-page">
      <div className="page-title">
        Labels
      </div>
      <div className="page-content page-home-content pt-3 relative">
        <img src={infoPng} className="w-4 h-4 absolute right-2 top-5" alt=""
          onMouseEnter={() => setShowInfo(true)}
        />
        {
          showInfo &&
          <div className="info-box fixed z-50 top-5 right-2 text-white text-xs font-medium"
            onMouseLeave={() => setShowInfo(false)}
          >
            {/* <img src={infoPng} className="w-4 h-4 absolute right-0 top-2" alt=""
              onClick={() => setShowInfo(false)}
            /> */}
            <div className="flex items-center">
              <img src={userPng} alt="" />
              local users on web page
            </div>
            <div className="flex items-center">
              <img src={user1Png} alt="" />
              users active within 30 days
            </div>
            <div className="flex items-center">
              <img src={user2Png} alt="" />
              users who behave not like bots
            </div>
            <div className="flex items-center">
              <img src={user3Png} alt="" />
              users who had transactions with me before
            </div>
            <div className="flex items-center">
              <img src={user4Png} alt="" />
              users who had many trasactions on nft
            </div>
            <div className="flex items-center">
              <img src={user5Png} alt="" />
              users who holds big amount of tokens
            </div>
            <div className="flex items-center">
              <img src={user6Png} alt="" />
              users who holds poap nft
            </div>
          </div>
        }

        <div className="flex flex-col justify-between select-box ">
          <div className="flex items-center">
            <div
              className={`text1 font-bold flex items-center ${active === 1 ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => setActive(1)}
            >
              <img src={user1Png} alt="" />
              New users
            </div>
            <img src={linePng} alt="" style={{ height: 10, width: 1, marginLeft: 20, marginRight: 20 }} />
            <div
              className={`text1 font-bold flex items-center ${active === 2 ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => setActive(2)}
            >
              <img src={user2Png} alt="" />
              Real users</div>
          </div>
          <div className="flex items-center">
            <div
              className={`text1 font-bold flex items-center ${active === 3 ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => setActive(3)}
            >
              <img src={user3Png} alt="" />
              Interactive users</div>
            <img src={linePng} alt="" style={{ height: 10, width: 1, marginLeft: 20, marginRight: 20 }} />
            <div
              className={`text1 font-bold flex items-center ${active === 4 ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => setActive(4)}
            >
              <img src={user4Png} alt="" />
              Active on NFT</div>
          </div>
          <div className="flex items-center">
            <div
              className={`text1 font-bold flex items-center ${active === 5 ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => setActive(5)}
            >
              <img src={user5Png} alt="" />
              Large balance</div>
            <img src={linePng} alt="" style={{ height: 10, width: 1, marginLeft: 20, marginRight: 20 }} />
            <div
              className={`text1 font-bold flex items-center ${active === 6 ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => setActive(6)}
            >
              <img src={user6Png} alt="" />
              PoAP users</div>
          </div>
        </div>
        <div className="list-wrap overflow-auto" style={{ height: 380 }} >
          <Others showData={showData} activeKey={activeKey} active={active} onCollectSuccess={onCollectSuccess}
            onClick={(e: any) => {
              onClick && onClick(e)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Labels