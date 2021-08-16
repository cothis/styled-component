import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
  mode: 'development',
  entry: { main: './src/main.tsx' },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        include: path.resolve(__dirname, './src'),
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './src/css'),
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  plugins: [],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    host: 'localhost',
    port: 8000,
    historyApiFallback: true,
  },
};

export default config;
