import React, { useState } from "react";
import { useIntl } from 'react-intl'
import { APP_STATE } from "../../config/constants";
import PageHeader from "../components/PageHeader";
import NoData from "./NoData";

const { PopupAPI } = require('../../../../api')

const copyImg = require('./images/copy2.png')

const ticketsList = [
  { id: 1, level: 1 },
  { id: 2, level: 2 },
  { id: 3, level: 3 },
  { id: 4, level: 4 },
  { id: 5, level: 5 },
  { id: 6, level: 1 },
  { id: 7, level: 4 },
  { id: 8, level: 3 },
  { id: 9, level: 2 },
  { id: 10, level: 1 },
]

const Collection: React.FC<any> = () => {

  const onItemClick = (type: string) => {
    if (type === 'language') {
      PopupAPI.changeState(APP_STATE.LANGUAGE)
    }
  }
  const intl = useIntl()
  const title = intl.formatMessage({ id: 'title.collection', defaultMessage: 'COLLECTION' })

  const [tickets, setTickets] = useState(ticketsList)

  const [active, setActive] = useState(1)
  PopupAPI.getTickets(0)
    .then((res: any) => {
      console.log(res)
    })

  return (
    <div className="w-360 page-root collection-page tickets-page">
      <div className="page-title">
        TICKETS
      </div>
      <div className="page-content pt-3 home-page-content">
        <div className="setting-list">
          {
            tickets.map(item =>
              <div key={item.id} className={`collection-item hover:opacity-80 flex items-center h-16 bg${item.level}`}
              >
                <div className="flex justify-center items-center w-16 h-16">
                  <div className={`text text${item.level}`}>{item.level}.0</div>
                </div>
                <div className="ml-4 ">
                  <div className="text-sm font-bold flex items-center" style={{ color: '#7F8792' }}>
                    0x8eb8.....3f23
                    <img src={copyImg} alt="" className="w-4 h-4 ml-1" />
                  </div>
                  <div className="text-xs " style={{ color: 'rgba(127, 135, 146, 0.7)' }}>15:00 7/22 2022</div>
                </div>
              </div>
            )
          }
        </div>

        <NoData />
      </div>
    </div>
  )
}

export default Collection