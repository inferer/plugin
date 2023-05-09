import { logoSvg } from './domConfig.js';
import React from 'react';
import { render } from 'react-dom';
import UserInfo from '../components/userInfo'


const reddit = {
  request: null,
  init(request) {
    setInterval(() => {
      if (window.preHref !== window.location.href)
        if (window.location.href.indexOf('reddit.com') > -1 && window.location.href.indexOf('/comments') > -1) {
          this.request = request
          window.infererAuthors = []
          window.preHref = window.location.href
          this.setInfererLogo()
        }
    }, 150)

  },
  showUserInfo(currentDom, { user_name, holder_address, left, top }) {
    if (!document.querySelector('#inferer-userinfo')) {
      const divDom = document.createElement('div')
      divDom.id = 'inferer-userinfo'
      divDom.classList.add('inferer-userinfo-wrap')
      // divDom.style.left = left + 'px'
      // divDom.style.top = top - 5 + 'px'
      divDom.addEventListener('mouseleave', e => {
        e.stopPropagation()
        divDom.remove()
      })
      // document.body.append(divDom)
      currentDom.append(divDom)
      setTimeout(() => {
        render(
          <UserInfo userName={user_name} userAddress={holder_address} />,
          window.document.querySelector('#inferer-userinfo')
        );
      }, 100)
    }
  },
  setInfererLogo() {
    const that = this;
    const request = this.request
    let isqueryInfererUser = false
    function queryInfererUser() {
      isqueryInfererUser = true
      const comment_author_links = document.querySelectorAll('[data-testid="comment_author_link"]');
      const names = []
      comment_author_links.forEach(async author => {
        if (!window.infererAuthors.includes(author.textContent)) {
          names.push(author.textContent)
          window.infererAuthors.push(author.textContent)
        }
      })
      if (names.length > 0) {
        window.injectPlugin.extension.commonRequest({ action: 'queryUserInfoByName', names: names }, (users) => {
          console.log(users)
          comment_author_links.forEach(async author => {
            const user = users.find((user) => user.user_name === author.textContent)
            if (user) {
              const divDom = document.createElement('div')
              divDom.classList.add('inferer-logo-wrap')
              divDom.setAttribute("data-username", user.user_name)
              divDom.setAttribute("data-holder_address", user.holder_address)
              divDom.innerHTML = logoSvg
              // divDom.addEventListener("click", async () => {
              //   const user_name = divDom.getAttribute("data-username")
              //   const holder_address = divDom.getAttribute("data-holder_address")
              //   console.log(user_name, holder_address)
              //   window.injectPlugin.extension.commonRequest({
              //     action: 'openSearch',
              //     address: holder_address,
              //     from: 'reddit'
              //   })
              // })
              divDom.addEventListener("mouseenter", (e) => {
                const user_name = divDom.getAttribute("data-username")
                const holder_address = divDom.getAttribute("data-holder_address")
                console.log(user_name, holder_address)
                const rect = divDom.getBoundingClientRect()

                e.stopPropagation()
                that.showUserInfo(divDom, { user_name, holder_address, left: rect.left, top: rect.top })
              })
              author.parentElement.parentElement.parentElement.after(divDom)
            }
          })

        })
      }
      setTimeout(() => {
        isqueryInfererUser = false
      }, 1000)
    }

    let timer = setInterval(() => {
      if (document.querySelector('[data-testid="post-comment-header"]') && document.querySelector('[data-testid="comment_author_link"]')) {
        clearInterval(timer)
        timer = null
        setTimeout(async () => {
          queryInfererUser()
        }, 1000)

      }
    }, 300);
    if (document.querySelector('#overlayScrollContainer')) {
      document.querySelector('#overlayScrollContainer').addEventListener('scroll', function () {
        if (!isqueryInfererUser) {
          queryInfererUser()
        }
      })
    }
    window.addEventListener('scroll', function () {
      if (!isqueryInfererUser) {
        queryInfererUser()
      }
    })

  }
}

export default reddit