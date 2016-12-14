/**
 * Created by Administrator on 2016/12/10.
 */
require(['jquery',
        'vue',
        'text!../../html/demo6.html',
        'css!../../css/lesson1.css'],function ($,Vue,htmlDemo) {
    $("#ds").html('');
    $("#ds").append(htmlDemo);

    var data1 = {
        flightSummary: 'non-stop flight',
        titles: ['姓名','证件类型','证件号码','手机号码','航班说明'],
        paxes: [
            {
                name: '张萌萌',
                idType: '身份证',
                idNumber: '310104198508101022',
                mobile: '18988886666'
            }, {
                name: '马小虎',
                idType: '护照',
                idNumber: 'G87654321'
            }, {
                name: '李国强',
                idType: '军人证',
                idNumber: '1112223334',
                mobile: '13789012345'
            }
        ],
        costs: [
            {
                type: '成人票',
                description: '含民航发展基金和燃油税',
                price: 750,
                count: 2,
            }, {
                type: '儿童票',
                description: '含民航发展基金和燃油税',
                price: 930,
                count: 1,
            }, {
                type: '航意险（成人）',
                description: '最高300万元意外保障，仅限成人购买',
                price: 30,
                count: 2,
            }
        ]
    }

    var data2 = {
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

    var data = Object.assign(data1, data2);
    new Vue({
        el: '#ds',
        data: data
    })
});