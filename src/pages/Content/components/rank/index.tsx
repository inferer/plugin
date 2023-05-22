import React, { useEffect, useState } from 'react';
import '../../../Popup/tailwind.min.css'
import './index.css';
import '../../../Popup/reddit.scss'
import './trends.scss'
import TrendItem from './TrendItem';
import { APP_STATE } from '../../../Popup/config/constants';
import TrendItem2 from './TrendItem2';
import { morePng } from '../image';

const pageList = [APP_STATE.PRICEONE_TREND, APP_STATE.POPULARONE_TREND, APP_STATE.PRICECOLL_TREND, APP_STATE.POPULARCOLL_TREND, APP_STATE.TOPACCOUNT_TREND, APP_STATE.ACTIVEACCOUNT_TREND, APP_STATE.TOPPROFIT_TREND]

const apiList = {
  [APP_STATE.PRICEONE_TREND]: 'getTopPrice',
  [APP_STATE.POPULARONE_TREND]: 'getTopPopular',
  [APP_STATE.PRICECOLL_TREND]: 'getTopPriceColl',
  [APP_STATE.POPULARCOLL_TREND]: 'getTopPopularColl',
  [APP_STATE.TOPACCOUNT_TREND]: 'getTopAccounts',
  [APP_STATE.ACTIVEACCOUNT_TREND]: 'getTopActiveUsers',
  [APP_STATE.TOPPROFIT_TREND]: 'getTopProfitRatios',
}

const titleList = {
  [APP_STATE.PRICEONE_TREND]: 'Top Price Avatar',
  [APP_STATE.POPULARONE_TREND]: 'Top Popular Avatar',
  [APP_STATE.PRICECOLL_TREND]: 'Top Price Avatar(Coll.)',
  [APP_STATE.POPULARCOLL_TREND]: 'Top Popular Avatar(Coll.)',
  [APP_STATE.TOPACCOUNT_TREND]: 'Top Accounts',
  [APP_STATE.ACTIVEACCOUNT_TREND]: 'Top Active Users',
  [APP_STATE.TOPPROFIT_TREND]: 'Top Profit Ratios',
}

const randomIndex = () => {
  return parseInt(String(Math.random() * 7))
}

