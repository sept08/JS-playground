/**
 * Created by Administrator on 2016/12/15.
 */
define(['jquery',
        'vue',
        'text!../../html/demo7.html',
        'css!../../css/lesson1.css'],
    function ($,Vue,htmlDemo) {
        $("#ds").html('');
        $("#ds").append(htmlDemo);

        var vm = new Vue({
            el: 'body',
            data: {
                keyTitles: {
                    name: '姓名',
                    idType: '证件类型',
                    idNumber: '证件号码',
                    mobile: '手机号码'
                },
                paxInfo: {
                    name: '张萌萌',
                    idType: '身份证',
                    idNumber: '310104198508101022',
                    mobile: '18988886666'
                }
            }
        })
    });