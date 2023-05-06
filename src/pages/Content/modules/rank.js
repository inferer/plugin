import React from 'react';
import { render } from 'react-dom';
import RankList from '../components/rank'

const rank = {
  init() {
    let timer = setInterval(() => {
      const idDom = document.querySelector('#IDCARD_OVERFLOW_DROPDOWN_ID')
      const idDom2 = document.querySelector('#subreddit-premium-commuity-card-dismiss')
      if (idDom && idDom2) {
        clearInterval(timer)
        timer = null
        const divDom = document.createElement('div')
        divDom.id = 'inferer-rank'
        divDom.classList.add('inferer-rank-wrap')

        document.querySelector('#IDCARD_OVERFLOW_DROPDOWN_ID').parentElement.parentElement.parentElement.after(divDom)

        setTimeout(() => {
          render(
            <RankList title='这是主页' />,
            window.document.querySelector('#inferer-rank')
          );
        }, 100)
      }
    }, 300);
  }
}

export default rank