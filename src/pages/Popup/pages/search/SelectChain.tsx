import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

const { PopupAPI } = require('../../../../api')
const eth = require('./images/eth3.png')
const platon = require('./images/platon3.png')
const up = require('./images/up2.png')
const down = require('./images/down.png')
const select = require('./images/select2.png')


const SelectChain: React.FC<any> = () => {
  const intl = useIntl()
  const [chainId, setChainId] = useState(1)
  const [show, setShow] = useState(false)
  const [showList, setShowList] = useState(false)

  const onMouseEnter = (chainId: number) => {
    // setChainId(chainId)
  }
  const onMouseClick = (chainId: number) => {
    setChainId(chainId)
    localStorage.setItem('chainid', String(chainId))
    PopupAPI.setChainId(chainId === 1 ? 1 : 210425)
  }
  useEffect(() => {
    if (localStorage.getItem('chainid')) {
      const chainid = Number(localStorage.getItem('chainid'))
      setChainId(chainid)
      PopupAPI.setChainId(chainid)
    }
  }, [])
  // const searchPlace = intl.formatMessage('')

  return (
    <div className={`select-chain ${show || showList ? 'bg-image' : ''}`}>
      <div className='chain-content flex justify-around items-center pl-1 pr-1'
        onClick={() => {
          setShowList(true)
        }}
        onMouseEnter={() => {
          setShow(true)
        }}
        onMouseLeave={() => {
          setShow(false)
        }}
      >
        <img src={chainId === 1 ? eth : platon} alt="" style={{ width: 18, height: 18 }} />
        <span style={{ width: 60 }}>{chainId === 1 ? 'Ethereum' : 'PlatON'} </span>
        {
          showList ? <img src={up} alt="" style={{ width: 10, height: 6 }} /> : <img src={down} alt="" style={{ width: 10, height: 6 }} />
        }
      </div>
      {
        showList &&
        <>
          <div className='chain-mask'
            onClick={() => {
              setShowList(false)
              setShow(false)
            }}
          ></div>
          <div className='chain-list'>
            <div className='flex items-center chain-item item1'>Select a network</div>
            <div className={`flex items-center chain-item ${chainId === 1 ? 'active' : ''}`}
              onMouseEnter={() => {
                onMouseEnter(1)
              }}
              onClick={() => {
                onMouseClick(1)
                setShow(false)
                setShowList(false)
              }}
            >
              <img src={eth} alt="" style={{ width: 18, height: 18 }} />
              <span className=' ml-1 mr-1'>Ethereum</span>
              {
                chainId === 1 && <img src={select} className="select" alt="" style={{ width: 10, height: 6 }} />
              }

            </div>
            <div className={`flex items-center chain-item ${chainId === 2 ? 'active' : ''}`}
              onMouseEnter={() => {
                onMouseEnter(2)
              }}
              onClick={() => {
                onMouseClick(2)
                setShow(false)
                setShowList(false)
              }}
            >
              <img src={platon} alt="" style={{ width: 18, height: 18 }} />
              <span className=' ml-1 mr-1'>PlatON</span>
              {
                chainId === 2 && <img src={select} className="select" alt="" style={{ width: 10, height: 6 }} />
              }
            </div>
          </div>
        </>

      }

    </div>
  )
}

export default SelectChain