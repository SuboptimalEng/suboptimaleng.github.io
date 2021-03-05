// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import './styles/tailwind.css'
import DefaultLayout from '~/layouts/Default.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { config, library } from '@fortawesome/fontawesome-svg-core'
// import { faGithub, faTwitter, faHackerNews, faYoutube } from '@fortawesome/free-brands-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

// config.autoAddCss = false;
// library.add(faGithub, faTwitter, faHackerNews, faYoutube)

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('font-awesome-icon', FontAwesomeIcon)

  head.meta.push({
    key: 'description',
    name: 'description',
    content: 'Thoughts and musings of a suboptimal indian guy',
  })

  // TODO V2
  // head.meta.push({
  //   key: 'og:description',
  //   name: 'og:description',
  //   content: 'TODO',
  // })
  // head.meta.push({
  //   key: 'twitter:description',
  //   name: 'twitter:description',
  //   content: 'TODO',
  // })
  // router.beforeEach((to, _from, next) => {
  //   head.meta.push({
  //     key: 'og:url',
  //     name: 'og:url',
  //     content: 'https://suboptimaleng.github.io' + to.path,
  //   })
  //   next()
  // })
}
