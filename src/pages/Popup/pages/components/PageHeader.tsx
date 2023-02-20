import React, { useState } from "react";

const backtPng = require('../setting/images/back.png')
const backWhitePng = require('../setting/images/back_white.png')

export type PageHeaderProps = {
  title: string,
  tip?: React.ReactElement,
  onBack?: () => void
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  tip,
  onBack
}) => {
  const [active, setActive] = useState(false)

  return (
    <div className="relative flex justify-center items-center">
      <img src={title === 'Inferer Label' ? backWhitePng : backtPng} className="w-6 h-6 relative -ml-2 cursor-pointer" alt=""
        onClick={(e) => {
          e.stopPropagation()
          if (onBack) {
            onBack()
          }
        }}
      />
      <div className=" w-full flex justify-center pr-6 relative cursor-pointer"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <div className={title === 'Inferer Label' ? 'page-title3 uppercase' : 'page-title2 uppercase'}>{title}</div>
        {
          tip && active && <div className=" absolute title-tip">
            {tip}
          </div>
        }
      </div>


    </div>

  )
}

export default PageHeader