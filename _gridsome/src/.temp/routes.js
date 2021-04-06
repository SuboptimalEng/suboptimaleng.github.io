const c1 = () => import(/* webpackChunkName: "page--src--templates--tag-vue" */ "/Users/suboptimaleng/Desktop/dev/suboptimaleng.github.io/src/templates/Tag.vue")
const c2 = () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/suboptimaleng/Desktop/dev/suboptimaleng.github.io/src/templates/Post.vue")
const c3 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/suboptimaleng/Desktop/dev/suboptimaleng.github.io/node_modules/gridsome/app/pages/404.vue")
const c4 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/suboptimaleng/Desktop/dev/suboptimaleng.github.io/src/pages/Index.vue")

export default [
  {
    path: "/tag/:id/:page(\\d+)?/",
    component: c1
  },
  {
    path: "/blog/:path/",
    component: c2
  },
  {
    name: "404",
    path: "/404/",
    component: c3
  },
  {
    name: "home",
    path: "/:page(\\d+)?/",
    component: c4
  },
  {
    name: "*",
    path: "*",
    component: c3
  }
]
