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

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handeFocus = (flag: boolean) => {
    setFocus(flag)
  }

  const handleFeedBack = async () => {
    if (!address) {
      Toast.show('Please connect wallet')
      return
    }
    const res = await PopupAPI.feedBack({
      address: address,
      content: text,
      chainid: 1
    })
    if (res.status === 200) {
      setFeedSuccess(true)
    } else {
      Toast.show({
        content: 'Submit failed',
        position: "bottom"
      })
    }
  }
  useEffect(() => {
    if (appState === APP_STATE.FEEDBACK) {
      const address = localStorage.getItem('search_address') ?? ''
      setAddress(address)
      setFeedSuccess(false)
    }
  }, [appState])

  return (
    <div className="w-360 page-root page-trend page-analysis">
      <PageHeader title={title} onBack={() => {
        const from = localStorage.getItem('page-from')
        PopupAPI.changeState(Number(from))
      }} />
      <div className="page-content page-content-nofooter pt-3">
        <ProjectInfo />
        <AvgPrice />
        <HistoryOne />
        <OwnerOne />
        <GoAnl goToTicket={() => {
          goToTicket({ address: '0x3924b7681c6110fcd3628164388c3307f79d1059', chainid: 1 })
        }} />
        <NftColl />
      </div>
    </div>
  )
}

export default TrendAnalysisOne