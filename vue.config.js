const path = require('path');
const axios = require('axios');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve(dir) {
    return path.join(__dirname, '.', dir);
}

module.exports = {
    publicPath: './', // vueConf.baseUrl, // 根域上下文目录
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)，相当于output的目录
    lintOnSave: true, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    css: { // 配置高于chainWebpack中关于css loader的配置
        modules: false, // 是否开启支持‘foo.module.css’样式
        extract: true, // 生产的时候需要将此项设置为true       是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
        sourceMap: false // 是否在构建样式地图，false将提高构建速度
    },
    parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
    pluginOptions: { // 第三方插件配置
    },
    pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    },
    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 4399,
        https: false,
        hot: true,
        hotOnly: true,
        // proxy: 'http://192.168.1.240:8080',
        // proxy: "http://47.101.136.70:8088",
        before: app => {
            app.get('/getDiscList', (req, res) => {
                var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/', //hack方法,利用node作为中间代理http请求,设置referer和host
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then(response => {
                    if (response.data.code === 0) {
                        res.json({
                            code: 0,
                            data: response.data.data
                        });
                    }
                }).catch(err => {
                    console.log(err);
                });
            });
            app.get('/lyric', function(req, res) {
                var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg';

                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    var ret = response.data;
                    if (typeof ret === 'string') {
                        var reg = /^\w+\(({[^()]+})\)$/; //把jsonp里面的数据匹配出来
                        var matches = ret.match(reg);
                        if (matches) {
                            ret = JSON.parse(matches[1]);
                        }
                    }
                    res.json(ret);
                }).catch((e) => {
                    console.log(e);
                });
            });
            app.get('/getCdInfo', function(req, res) {
                var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';

                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then(response => {
                    var ret = response.data;
                    res.json(ret);
                }).catch(err => { console.log(err); });
            });
        }
    },
    // alias 配置
    //   chainWebpack: config => {
    //     config.module.rules.delete('svg') // 重点:删除默认配置中处理svg,
    //     config.module
    //       .rule('svg-sprite-loader')
    //       .test(/\.svg$/)
    //       .include
    //       .add(resolve('src/icons')) // 处理svg目录
    //       .end()
    //       .use('svg-sprite-loader')
    //       .loader('svg-sprite-loader')
    //       .options({
    //         symbolId: 'icon-[name]'
    //       })
    //   },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('~', resolve('src/common'));
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new BundleAnalyzerPlugin()
                ],
                // externals: {
                //     'vue': 'Vue',
                //     'vue-router': 'VueRouter',
                //     'element-ui': 'ElementUI',
                //     'echart': 'Echart'
                // },
                watch: true
            };
        }
    }
};
