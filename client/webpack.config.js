const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.join(__dirname, '/src');
const PUBLIC_DIR = path.join(__dirname, '/public')

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js', 
    path: PUBLIC_DIR
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader', 
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}
