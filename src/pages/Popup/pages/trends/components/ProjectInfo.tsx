import React, { useEffect, useState } from "react";
import { BuyIcon, CollectIcon, Like, MsgIcon, ShareIcon, StarList, TTitle, UnLike } from "./components";
import { Toast } from 'antd-mobile'
import { APP_STATE, redditBuyUrl, redditChatUrl, redditShareUrl } from "../../../config/constants";
import { formatName } from "./TrendItem";
import { openBrowser } from "../../../utils";
const DemoPng = require('../images/demo.png');
const { PopupAPI } = require('../../../../../api')

const randomStar = () => {
  const idx = Math.floor(Math.random() * 3)
  return [3, 4, 5][idx]
}

const ProjectInfo: React.FC<any> = ({
  from,
  nftData = {},
  nftBaseInfo = {}
}) => {
  const [starNums, setStarNums] = useState(randomStar())
  const [isFav, setisFav] = useState(false)
  const [isLike, setisLike] = useState(false)
  const [isUnlike, setisUnlike] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [unlikeCount, setUnlikeCount] = useState(0)
  const [currentId, setCurrentId] = useState('')

  useEffect(() => {
    setisFav(nftBaseInfo.is_fav)
    setisLike(nftBaseInfo.is_like)
    setisUnlike(nftBaseInfo.is_unlike)
    setLikeCount(nftBaseInfo.likeCount || 0)
    setUnlikeCount(nftBaseInfo.unlikeCount || 0)
  }, [nftBaseInfo])

  return (
    <div className=" bg-white rounded p-3 flex">
      <div className="big-img">
        <img src={nftData.NFT_img_url || nftData.series_img_url || DemoPng} alt="" />
        <div className="left-text flex justify-between items-center">
          <Like
            isLike={isLike}
            isUnlike={isUnlike}
            likeCount={likeCount}
            onClick={() => {

              !isUnlike && PopupAPI.execApiPost({
                action: nftData.token_id ? 'collectNft' : 'collectNftColl',
                params: {
                  column: 'is_like',
                  is_like: !isLike,
                  id: nftBaseInfo.id || currentId,
                  token_id: nftData.token_id,
                  nft_address: nftData.token_address
                }
              }).then((res: any) => {
                if (res.status === 200) {
                  setLikeCount(isLike ? likeCount - 1 : likeCount + 1)
                  setisLike(!isLike)
                  setCurrentId(res.data.id)
                  Toast.show('Success')
                  return
                }
                Toast.show('Error')
              })
            }}
          />
          <div className="div-line"></div>
          <UnLike
            unlikeCount={unlikeCount}
            isLike={isLike}
            isUnlike={isUnlike}
            onClick={() => {
              !isLike && PopupAPI.execApiPost({
                action: nftData.token_id ? 'collectNft' : 'collectNftColl',
                params: {
                  column: 'is_unlike',
                  is_unlike: !isUnlike,
                  id: nftBaseInfo.id || currentId,
                  token_id: nftData.token_id,
                  nft_address: nftData.token_address
                }
              }).then((res: any) => {
                if (res.status === 200) {
                  setUnlikeCount(isUnlike ? unlikeCount - 1 : unlikeCount + 1)
                  setisUnlike(!isUnlike)
                  setCurrentId(res.data.id)
                  Toast.show('Success')
                  return
                }
                Toast.show('Error')
              })
            }}
          />
        </div>
      </div>
      <div className="flex flex-col justify-between flex-1 text-wrap pl-5">
        <div className="flex justify-between">
          <div>
            <div className=" text-xs font-bold">
              {formatName(nftData.NFT_name || nftData.series_name || 'Meme Team (100)')}
            </div>
            <div className="mt-1">
              <StarList score={starNums} />
            </div>
          </div>
          {
            (from === APP_STATE.PRICEONE_TREND ||
              from === APP_STATE.PRICECOLL_TREND) &&
            <div>
              <div className="color-image font-bold right-price">
                {(nftData?.price || 0).toFixed(1)}
              </div>
              <div className="color-image text-xs font-bold text-right">ETH</div>
            </div>
          }
          {
            (from === APP_STATE.POPULARONE_TREND ||
              from === APP_STATE.POPULARCOLL_TREND) &&
            <div>
              <div className="color-image font-bold right-price">
                {nftData.nums || nftData.transaction_num}
              </div>
              <div className="color-image text-xs font-bold text-right">transfers</div>
            </div>
          }

        </div>
        <div className="flex justify-end">
          <div className=" rounded flex justify-between items-center space-x-3 " style={{ background: '#F8F9FF', width: 175, height: 28, padding: '0 12px' }}>
            <CollectIcon
              value={isFav}
              onClick={() => {
                // 
                PopupAPI.execApiPost({
                  action: nftData.token_id ? 'collectNft' : 'collectNftColl',
                  params: {
                    column: 'is_fav',
                    is_fav: !isFav,
                    id: nftBaseInfo.id || currentId,
                    token_id: nftData.token_id,
                    nft_address: nftData.token_address
                  }
                }).then((res: any) => {
                  if (res.status === 200) {
                    setisFav(!isFav)
                    setCurrentId(res.data.id)
                    if (!isFav) {
                      Toast.show('Collected')
                    } else {
                      Toast.show('Canceled')
                    }
                    return
                  }
                  Toast.show('Error')
                })
              }}
            />
            <div className="icon-line"></div>
            <ShareIcon
              onClick={() => {
                openBrowser(redditShareUrl + (nftData?.NFT_creator || nftData?.series_creator || ''))
              }}
            />
            <div className="icon-line"></div>
            <BuyIcon
              onClick={() => {
                openBrowser(redditBuyUrl + `${nftData.token_address}/${nftData?.token_id || 0}`)
              }}
            />
            <div className="icon-line"></div>
            <MsgIcon
              onClick={() => {
                openBrowser(redditChatUrl + `${nftData?.NFT_creator || nftData?.series_creator}/submit`)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectInfo