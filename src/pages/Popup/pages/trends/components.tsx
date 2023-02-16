import React, { useState } from 'react'

const LikePng = require('./images/dup.png');
const Like1Png = require('./images/dup1.png');
const DownPng = require('./images/ddown.png');
const Down2Png = require('./images/dup2.png');

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
