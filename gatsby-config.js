const path = require('path');

module.exports = {
  plugins: [
    {
      resolve: '@aengusm/gatsby-theme-brain',
      options: {
        notesDirectory: 'content/',
        rootPath: '/',
        rootNote: 'about',
        noteTemplate: path.join(__dirname, 'src/templates/note.js'),
      },
    },
    `gatsby-plugin-postcss`,
  ],
};
