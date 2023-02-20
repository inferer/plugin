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

const TrendAnalysisOne: React.FC<FeedBackProps> = ({
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
        PopupAPI.changeState(APP_STATE.PRICECOLL_TREND)
      }} />
      <div className="page-content pt-3">
        <ProjectInfo />
      </div>
    </div>
  )
}

export default TrendAnalysisOne