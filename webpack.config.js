const webpack = require('webpack');
const path = require('path');

const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const buildPath = path.join(__dirname, 'build');
const imgPath = path.join(__dirname, 'src/assets');
const sourcePath = path.join(__dirname, 'src');

// Common plugins
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),
  new webpack
    .optimize
    .CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-[hash].js',
      minChunks(module) {
        return module.context && module
          .context
          .indexOf('node_modules') >= 0;
      },
    }),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'example/index.html'),
    path: buildPath,
    filename: 'index.html',
  }),
];

// Common rules
const rules = [
  {
    test: /\.(jsx)$/,
    enforce: 'pre',
    loader: 'eslint-loader',
    options: {
      emitWarning: !isProduction,
    },
  }, {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['react', 'es2015', 'stage-1'],
      },
    },
  }, {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  }, {
    test: /\.(png|gif|jpg|svg)$/,
    include: imgPath,
    use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
  }, {
    test: /\.(woff|woff2|eot|ttf|svg)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 100000,
      },
    },
  },
];

if (isProduction) {
  // Production plugins
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
    },
    output: {
      comments: false,
    },
  }));
} else {
  // Development plugins
  plugins.push(new DashboardPlugin());
}

module.exports = {
  devtool: isProduction
    ? false
    : 'source-map',
  entry: [// entry point
    './example/src/index.jsx'],
  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'app-[hash].js',
  },
  module: {
    rules,
  },
  resolve: {
    extensions: [
      '.js', '.jsx',
    ],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath,
    ],
  },
  plugins,
  devServer: {
    contentBase: isProduction
      ? buildPath
      : sourcePath,
    historyApiFallback: true,
    port: 3000,
    compress: isProduction,
    inline: !isProduction,
    host: 'localhost',
    disableHostCheck: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
};
