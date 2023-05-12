import React from 'react';
import { render } from 'react-dom';
import RankList from '../components/rank'

const rank = {
  init() {
    let timer = setInterval(() => {
      const idDom = document.querySelector('#IDCARD_OVERFLOW_DROPDOWN_ID')
      const descriptionDom = document.querySelectorAll('[data-testid="no-edit-description-block"]')
      // OptionsContainer
      if (document.querySelector('#inferer-rank')) {
        if (!document.querySelector('#inferer-rank').querySelector('.price-item')) {
          render(
            <RankList title='这是主页' />,
            window.document.querySelector('#inferer-rank')
          );
        }

        return
      }
      if (idDom) {
        this.insertRank(idDom.parentElement.parentElement.parentElement)
      } else if (descriptionDom.length > 0) {
        const dom = descriptionDom[descriptionDom.length - 1]
        this.insertRank(dom.parentElement.parentElement.parentElement)
      }

    }, 150);
  },
  insertRank(targtElement) {
    if (window.preRankHref !== window.location.href) {

      setTimeout(() => {
        if (document.querySelector('#inferer-rank')) {
          window.preRankHref = window.location.href
          return
        }
        const divDom = document.createElement('div')
        divDom.id = 'inferer-rank'
        divDom.classList.add('inferer-rank-wrap')
        targtElement.after(divDom)
        render(
          <RankList title='这是主页' />,
          window.document.querySelector('#inferer-rank')
        );
      }, 1000)
    }
  }
}

export default rank