import React, { useState } from 'react'

const LikePng = require('../images/dup.png');
const Like1Png = require('../images/dup1.png');
const DownPng = require('../images/ddown.png');
const Down2Png = require('../images/dup2.png');
const Star2Png = require('../images/star2.png');
const Star1Png = require('../images/star1.png');
const CollectPng = require('../images/shoucang.png');
const Collect2Png = require('../images/shoucang_active.png');
const SharePng = require('../images/share2.png');
const Share2Png = require('../images/share2_active.png');
const BuyPng = require('../images/buy.png');
const Buy2Png = require('../images/buy_active.png');
const MsgPng = require('../images/msg.png');
const Msg2Png = require('../images/msg_active.png');
const InfoPng = require('../images/info.png');


export const Like: React.FC<{
  isLike?: boolean
}> = ({
  isLike
}) => {
    const [hover, setHover] = useState(false)
    const handleHover = () => {
      setHover(true)
    }
    const handleLeave = () => {
      setHover(false)
    }
    return (
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className={`flex items-center cursor-pointer like-wrap ${isLike || hover ? 'is-like' : ''}`}>
        <img src={isLike || hover ? Like1Png : LikePng} alt="" />
        <div className={`text ${isLike || hover ? 'up' : ''}`}>888</div>
      </div>
    )
  }


export const UnLike: React.FC<{
  isLike?: boolean
}> = ({
  isLike
}) => {
    const [hover, setHover] = useState(false)
    const handleHover = () => {
      setHover(true)
    }
    const handleLeave = () => {
      setHover(false)
    }
    return (
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className={`flex items-center cursor-pointer like-wrap ${isLike || hover ? 'is-like' : ''}`}>
        <img src={isLike || hover ? Down2Png : DownPng} alt="" />
        <div className={`text ${isLike || hover ? 'down' : ''}`}>222</div>
      </div>
    )
  }

export const StarList: React.FC<{
  score: number
}> = ({
  score
}) => {

    return (
      <div className='flex items-center star-list'>
        {
          new Array(5).fill('').map((item, index) => {
            return <img key={index} src={index < score ? Star1Png : Star2Png} alt="" />
          })
        }
      </div>
    )
  }

export const CollectIcon: React.FC<{
  onClick?: () => void
}> = ({
  onClick
}) => {
    const [active, setActive] = useState(false)
    return (
      <div className='icon-wrap cursor-pointer shrink-0'
        onClick={e => {
          e.stopPropagation()
          onClick && onClick()
        }}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <img src={active ? Collect2Png : CollectPng} alt="" />
      </div>
    )
  }

export const ShareIcon: React.FC<{
  onClick?: () => void
}> = ({
  onClick
}) => {
    const [active, setActive] = useState(false)
    return (
      <div className='icon-wrap cursor-pointer shrink-0'
        onClick={e => {
          e.stopPropagation()
          onClick && onClick()
        }}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <img src={active ? Share2Png : SharePng} alt="" />
      </div>
    )
  }

export const BuyIcon: React.FC<{
  onClick?: () => void
}> = ({
  onClick
}) => {
    const [active, setActive] = useState(false)
    return (
      <div className='icon-wrap cursor-pointer shrink-0'
        onClick={e => {
          e.stopPropagation()
          onClick && onClick()
        }}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <img src={active ? Buy2Png : BuyPng} alt="" />
      </div>
    )
  }

export const MsgIcon: React.FC<{
  onClick?: () => void
}> = ({
  onClick
}) => {
    const [active, setActive] = useState(false)
    return (
      <div className='icon-wrap cursor-pointer shrink-0'
        onClick={e => {
          e.stopPropagation()
          onClick && onClick()
        }}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <img src={active ? Msg2Png : MsgPng} alt="" />
      </div>
    )
  }
export const TTitle: React.FC<{
  text: string,
  tips?: string
}> = ({
  text,
  tips
}) => {
    const [active, setActive] = useState(false)
    return (
      <div className=' font-bold text-sm flex items-center relative'
      >
        <div className='' style={{ lineHeight: '18px' }}>{text}</div>
        {
          tips && <img src={InfoPng} className="ml-1 w-3 h-3 cursor-pointer" alt=""
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
          />
        }
        {
          active && <div className='tips-wrap'>
            {tips}
          </div>
        }

      </div>
    )
  }