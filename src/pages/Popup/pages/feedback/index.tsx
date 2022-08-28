import React, { ChangeEvent, useState } from "react";
import { useIntl } from 'react-intl'
import { APP_STATE } from "../../config/constants";
import PageHeader from '../components/PageHeader'
const { PopupAPI } = require('../../../../api')
const userPng = require('../setting/images/user.png')
const successPng = require('../setting/images/success.png')

export type FeedBackProps = {
  searchNum: number,
}

const FeedBack: React.FC<FeedBackProps> = ({
  searchNum
}) => {
  const intl = useIntl()
  const title = intl.formatMessage({ id: 'title.feedback', defaultMessage: 'FEEDBACK' })

  const [text, setText] = useState('')
  const [focus, setFocus] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handeFocus = (flag: boolean) => {
    setFocus(flag)
  }

  return (
    <div className="w-360 page-root page-language">
      <PageHeader title={title} onBack={() => PopupAPI.changeState(APP_STATE.SETTING)} />
      <div className="page-content pt-3">
        <div>
          <div className="flex items-center">
            <img src={userPng} alt="" style={{ width: 28, height: 28 }} />
            <div className="text-md font-bold ml-2" style={{ color: 'rgba(63, 70, 100, 0.5)' }}>0x8eb8.....3f23</div>
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
            <button className="submit-btn text-white text-base font-bold flex items-center justify-center">
              Submit
            </button>
          </div>
        </div>
        <div className="feedback-success flex justify-center flex-col items-center">
          <img src={successPng} alt="" style={{ width: 80, height: 80, marginTop: 90 }} />
          <div className=" text-sm font-medium mt-4 mb-3" style={{ color: 'rgba(63, 70, 100, 0.5)' }}>Submit Sucessfully</div>
          <button className="submit-btn text-white text-base font-bold flex items-center justify-center">
            Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeedBack