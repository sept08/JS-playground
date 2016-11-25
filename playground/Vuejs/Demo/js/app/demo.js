/**
 * Created by Administrator on 2016/11/25.
 * 1. html文件定位模板
 */
define(['vue',
        'css!../../css/lesson1.css'],
    function (Vue) {

    var data = {
        items: [{
            id:     'demo1',
            text:   '纯JS方式'
        },{
            id:     'demo2',
            text:   'VueJS方式'
        },{
            id:     'demo3',
            text:   '数据绑定-插值'
        },{
            id:     'demo4',
            text:   '数据绑定-指令'
        },{
            id:     'demo5',
            text:   '计算属性'
        }]
    }

    var vm = new Vue({
        el: '#context',
        data: data,
        methods: {
            loadDemo: function (name) {
                require([name])
            }
        }
    })
});