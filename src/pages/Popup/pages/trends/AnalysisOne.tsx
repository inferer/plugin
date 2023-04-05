import React, { ChangeEvent, useEffect, useState } from "react";
import './trends.scss';
import { Toast } from 'antd-mobile'
import { useIntl } from 'react-intl'
import { APP_STATE } from "../../config/constants"
import PageHeader from '../components/PageHeader'
import ProjectInfo from "./components/ProjectInfo";
import { AvgPrice } from "./components/AvgPrice";
import HistoryOne from "./components/History";
import OwnerOne from "./components/OwnerOne";
import GoAnl from "./components/GoAnl";
import NftColl from "./components/NftColl";

const { PopupAPI } = require('../../../../api')

export type FeedBackProps = {
  searchNum: number,
  address: string,
  appState: number,
  pageStack: number[],
  goToTicket: (e: any) => void
}

const TrendAnalysisOne: React.FC<FeedBackProps> = ({
  searchNum,
  appState,
  pageStack,
  goToTicket
}) => {
  const intl = useIntl()
  const title = intl.formatMessage({ id: 'title.analysis', defaultMessage: 'ANALYSIS' })
  const [address, setAddress] = useState('')
  const [text, setText] = useState('')
  const [focus, setFocus] = useState(false)
  const [feedSuccess, setFeedSuccess] = useState(false)
  const [nftData, setNftData] = useState<any>({})
  const [nftBaseInfo, setNftBaseInfo] = useState<any>({})
  const [pageFrom, setPageFrom] = useState(0)

  const [isLoading, setIsLoading] = useState(false)
  const [pageData, setPageData] = useState<any>({})

  const getInitData = () => {
    setIsLoading(true)
    const analysis_address = localStorage.getItem('analysis_address') || ''
    const analysis_item: any = JSON.parse(localStorage.getItem('analysis_item') || JSON.stringify({}))

    setNftData(analysis_item)
    PopupAPI.execApiTrends({
      action: 'getNftBaseInfo',
      params: {
        token_id: analysis_item.token_id,
        nft_address: analysis_item.token_address
      }
    }).then((res: any) => {
      setNftBaseInfo(res.data || {})
    })

    PopupAPI.execApiTrends({
      action: 'getAnalysisByAddress',
      params: {
        address: analysis_item.token_address,
        token_id: analysis_item.token_id,
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
    if (appState === APP_STATE.ANALYSISONE_TREND) {
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
        PopupAPI.changeState(Number(from))
      }} />
      <div className="page-content page-content-nofooter pt-3">
        <ProjectInfo
          from={pageFrom}
          nftData={nftData}
          nftBaseInfo={nftBaseInfo}
        />
        <AvgPrice
          priceMonthHistory={pageData.priceMonthHistory}
        />
        <HistoryOne
          txHistory={pageData.txHistory}
        />
        <OwnerOne
          ownerInfo={pageData.ownerInfo}
          infererLabels={pageData.infererLabels}
        />
        <GoAnl goToTicket={() => {
          const analysis_address = pageData?.ownerInfo?.holder_address
          analysis_address && goToTicket({ address: analysis_address, chainid: 1 })
        }} />
        <NftColl
          nftData={nftData}
          nftSeriesInfo={pageData.nftSeriesInfo}
        />
      </div>
    </div>
  )
}

export default TrendAnalysisOne