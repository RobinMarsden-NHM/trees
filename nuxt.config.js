// import config from './config/config'
import candidates from './assets/data/candidates.json'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    './plugins/font-awesome.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources'
  ],
  layoutTransition: {
    name: 'default',
    mode: 'out-in'
  },
  pageTransition: {
    name: 'default',
    mode: 'out-in'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      const path = require('path')
      const WorkboxPlugin = require('workbox-webpack-plugin')
      const WebpackPwaManifest = require('webpack-pwa-manifest')
      const IdGuideDataProcessorPlugin = require('./webpack/id-guide-data-processor-plugin')

      config.plugins.push(
        new WorkboxPlugin.GenerateSW({
          swDest: `service-worker-${config.id}.js`,
          clientsClaim: true,
          skipWaiting: true,
          cacheId: `${config.id}`,
          maximumFileSizeToCacheInBytes: 9999 * 1024 * 1024
        }),
        new WebpackPwaManifest({
          name: config.name,
          short_name: config.short_name,
          description: config.description,
          background_color: config.background_color,
          crossorigin: 'use-credentials',
          theme_color: config.theme_color,
          start_url: config.start_url,
          icons: [
            {
              src: './assets/img/icon.png',
              sizes: [36, 48, 192, 512]
            },
            {
              src: './assets/img/icon.png',
              sizes: [36, 48, 192, 512, 1024],
              destination: path.join('icons', 'ios'),
              ios: true
            }
          ]
        // }),
        // new IdGuideDataProcessorPlugin({
        //   dataDir: 'assets/data',
        //   candidateDir: 'candidates',
        //   questionDir: 'questions'
        })
      )
    }
  },
  generate: {
    //  Generate routes for each 'result'
    routes: () => {
      const routes = []
      candidates.map((candidate) => {
        routes.push({
          route: `/result/${candidate.id}`,
          payload: candidate
        })
      })
      return routes
    }
  },
  devServer: {
    port: 3002
  },
  server: {
    port: 3003
  },
  styleResources: {
    scss: [ '@/assets/scss/variables.scss' ]
  }
}
