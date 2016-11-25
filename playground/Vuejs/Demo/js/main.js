/**
 * Created by Administrator on 2016/11/23.
 */
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        jquery: 'jquery-3.1.1',
        text: 'requirejs/text'
    },
    map: {
        '*': {
            css: 'requirejs/css'
        }
    }
});

requirejs(['app/demo']);