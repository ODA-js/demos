module.exports = {
  mode: 'spa',
  modules: [
    '@nuxtjs/apollo', ['@nuxtjs/dotenv', {
      only: ['API_URL'],
    }],
  ],
  apollo: {
    uri: 'http://localhost:3003/graphql',
    clientConfigs: {
      default: '~/apollo/client-configs/default.js'
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'oda-admin',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js + Vuetify.js project'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  plugins: [
    '~/plugins/vuetify.js',
  ],
  css: [
    '~/assets/style/app.styl',
  ],
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: [
      '~/plugins/vuetify.js',
    ],
    extractCSS: true,
    /*
     ** Run ESLint on save
     */
    extend(config, ctx) {
      /* if (ctx.isDev && ctx.isClient) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
          })
        } */
    }
  }
}