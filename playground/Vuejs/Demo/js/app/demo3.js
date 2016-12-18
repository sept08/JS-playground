/**
 * Created by Administrator on 2016/11/26.
 */
define(['jquery',
        'vue',
        'text!../../html/demo3.html',
        'css!../../css/lesson1.css'],
    function ($,Vue,htmlDemo) {

        var options = [
            {
                id: 1,
                name: '张三',
                age: 27,
                gender: '男',
                department: '开发部'
            }, {
                id: 2,
                name: '李四',
                age: 23,
                gender: '女',
                department: '测试部'
            }, {
                id: 3,
                name: '李四',
                age: 29,
                gender: '男',
                department: '设计部'
            }, {
                id: 4,
                name: '王五',
                age: 32,
                gender: '男',
                department: '产品部'
            }
        ];

        Vue.filter('personInfo', function (person) {
            return [person.name, person.gender, person.age + '岁', person.department].join('，')
        })

        function load() {
            $("#ds").html('');
            $("#ds").append(htmlDemo);

            var vm = new Vue({
                el: '#ds',
                data: {
                    options: options,
                    selected: options[0],
                    showListDiv: false
                },
                methods: {
                    selectOption: function (opt) {
                        this.selected = opt
                        this.showListDiv = false
                    }
                }
            })
        }

        return {
            load: load
        }
});