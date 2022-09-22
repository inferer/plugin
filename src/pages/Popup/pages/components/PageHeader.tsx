import React from "react";

const backtPng = require('../setting/images/back.png')
const backWhitePng = require('../setting/images/back_white.png')

export type PageHeaderProps = {
  title: string,
  onBack?: () => void
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  onBack
}) => {
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
      <div className=" w-full flex justify-center pr-6">
        <div className={title === 'Inferer Label' ? 'page-title3' : 'page-title2' }>{title}</div>
      </div>
    </div>

  )
}

export default PageHeader