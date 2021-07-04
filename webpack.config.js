// 引入一个包
const path = require('path');
// 引入html插件 自动生成html文件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件 先清除文件再生成文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    // 开发模式：development模式下打包文件不会压缩；production：会压缩
    mode: 'development',
    // 入口文件
    entry: './src/index.ts',
    // 编译输出目录
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        // 告诉webpack不适用箭头函数
        environment: {
            arrowFunction: false,
            const: false, // 不使用const
        }
    },
    // 指定webpack打包时要使用的模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // 指定的是规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                // use: 'ts-loader', //处理ts文件
                use: [
                    {
                        // 指定加载器
                        loader: 'babel-loader',
                        // 设置babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    '@babel/preset-env',
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            'chrome': '86',
                                            'ie': '11'
                                        },
                                        // 指定corejs的版本
                                        'corejs': '3',
                                        // 使用corejs的方式 "usage" 表示按需加载
                                        'useBuiltIns': 'usage'
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node_modules/
            },
            // 设置对less文件的处理
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 引入postcss
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            // 兼容最近两个版本的浏览器
                                            browser: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    // 配置Webpack插件
    plugins: [
        new HTMLWebpackPlugin({
            // 使用此模板生成页面
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ],

    // 用来设置引用模块
    resolve: {
        extensions: ['.js', '.ts']
    },
    devServer: {
        historyApiFallback: true,
        inline: true,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
    },
}