const RankList = () => {
  const [nowTime, setNowTime] = useState('')
  const [pageDataList, setPageDataList] = useState([])
  const [pageIndex, setPageIndex] = useState(0)
  const [title, setTitle] = useState('')

  useEffect(() => {
    // const pageNo = pageList[randomIndex()]
    const pageNo = APP_STATE.TOPACCOUNT_TREND
    const pageApi = apiList[pageNo]
    const pageTitle = titleList[pageNo]

    setTitle(pageTitle)
    setPageIndex(pageNo)

    // @ts-ignore
    window.injectPlugin.extension.commonRequest({
      action: 'queryRankData',
      params: {
        action: pageApi
      }
    }, (res: any) => {
      setPageDataList(res.slice(0, 5))
    })
  }, [])

  const ItemCom = (pageIndex === APP_STATE.PRICEONE_TREND ||
    pageIndex === APP_STATE.POPULARONE_TREND ||
    pageIndex === APP_STATE.PRICECOLL_TREND ||
    pageIndex === APP_STATE.POPULARCOLL_TREND) ? TrendItem : TrendItem2

  return (
    <div className="OptionsContainer">
      <div className='inferer-rank-title flex items-center'>
        <span className=' mr-2'>
          <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="path-2-inside-1_624_2525" fill="white">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.93214 5.72465L7.93281 5.72509L7.93209 5.72473L7.93214 5.72465ZM7.93209 5.72473L6.21213 8.68556L3.10938 3.35156L7.93209 5.72473ZM7.93138 12.539L7.93143 12.539L7.9321 12.5386L7.93138 12.539ZM6.21142 9.57812L7.93138 12.539L6.21344 13.3844L5.10625 11.4782L6.21142 9.57812ZM5.79241 13.5905L3.10938 14.9109L4.83564 11.9434L5.79241 13.5905ZM6.48633 9.11901L8.35474 5.90234L14.8919 9.11901L8.35563 12.3352L8.35474 12.3357L6.48633 9.11901Z" />
            </mask>
            <path fillRule="evenodd" clipRule="evenodd" d="M7.93214 5.72465L7.93281 5.72509L7.93209 5.72473L7.93214 5.72465ZM7.93209 5.72473L6.21213 8.68556L3.10938 3.35156L7.93209 5.72473ZM7.93138 12.539L7.93143 12.539L7.9321 12.5386L7.93138 12.539ZM6.21142 9.57812L7.93138 12.539L6.21344 13.3844L5.10625 11.4782L6.21142 9.57812ZM5.79241 13.5905L3.10938 14.9109L4.83564 11.9434L5.79241 13.5905ZM6.48633 9.11901L8.35474 5.90234L14.8919 9.11901L8.35563 12.3352L8.35474 12.3357L6.48633 9.11901Z" fill="url(#paint0_linear_624_2525)" />
            <path d="M7.93281 5.72509L7.89403 5.8039L7.981 5.65166L7.93281 5.72509ZM7.93214 5.72465L7.98033 5.65122L7.9026 5.6002L7.85609 5.6807L7.93214 5.72465ZM6.21213 8.68556L6.13621 8.72972L6.21218 8.86033L6.28808 8.72968L6.21213 8.68556ZM3.10938 3.35156L3.14816 3.27275L2.88723 3.14436L3.03345 3.39573L3.10938 3.35156ZM7.93143 12.539L7.85562 12.5834L7.90223 12.663L7.97947 12.6126L7.93143 12.539ZM7.9321 12.5386L7.98014 12.6121L7.8933 12.4598L7.9321 12.5386ZM6.21142 9.57812L6.28737 9.53401L6.21147 9.40335L6.1355 9.53396L6.21142 9.57812ZM6.21344 13.3844L6.13749 13.4285L6.17866 13.4994L6.25222 13.4632L6.21344 13.3844ZM5.10625 11.4782L5.03033 11.434L5.00466 11.4781L5.0303 11.5223L5.10625 11.4782ZM3.10938 14.9109L3.03345 14.8667L2.88722 15.1181L3.14816 14.9897L3.10938 14.9109ZM5.79241 13.5905L5.83119 13.6693L5.91563 13.6278L5.86836 13.5464L5.79241 13.5905ZM4.83564 11.9434L4.91159 11.8992L4.83569 11.7686L4.75972 11.8992L4.83564 11.9434ZM8.35474 5.90234L8.39351 5.82353L8.31996 5.78734L8.27879 5.85823L8.35474 5.90234ZM6.48633 9.11901L6.41038 9.0749L6.38475 9.11901L6.41038 9.16313L6.48633 9.11901ZM14.8919 9.11901L14.9307 9.19782L15.0909 9.11901L14.9307 9.0402L14.8919 9.11901ZM8.35563 12.3352L8.31685 12.2564L8.31684 12.2564L8.35563 12.3352ZM8.35474 12.3357L8.27879 12.3798L8.31997 12.4507L8.39353 12.4145L8.35474 12.3357ZM7.981 5.65166L7.98033 5.65122L7.88394 5.79807L7.88461 5.79852L7.981 5.65166ZM7.89331 5.80354L7.89403 5.8039L7.97159 5.64628L7.97087 5.64592L7.89331 5.80354ZM7.85609 5.6807L7.85604 5.68079L8.00814 5.76867L8.00819 5.76859L7.85609 5.6807ZM6.28808 8.72968L8.00804 5.76885L7.85614 5.68061L6.13618 8.64144L6.28808 8.72968ZM3.03345 3.39573L6.13621 8.72972L6.28805 8.64139L3.1853 3.3074L3.03345 3.39573ZM7.97087 5.64592L3.14816 3.27275L3.07059 3.43037L7.89331 5.80354L7.97087 5.64592ZM8.00724 12.4947L8.00719 12.4946L7.85557 12.5833L7.85562 12.5834L8.00724 12.4947ZM7.88406 12.4651L7.88339 12.4655L7.97947 12.6126L7.98014 12.6121L7.88406 12.4651ZM7.97018 12.6178L7.9709 12.6174L7.8933 12.4598L7.89258 12.4602L7.97018 12.6178ZM8.00733 12.4948L6.28737 9.53401L6.13548 9.62224L7.85543 12.5831L8.00733 12.4948ZM6.25222 13.4632L7.97016 12.6178L7.8926 12.4601L6.17466 13.3056L6.25222 13.4632ZM5.0303 11.5223L6.13749 13.4285L6.28939 13.3403L5.1822 11.4341L5.0303 11.5223ZM6.1355 9.53396L5.03033 11.434L5.18217 11.5223L6.28735 9.62229L6.1355 9.53396ZM3.14816 14.9897L5.83119 13.6693L5.75363 13.5117L3.07059 14.8321L3.14816 14.9897ZM4.75972 11.8992L3.03345 14.8667L3.1853 14.955L4.91156 11.9875L4.75972 11.8992ZM5.86836 13.5464L4.91159 11.8992L4.75969 11.9875L5.71646 13.6346L5.86836 13.5464ZM8.27879 5.85823L6.41038 9.0749L6.56228 9.16313L8.43069 5.94646L8.27879 5.85823ZM14.9307 9.0402L8.39351 5.82353L8.31596 5.98115L14.8531 9.19782L14.9307 9.0402ZM8.39441 12.4141L14.9307 9.19782L14.8531 9.0402L8.31685 12.2564L8.39441 12.4141ZM8.39353 12.4145L8.39442 12.414L8.31684 12.2564L8.31594 12.2569L8.39353 12.4145ZM6.41038 9.16313L8.27879 12.3798L8.43069 12.2916L6.56228 9.0749L6.41038 9.16313Z" fill="url(#paint1_linear_624_2525)" mask="url(#path-2-inside-1_624_2525)" />
            <rect x="0.25" y="0.380859" width="17.5" height="17.5" rx="1.75" stroke="url(#paint2_linear_624_2525)" strokeWidth="0.5" />
            <defs>
              <linearGradient id="paint0_linear_624_2525" x1="1.78384" y1="3.35156" x2="19.3946" y2="15.2336" gradientUnits="userSpaceOnUse">
                <stop offset="0.156454" stopColor="#3555FF" />
                <stop offset="0.778468" stopColor="#A157FF" />
              </linearGradient>
              <linearGradient id="paint1_linear_624_2525" x1="1.78384" y1="3.35156" x2="17.0491" y2="15.1923" gradientUnits="userSpaceOnUse">
                <stop offset="0.156454" stopColor="#3555FF" />
                <stop offset="0.778468" stopColor="#A157FF" />
              </linearGradient>
              <linearGradient id="paint2_linear_624_2525" x1="-2.025" y1="0.130859" x2="26.9373" y2="19.8993" gradientUnits="userSpaceOnUse">
                <stop offset="0.156454" stopColor="#3555FF" />
                <stop offset="0.778468" stopColor="#A157FF" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        {title}
      </div>
      <div className='inferer-rank-list'>
        {
          pageDataList.map((item: any, index) => {
            return <ItemCom
              key={(item.token_address || item.holder_address) + index}
              itemData={item}
              from={pageIndex}
              index={index}
            />
          })
        }
      </div>
      <div className=' cursor-pointer' onClick={e => {
        e.stopPropagation()
        // @ts-ignore
        // const globalAddress = window.holder_address
        // if (globalAddress === 'openRank') {
        //   return
        // }
        // // @ts-ignore
        // window.holder_address = 'openRank'
        // @ts-ignore
        window.injectPlugin.extension.commonRequest({
          action: 'openRank',
          address: '',
          from: 'reddit',
          to: APP_STATE.TRENDS_INDEX
        })
      }}>
        <img src={morePng} className='w-full' style={{ height: 48 }} alt="" />
      </div>
    </div>
  );
};

export default RankList;