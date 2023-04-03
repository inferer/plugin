import React, { ChangeEvent, useEffect, useState } from "react";
import './trends.scss';
import { Toast } from 'antd-mobile'
import { useIntl } from 'react-intl'
import { APP_STATE } from "../../config/constants"
import PageHeader from '../components/PageHeader'
import { BuyIcon, CollectIcon, Like, MsgIcon, ShareIcon, StarList, TTitle, UnLike } from "./components/components";
import { VolumePrice } from "./components/Blocks";
import InfererScore from "./components/InfererScore";
import HoldingAmount from "./components/HoldingAmount";
import InfererLabels from "./components/InfererLabels";
import ProjectInfo from "./components/ProjectInfo";

const { PopupAPI } = require('../../../../api')
const userPng = require('../setting/images/user.png')
const successPng = require('../setting/images/success.png')
const DemoPng = require('./images/demo.png');

export type FeedBackProps = {
  searchNum: number,
  address: string,
  appState: number,
  pageStack: number[]
}

const TrendAnalysis: React.FC<FeedBackProps> = ({
  searchNum,
  appState,
  pageStack
}) => {
  const intl = useIntl()
  const title = intl.formatMessage({ id: 'title.analysis', defaultMessage: 'ANALYSIS' })
  const [address, setAddress] = useState('')
  const [text, setText] = useState('')
  const [focus, setFocus] = useState(false)
  const [feedSuccess, setFeedSuccess] = useState(false)
  const [pageFrom, setPageFrom] = useState(0)
  const [nftData, setNftData] = useState<any>({})
  const [nftBaseInfo, setNftBaseInfo] = useState<any>({})

  const [isLoading, setIsLoading] = useState(false)
  const [pageData, setPageData] = useState<any>({})

  const getInitData = () => {
    setIsLoading(true)
    const analysis_address = localStorage.getItem('analysis_address') || ''
    const analysis_item: any = JSON.parse(localStorage.getItem('analysis_item') || JSON.stringify({}))

    setNftData(analysis_item)
    PopupAPI.execApiTrends({
      action: 'getNFTCollBaseInfo',
      params: {
        nft_address: analysis_item.token_address
      }
    }).then((res: any) => {
      setNftBaseInfo(res.data || {})
    })

    PopupAPI.execApiTrends({
      action: 'getCollAnalysisByAddress',
      params: {
        address: analysis_address
      }
    }).then((res: any) => {
      if (res.status === 200) {
        setPageData(res.data || {})
      }
      setIsLoading(false)
    })
  }

  useEffect(() => {
    setPageFrom(Number(localStorage.getItem('page-from') || ''))
    if (appState === APP_STATE.ANALYSIS_TREND) {
      setIsLoading(false)
      getInitData()
    } else {
      setIsLoading(false)
    }
  }, [appState])

  return (
    <div className="w-360 page-root page-trend page-analysis">
      <PageHeader title={title} onBack={() => {
        const from = localStorage.getItem('page-from')
        if (Number(from) === APP_STATE.PRICECOLL_TREND) {
          PopupAPI.changeState(APP_STATE.PRICECOLL_TREND)
        } else {
          PopupAPI.changeState(APP_STATE.POPULARCOLL_TREND)
        }
      }} />
      <div className="page-content page-content-nofooter pt-3">
        <ProjectInfo
          nftData={nftData}
          nftBaseInfo={nftBaseInfo}
          from={pageFrom}
        />
        <VolumePrice
          volumeMonthHistory={pageData.volumeMonthHistory}
          priceMonthHistory={pageData.priceMonthHistory}
        />
        <InfererScore
          infererAnalysis={pageData.infererAnalysis}
        />
        <HoldingAmount
          infererAnalysis={pageData.infererAnalysis}
          itemData={pageData.holderPrecent}
        />
        <InfererLabels
          infererLabels={pageData.infererLabels}
        />
      </div>
    </div>
  )
}

export default TrendAnalysis