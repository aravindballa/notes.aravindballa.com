module.exports = {
  plugins: [
    {
      resolve: '@aengusm/gatsby-theme-brain',
      options: { notesDirectory: 'content/', rootPath: '/', rootNote: 'about' },
    },
    `gatsby-plugin-postcss`,
  ],
};
