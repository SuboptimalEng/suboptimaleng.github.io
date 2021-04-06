import plugin_gridsome_plugin_tailwindcss_5 from "/Users/suboptimaleng/Desktop/dev/suboptimaleng.github.io/node_modules/gridsome-plugin-tailwindcss/gridsome.client.js"
import plugin_gridsome_plugin_google_analytics_7 from "/Users/suboptimaleng/Desktop/dev/suboptimaleng.github.io/node_modules/@gridsome/plugin-google-analytics/gridsome.client.js"

export default [
  {
    run: plugin_gridsome_plugin_tailwindcss_5,
    options: {"tailwindConfig":"./tailwind.config.js","presetEnvConfig":{"stage":0,"autoprefixer":false},"shouldImport":false,"shouldTimeTravel":false}
  },
  {
    run: plugin_gridsome_plugin_google_analytics_7,
    options: {"id":"UA-191446508-2"}
  }
]
