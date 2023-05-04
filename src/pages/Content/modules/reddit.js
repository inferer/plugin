import jQuery from '../../../assets/js/jquery-3.6.0.min.js';
import { logoSvg } from './domConfig.js';
const $ = jQuery;

const reddit = {
  request: null,
  init(request) {
    if (window.location.href.indexOf('reddit.com') > -1 && window.location.href.indexOf('/comments') > -1) {
      this.request = request
      window.infererAuthors = []
      this.setInfererLogo()
    }
  },
  setInfererLogo() {
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
              divDom.addEventListener("click", async () => {
                const user_name = divDom.getAttribute("data-username")
                const holder_address = divDom.getAttribute("data-holder_address")
                console.log(user_name, holder_address)
                window.injectPlugin.extension.commonRequest({
                  action: 'openSearch',
                  address: holder_address,
                  from: 'reddit'
                })
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
      if ($('[data-testid="post-comment-header"]').length > 0 && document.querySelector('[data-testid="comment_author_link"]')) {
        clearInterval(timer)
        timer = null
        setTimeout(async () => {
          queryInfererUser()
        }, 1000)

      }
    }, 300);

    window.addEventListener('scroll', function () {
      if (!isqueryInfererUser) {
        queryInfererUser()
      }
    })

  }
}

export default reddit