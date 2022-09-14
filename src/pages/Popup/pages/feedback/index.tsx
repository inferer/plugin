import React, { ChangeEvent, useEffect, useState } from "react";
import { Toast } from 'antd-mobile'
import { useIntl } from 'react-intl'
import { APP_STATE } from "../../config/constants";
import PageHeader from '../components/PageHeader'
const { PopupAPI } = require('../../../../api')
const userPng = require('../setting/images/user.png')
const successPng = require('../setting/images/success.png')

export type FeedBackProps = {
  searchNum: number,
  address: string,
  appState: number,
  pageStack: number[]
}

const FeedBack: React.FC<FeedBackProps> = ({
  searchNum,
  appState,
  pageStack
}) => {
  const intl = useIntl()
  const title = intl.formatMessage({ id: 'title.feedback', defaultMessage: 'FEEDBACK' })
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
  console.log(pageStack, pageStack[pageStack.length - 2])

  return (
    <div className="w-360 page-root page-language">
      <PageHeader title={title} onBack={() => {
        const from = localStorage.getItem('page-from')
        PopupAPI.changeState(from === 'search' ? APP_STATE.SEARCH : APP_STATE.TICKETINFER)
      }} />
      <div className="page-content pt-3">
        {
          !feedSuccess &&
          <div>
            <div className="flex items-center">
              <img src={userPng} alt="" style={{ width: 28, height: 28 }} />
              <div className="text-md font-bold ml-2" style={{ color: 'rgba(63, 70, 100, 0.5)' }}>
                {address && address.slice(0, 6) + '.....' + address.slice(-4)}
              </div>
            </div>
            <div className={`mt-4 border rounded ${focus ? 'bg-image' : ''}`} style={{ padding: 1 }}>
              <div className="bg-white" style={{ borderRadius: 2 }}>
                <textarea className=" w-full p-3 outline-none " placeholder="Please input your feedback content here" style={{ height: 114 }}
                  onChange={(e) => handleChange(e)}
                  onFocus={() => handeFocus(true)}
                  onBlur={() => handeFocus(false)}
                />
              </div>
            </div>
            <div className=" flex items-center justify-center mt-5">
              <button className="submit-btn text-white text-base font-bold flex items-center justify-center"
                onClick={() => handleFeedBack()}
              >
                Submit
              </button>
            </div>
          </div>
        }
        {
          feedSuccess &&
          <div className="feedback-success flex justify-center flex-col items-center">
            <img src={successPng} alt="" style={{ width: 80, height: 80, marginTop: 90 }} />
            <div className=" text-sm font-medium mt-4 mb-3" style={{ color: 'rgba(63, 70, 100, 0.5)' }}>Submit Sucessfully</div>
            <button className="submit-btn text-white text-base font-bold flex items-center justify-center"
              onClick={() => {
                const from = localStorage.getItem('page-from')
                PopupAPI.changeState(from === 'search' ? APP_STATE.SEARCH : APP_STATE.TICKETINFER)
              }}
            >
              Back
            </button>
          </div>
        }

      </div>
    </div>
  )
}

export default FeedBack