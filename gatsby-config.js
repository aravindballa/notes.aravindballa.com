module.exports = {
  siteMetadata: {
    title: `@aravindballa's notes`,
  },
  plugins: [
    {
      resolve: 'gatsby-theme-andy',
      options: {
        hideDoubleBrackets: true,
      },
    },
    `gatsby-plugin-postcss`,
  ],
};
