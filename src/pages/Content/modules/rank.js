import React from 'react';
import { render } from 'react-dom';
import RankList from '../components/rank'

const rank = {
  init() {
    let timer = setInterval(() => {
      const idDom = document.querySelector('#IDCARD_OVERFLOW_DROPDOWN_ID')
      if (window.preRankHref !== window.location.href) {
        const dom2 = document.querySelector('#subreddit-premium-commuity-card-dismiss')
        if (idDom && dom2) {
          // clearInterval(timer)
          // timer = null
          window.preRankHref = window.location.href
          const divDom = document.createElement('div')
          divDom.id = 'inferer-rank'
          divDom.classList.add('inferer-rank-wrap')
          idDom.parentElement.parentElement.parentElement.after(divDom)
          // idDom.parentElement.parentElement.parentElement.insertAdjacentElement("beforebegin", divDom)

          setTimeout(() => {
            render(
              <RankList title='这是主页' />,
              window.document.querySelector('#inferer-rank')
            );
          }, 300)
        }
      } else {
        // if (!window.hasReplaceRank) {
        //   const idDom2 = document.querySelector('#subreddit-premium-commuity-card-dismiss')
        //   const rankDom = document.querySelector('#inferer-rank')
        //   if (idDom2 && idDom && rankDom) {
        //     window.hasReplaceRank = true
        //     idDom.parentElement.parentElement.parentElement.insertAdjacentElement('afterend', rankDom)
        //   }
        // }
      }

    }, 150);
  }
}

export default rank