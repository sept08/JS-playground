/**
 * Created by Administrator on 2016/11/25.
 * 1. html文件定位模板
 */
define(function (require) {

    var Vue = require('vue');
    var data = {
        items: [{
            id:     'demo1',
            text:   '纯JS方式'
        },{
            id:     'demo2',
            text:   'VueJS方式'
        },{
            id:     'demo3',
            text:   '3.数据绑定'
        },{
            id:     'demo4',
            text:   '数据绑定-指令'
        },{
            id:     'demo5',
            text:   '计算属性'
        },{
            id:     'demo6',
            text:   '6.列表渲染'
        },{
            id:     'demo7',
            text:   '7.列表'
        }]
    }

    var vm = new Vue({
        el: '#context',
        data: data,
        methods: {
            loadDemo: function (name) {
                require([name],function (module) {
                    debugger
                    module.load();
                })
            }
        }
    })
});