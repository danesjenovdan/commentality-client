module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/_variables.scss";
        `,
      },
    },
  },
  pages: {
    index: 'src/app.js',
    embed: 'src/embed.js',
  },
  pluginOptions: {
    i18n: {
      locale: 'sl',
      fallbackLocale: 'sl',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
};
