import React, { useState } from "react"
import { useIntl } from 'react-intl'
import { APP_STATE } from "../../config/constants"
import DataItem1 from "./DataItem1"
import DataItem2 from "./DataItem2"
import SelectChain from "./SelectChain"

const { PopupAPI } = require('../../../../api')
const logoPng = require('../../../../assets/img/icon-128.png')
const logoTPng = require('../../../../assets/img/inferer.png')
const searchPng = require('../../../../assets/img/search_white.png')
const ticket_scorePng = require('../../../../assets/img/ticket_score.png')
const ttipPng = require('../../../../assets/img/ttip.png')
const star1Png = require('../../../../assets/img/star1.png')
const star2Png = require('../../../../assets/img/star2.png')


const Search = () => {
  const intl = useIntl()
  const holder = intl.formatMessage({ id: 'Search address identity', defaultMessage: 'Search address identity' })

  const [focus, setFocus] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const onSearch = () => {
    setShowResult(!showResult)
  }

  return (
    <div className="page-root relative search-page">
      {
        !focus && <SelectChain />
      }

      <img src={logoPng} className={`img-logo ${focus ? 'left-position' : ''}`} alt="" />
      <img src={logoTPng} className={`img-logo2 ${focus ? 'left-position' : ''}`} alt="" />

      <div className={`flex justify-center search-wrap ${focus ? 'left-position' : ''}`}>
        <input type="text" className=" outline-none search-input " placeholder={holder}
          onFocus={() => setFocus(true)}
        />
        <div className="search-btn flex justify-center items-center hover:opacity-80"
          onClick={() => {
            onSearch()
          }}
        >
          <img src={searchPng} className=" w-6 h-6" alt="" />
        </div>
      </div>
      <div className={`search-result overflow-auto pb-4 ${showResult ? 'show' : ''}`} style={{ height: 402 }}>
        <div className="ticket-score flex flex-col justify-center">
          <div className="flex items-center justify-center">
            <img src={ticket_scorePng} alt="" style={{ width: 20, height: 20 }} />
            <div className="text-base text-white font-bold ml-2">Evaluation Ticket</div>
          </div>
          <div className="flex items-center justify-center mt-2">
            <div className="flex items-center">
              <img src={star1Png} alt="" style={{ width: 16, height: 16 }} />
              <img src={star1Png} alt="" style={{ width: 16, height: 16 }} />
              <img src={star1Png} alt="" style={{ width: 16, height: 16 }} />
              <img src={star1Png} alt="" style={{ width: 16, height: 16 }} />
              <img src={star1Png} alt="" className=" opacity-30" style={{ width: 16, height: 16 }} />
            </div>
            <div className="text-base text-white font-bold mx-2" style={{ fontSize: 20 }}>4.0</div>
            <img src={ttipPng} alt="" style={{ width: 20, height: 20 }} />
          </div>
        </div>
        <div className="flex items-baseline mt-4">
          <div className="text-base font-bold color-image">Key Info</div>
          <div className="text-xs ml-1" style={{ color: 'rgba(127, 135, 146, 0.7)' }}>update: 7/22/2022</div>
        </div>
        <div className="result-list mt-4">
          <DataItem1 />
          <DataItem1 />
          <DataItem1 />
          <DataItem1 />
          <DataItem1 />
          <DataItem2 />
          <DataItem2 />
        </div>
        <div
          onClick={() => PopupAPI.changeState(APP_STATE.FEEDBACK)}
          className="text-xs mt-3 flex justify-end cursor-pointer" style={{ color: 'rgba(63, 70, 100, 0.3)' }}>
          Incorrect? Feedback us
        </div>
      </div>
    </div>
  )
}

export default Search