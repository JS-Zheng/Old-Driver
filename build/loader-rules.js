const jsRule = {
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
  }
}

const sassRule = {
  test: /\.scss$/,
  exclude: /node_modules/,
  use: [
    'style-loader',
    'css-loader',
    "sass-loader"
  ]
}

const cssRule = {
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader'
  ]
}

const imgRule = {
  test: /\.(png|svg|jpg|gif)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8192
      }
    }
  ]
}

module.exports = [jsRule, sassRule, cssRule, imgRule]