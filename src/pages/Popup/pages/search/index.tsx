import React from "react"
import { useIntl } from 'react-intl'
import SelectChain from "./SelectChain"

const logoPng = require('../../../../assets/img/logo2.png')
const searchPng = require('../../../../assets/img/search_white.png')



const Search = () => {
  const intl = useIntl()
  const holder = intl.formatMessage({ id: 'Search address identity', defaultMessage: 'Search address identity' })
  return (
    <div className="page-root relative">
      <SelectChain />
      <div className=" flex justify-center pt-32">
        <img src={logoPng} alt="" />
      </div>
      <div className="flex justify-center mt-10">
        <input type="text" className=" outline-none search-input " placeholder={holder} />
        <div className="search-btn flex justify-center items-center hover:opacity-80">
          <img src={searchPng} className=" w-6 h-6" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Search