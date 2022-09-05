import React, { useState } from 'react'
import { useIntl } from 'react-intl'

const { PopupAPI } = require('../../../../api')
const eth = require('./images/eth2.png')
const platon = require('./images/platon2.png')
const up = require('./images/up2.png')
const down = require('./images/down.png')
const select = require('./images/select2.png')


const SelectChain: React.FC<any> = () => {
  const intl = useIntl()
  const [chainId, setChainId] = useState(1)
  const [show, setShow] = useState(false)

  const onMouseEnter = (chainId: number) => {
    // setChainId(chainId)
  }
  const onMouseClick = (chainId: number) => {
    setChainId(chainId)
  }

  // const searchPlace = intl.formatMessage('')

  return (
    <div className='select-chain bg-image'>
      <div className='chain-content flex justify-around items-center pl-1 pr-1'
        onClick={() => {
          setShow(true)
        }}
      >
        <img src={eth} alt="" style={{ width: 18, height: 18 }} />
        <span>{chainId === 1 ? 'Ethereum' : 'PlatON'} </span>
        {
          show ? <img src={up} alt="" style={{ width: 10, height: 6 }} /> : <img src={down} alt="" style={{ width: 10, height: 6 }} />
        }
      </div>
      {
        show &&
        <>
          <div className='chain-mask'
            onClick={() => setShow(false)}
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
              }}
            >
              <img src={eth} alt="" style={{ width: 18, height: 18 }} />
              <span className=' ml-1 mr-1'>Ethereum</span>
              {
                chainId === 1 && <img src={select} alt="" style={{ width: 10, height: 6 }} />
              }

            </div>
            <div className={`flex items-center chain-item ${chainId === 2 ? 'active' : ''}`}
              onMouseEnter={() => {
                onMouseEnter(2)
              }}
              onClick={() => {
                onMouseClick(2)
                setShow(false)
              }}
            >
              <img src={platon} alt="" style={{ width: 18, height: 18 }} />
              <span className=' ml-1 mr-1'>PlatON</span>
              {
                chainId === 2 && <img src={select} alt="" style={{ width: 10, height: 6 }} />
              }
            </div>
          </div>
        </>

      }

    </div>
  )
}

export default SelectChain