/**
 * Created by Administrator on 2016/11/23.
 */
requirejs.config({
    baseUrl: 'js/app',
    paths: {
        jquery: '../lib/jquery-3.1.1',
        text: '../lib/requirejs/text',
        vue: '../lib/vue'
    },
    map: {
        '*': {
            css: '../lib/requirejs/css'
        }
    }
});

requirejs(['demo']);