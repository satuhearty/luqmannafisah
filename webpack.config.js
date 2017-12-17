module.exports = {
  // webpack folder's entry js - excluded from jekll's build process.
  entry: {
    'guestbook': './webpack/guestbook.js',
    'guestlist': './webpack/guestlist.js',
    'rsvp': './webpack/rsvp.js'
  },
  output: {
    // we're going to put the generated file in the assets folder so jekyll will grab it.
      path: __dirname + '/assets/js/',
      filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules'
      }
    ]
  }
};
