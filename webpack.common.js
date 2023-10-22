const path =require('path');
const Dotenv =require('dotenv')
const webpack =require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs =require('fs')
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const comConfig =Dotenv.parse(fs.readFileSync(path.resolve(__dirname,'./com.env')))

const envConfig =Dotenv.parse(fs.readFileSync(path.resolve(__dirname,'./dev.env')))
const prodConfig =Dotenv.parse(fs.readFileSync(path.resolve(__dirname,'./prod.env')))

Object.assign(comConfig,process.env.NODE_ENV==='production'?prodConfig:envConfig)

module.exports={
  // 打包入口
  entry:"./src/main.ts",
  //打包出口
  output:{
    clean: true,
    path:path.resolve(__dirname,'./dist'),
    filename:'bundle.js'
  },
  resolve: {
    extensions: [".vue",".js"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  module:{
    rules:[
      {
        test:/\.(css|scss)$/,
        use:[
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test:/\.(jpg|png|jpeg|git)$/,
        type:'asset',
        generator: {
          filename: "img/[name]-[hash][ext]",
        },
      },
      {
        test:/\.(eot|svg|ttf|woff|woff2)&/,
        type:'asset/resource',
        generator:{
          filename:'font/[name].[hash:6][ext]'
        }
      },

      {
        test:/\.vue$/,
        use:[
          'vue-loader',
        ]
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
    ],
  },
  plugins:[
    // html模板并且注入 env变量
    new HtmlWebpackPlugin({
      template:'./index.EJS',
      title: "webpack5-ts-vue",
      inject:'html',
      env:{
        ...comConfig
      }
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(comConfig),
    }),
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: "disabled",
      generateStatsFile: true,
    }),
    // new CopyWebpackPlugin({
    //   // from后的路径是相对于项目的根目录，to后的路径是相对于打包后的dist目录
    //   patterns: [{ from: "./public", to: "./public" }],
    // }),
  ]
}