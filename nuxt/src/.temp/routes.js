const c1 = () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/telugugameboy/Desktop/dev/suboptimaleng.github.io/src/templates/Post.vue")
const c2 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/telugugameboy/Desktop/dev/suboptimaleng.github.io/node_modules/gridsome/app/pages/404.vue")
const c3 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/telugugameboy/Desktop/dev/suboptimaleng.github.io/src/pages/Index.vue")

export default [
  {
    path: "/blog/:path/",
    component: c1
  },
  {
    name: "404",
    path: "/404/",
    component: c2
  },
  {
    name: "home",
    path: "/:page(\\d+)?/",
    component: c3
  },
  {
    name: "*",
    path: "*",
    component: c2
  }
]
