// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import DefaultLayout from '~/layouts/Default.vue'
import './styles/tailwind.css'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('font-awesome-icon', FontAwesomeIcon)

  head.meta.push({
    key: 'description',
    name: 'description',
    content: 'Suboptimal thoughts and musings of an Indian engineer.',
  })

  head.meta.push({
    key: 'twitter:image',
    name: 'twitter:image',
    content: 'https://suboptimaleng.github.io/suboptimal.png',
  })

  head.meta.push({
    key: 'og:image',
    name: 'og:image',
    content: 'https://suboptimaleng.github.io/suboptimal.png',
  })
}
