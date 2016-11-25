/**
 * Created by Administrator on 2016/11/26.
 */
define(['jquery',
        'vue',
        'text!../../html/demo4.html'],
    function ($,Vue,htmlDemo) {
        $("#ds").html('');
        $("#ds").append(htmlDemo);

        var vm = new Vue({
            el: '#ds',
            data: {
                user: {
                    photo: 'image/BillGates.jpg',
                    name: 'Bill Gates',
                    profile: '<div><strong>技术专家</strong>、<strong>商业领袖</strong>与<strong>慈善家</strong>，比尔及梅琳达·盖茨基金会联席主席。</div><div><a href="http://www.weibo.com/gates" target="_blank">访问微博</a></div>'
                }
            }
        })
});