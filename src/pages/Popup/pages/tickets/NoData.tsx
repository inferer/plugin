import React from 'react'

const nodataPng = require('./images/nodata.png')

const NoData: React.FC<any> = ({ onClick }) => {
  return (
    <div className='no-data h-full flex mt-16 items-center flex-col cursor-pointer'>
      <img src={nodataPng} alt="" style={{ width: 201, height: 140 }} />
      <div className=' text-base font-bold mt-8 mb-4' style={{ color: 'rgba(63, 70, 100, 0.5)' }}>Start by searching address idendity</div>
      <div className='btn-start flex justify-center items-center text-white font-bold'
        onClick={() => {
          onClick && onClick()
        }}

      >Start Search</div>
    </div>
  )
}

export default NoData