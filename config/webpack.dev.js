const path = require('path');
require("@babel/polyfill");
const HtmlWebpackPlugin = require('html-webpack-plugin');//对于插件  要想使用得引入
/** @type { import('webpack').Configuration } */
module.exports = {
    mode: "development",                 // 打包模式 production | development | none
    entry: ['./src/js/index.js','./src/index.html'],       // 打包入口文件
    /*
    entry:{
        main:'./src/js/index.js'
    }
    */
    output: {                     // 打包输出文件名称和目录
        filename: './js/index.js',
        path: path.join(__dirname, './dist'),  // 输出文件目录需绝对路径
        // publicPath: 'output/',              // 默认为''表示网址根目录
    },
    plugins:[new HtmlWebpackPlugin({
        template:'./src/index.html'
    })],
    //loader：下载后无需引入 只需要声明
    module:{
        rules:[
            {
               test:/\.less$/, //正则匹配所有的less文件
               use:[
                   {
                       loader:'style-loader' //用于在html文档内创建一个style标签将style样式塞进去
                   },
                   {
                       loader:'css-loader' //将less编译成的css转换为一个模块
                   },
                   {
                       loader:'less-loader' //这三个的顺序只能这样  不生成单独的文件在内存里
                   }
               ]
            },//解析less,
            {
                test:/\.js$/,//只检验js文件
                exclude:/node_modules/,//排除这些文件
                enforce:'pre',
                use:{
                    loader:'eslint-loader'
                }
            },
            //npm i babel-loader @babel/core @babel/preset-env -D
            {
                test:/\.js$/,
                exclude:/node_module/,
                    loader:'babel-loader',
                    // options:{
                    //     "presets":[["@babel/preset-env",
                    //     {
                    //         "useBuiltIns":"usage",
                    //         "corejs":{version:3},
                    //         targets:{
                    //             "chrome":"53",
                    //             "ie":"9"
                    //         }
                    //     },
                    // ]
                    // ],//只能处理简单的es6语法
                    
                    // }
                    
            },
            //处理样式文件的图片
            {
                test:/\.(png|jpg|gif)$/i,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            limit:8192,//8kb以上不转base64 以下转
                            publicPath:'../dist/image',
                            outputPath:'image',
                            name:'[hash:5].[ext]'
                        }
                    }
                ]
            },
            //打包html文件
            //使用html-loader处理标签资源 img
            {
                test:/\.html$/i,
                loader:'html-loader'
            },
            //处理其他的资源
            {
                test:/\.(eot|svg|woff|woff2|mp3|mp4|ttf|avi)/i,
                loader:"file-loader",
                options:{
                    outputPath:'media',
                    name:'[hash:4],[ext]'//把css的ziti后缀改成less
                }
            }
        ]
    },
    //配置自动化
    devServer:{
        port:3000,
        open:true,
        hot:true
    },
    devtool:'#cheap-module-eval-source-map'  //开发环境
    // module: {
    //     rules: [
    //         {
    //             test: /.js$/,
    //             use: {
    //                 loader: 'babel-loader',
    //                 options: {
    //                     presets: ['@babel/preset-env']
    //                 }
    //             }
    //         },
    //         {
    //             test: /.css$/,       // 匹配 .css 文件
    //             use: [               // 对匹配文件 从后到前 执行 loader
    //                 'style-loader',  // 把 打包成的 js 代码，挂载到 Document
    //                 'css-loader',    // 将 .css 文件打包为 js代码
    //             ]
    //         },
    //         {
    //             test: /.jpeg$/,
    //             use: 'file-loader'
    //         },
    //         {
    //             test: /.jpeg$/,
    //             use: {
    //                 loader: 'url-loader',
    //                 options: {
    //                     limit: 10 * 1024 // 10 KB
    //                 }
    //             }
    //         },
    //         {
    //             test: /.html$/,
    //             use: {
    //                 loader: 'html-loader',
    //                 options: {
    //                     attrs: ['img:src', 'a:href']
    //                 }
    //             }
    //         }
    //     ]
    // }
 
}