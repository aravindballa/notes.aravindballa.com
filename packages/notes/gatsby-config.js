module.exports = {
  plugins: [
    {
      resolve: '@aengusm/gatsby-theme-brain',
      options: {
        notesDirectory: 'content/',
        rootPath: '/',
        rootNote: 'about',
        // noteTemplate: './src/templates/brain.js',
      },
    },
    `gatsby-plugin-postcss`,
  ],
};
