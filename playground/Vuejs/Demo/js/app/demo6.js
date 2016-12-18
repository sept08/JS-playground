/**
 * Created by Administrator on 2016/12/10.
 */
define(['jquery',
        'vue',
        'text!../../html/demo6.html'],
    function ($,Vue,htmlDemo) {

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

    var data3 = {
        name: '',
        ffp: [
            {
                name: 'Micheal',
                age: 24
            }, {
                name: 'Jack',
                age: 17
            }, {
                name: 'Tiffany',
                age: 23
            }, {
                name: 'Alice',
                age: 9
            }, {
                name: 'Dannis',
                age: 42
            }, {
                name: 'Greg',
                age: 36
            }, {
                name: 'Pearl',
                age: 3
            }, {
                name: 'David',
                age: 5
            }, {
                name: 'Bob',
                age: 4
            }, {
                name: 'Johnson',
                age: 1
            }
        ]
    }

    var data = Object.assign(data1, data2, data3);

    /**
     * to load module
     */
    function load(){
        $("#ds").html('');
        $("#ds").append(htmlDemo);

        new Vue({
            el: '#ds',
            data: data,
            computed: {
                ffps: function () {
                    // first, filter items of list on input.
                    var filterList = this.ffp.filter(function (element) {
                        // str.includes(searchString[, position]) - 区分大小写
                        // both string translate to lower case before find.
                        var inStr = this.name.toLowerCase();
                        var itemOfList = element.name.toLowerCase();
                        var result = itemOfList.includes(inStr);
                        return result;
                    }, this);
                    // then, sort on age of item by desc
                    var sortList = filterList.sort(function (a, b) {
                        if(a.age > b.age){
                            return 1;
                        }else{
                            return -1;
                        }
                    });
                    return sortList;
                }
            }
        })
    }

    return {
        load: load
    };
});