import React, { useCallback } from 'react'
import { APP_STATE } from '../../config/constants'
import PageHeader from '../components/PageHeader'
import DataItem1 from './DataItem1'
import DataItem2 from './DataItem2'
import FeedBackUS from './FeedbackUS'
import TicketScore from './TicketScore'
import UpdateInfo from './UpdateInfo'

const logoTPng = require('../../../../assets/img/inferer.png')
const { PopupAPI } = require('../../../../api')

const TicketInfer: React.FC<{
  ticketInfo: { level: number },
  searchList: any[],
  onChangeState: (appState: number, data: any) => void
}> = ({
  ticketInfo,
  searchList,
  onChangeState
}) => {
    const collectTicket = useCallback(async () => {

    }, [])
    return (
      <div className='page-root search-page'>
        <PageHeader title={'INFERER'} onBack={() => PopupAPI.changeState(APP_STATE.TICKET)} />
        <div className={`search-result overflow-auto pb-4 show`} style={{ height: 520, top: 78 }}>
          <TicketScore ticketInfo={ticketInfo} collectTicket={collectTicket} />
          <UpdateInfo />
          <div className="result-list mt-4">
            {
              searchList.map(item => {
                if (typeof item.data === 'string') {
                  return <DataItem1 key={item.key} itemData={item} />
                }
                return <DataItem2 key={item.key} itemData={item} onChangeState={onChangeState} />
              })
            }
          </div>
          <FeedBackUS />
        </div>
      </div>
    )
  }

export default TicketInfer