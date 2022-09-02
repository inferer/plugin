import React from "react";

const ticket_scorePng = require('../../../../assets/img/ticket_score.png')
const ttipPng = require('../../../../assets/img/ttip.png')
const star1Png = require('../../../../assets/img/star1.png')
const star2Png = require('../../../../assets/img/star2.png')

const TicketScore: React.FC<{
  ticketInfo: { level: number },
  collectTicket: () => void
}> = ({ ticketInfo, collectTicket }) => {

  return (
    <div className="ticket-score flex flex-col justify-center">
      <div className="flex items-center justify-center">
        <img src={ticket_scorePng} alt="" style={{ width: 20, height: 20 }} />
        <div className="text-base text-white font-bold ml-2">Evaluation Ticket</div>
      </div>
      <div className="flex items-center justify-center mt-2">
        <div className="flex items-center">
          <img src={star1Png} alt="" style={{ width: 16, height: 16 }}
            className={` ${ticketInfo.level < 1 ? 'opacity-30' : ''} `} />
          <img src={star1Png} alt="" style={{ width: 16, height: 16 }}
            className={` ${ticketInfo.level < 2 ? 'opacity-30' : ''} `}
          />
          <img src={star1Png} alt="" style={{ width: 16, height: 16 }}
            className={` ${ticketInfo.level < 3 ? 'opacity-30' : ''} `}
          />
          <img src={star1Png} alt="" style={{ width: 16, height: 16 }}
            className={` ${ticketInfo.level < 4 ? 'opacity-30' : ''} `}
          />
          <img src={star1Png} alt="" style={{ width: 16, height: 16 }}
            className={` ${ticketInfo.level < 5 ? 'opacity-30' : ''} `}
          />
        </div>
        <div className="text-base text-white font-bold mx-2" style={{ fontSize: 20 }}>{Number(ticketInfo.level).toFixed(1)}</div>
        <img onClick={() => collectTicket()} src={ttipPng} alt="" style={{ width: 20, height: 20 }} />
      </div>
    </div>
  )
}

export default TicketScore