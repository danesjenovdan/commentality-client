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
};
