/**
 * Created by Administrator on 2016/11/23.
 */
define(['jquery',
        'vue',
        'text!../../html/demo2.html',
        'css!../../css/lesson1.css'],
    function ($,Vue,htmlDemo) {
        $("#ds").html('');
        $("#ds").append(htmlDemo);

        var options = ('选项一,选项二,选项三,选项四,选项五').split(',')

        var vm = new Vue({
            el: '#ds',
            data: {
                options: options,
                selected: options[0],
                listStyle: {
                    display: 'none'
                }
            },
            methods: {
                selectOption: function (opt) {
                    this.selected = opt;
                    this.listStyle.display = 'none';
                },
                log: function (info) {
                    console.log(info);
                }
            }
        })
});