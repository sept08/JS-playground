/**
 * Created by Administrator on 2016/11/26.
 */
define(['jquery',
        'vue',
        'text!../../html/demo5.html'],
    function ($,Vue,htmlDemo) {
        $("#ds").html('');
        $("#ds").append(htmlDemo);

        var vm = new Vue({
            el: '#ds',
            data: {
                a: 1
            },
            computed: {
                s: function () {
                    return this.a * this.a
                }
            }
        })
});