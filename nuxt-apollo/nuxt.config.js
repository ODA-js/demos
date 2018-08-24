module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Sample oda-admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: [
    '~/plugins/apollo.js',
    '~/plugins/vuetify.js',
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor:[
      "apollo-cache-inmemory",
      "apollo-client",
      "apollo-link",
      "apollo-link-context",
      "apollo-link-http",
      "apollo-link-persisted-queries",
      "apollo-link-ws",
      "apollo-upload-client",
      "apollo-utilities",
      "graphql",
      "oda-lodash",
      "subscriptions-transport-ws",
      "vue-apollo",
    ],
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      /*       if (isDev && isClient) {
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
