/**
 * Created by Administrator on 2016/11/25.
 */
define(['jquery',
        'text!../../html/demo1.html',
        'css!../../css/lesson1.css'],
    function ($,htmlDemo) {
        // load html
        $("#ds").html('');
        $("#ds").append(htmlDemo);

        var options = ('选项一,选项二,选项三,选项四,选项五').split(',');
        var $mySelector = $('#mySelector');
        var $mySelectorText = $mySelector.find('.form-select-text');
        var $mySelectorListDiv = $mySelector.find('.form-select-list');
        var $mySelectorList = $mySelector.find('.form-select-list ul');

        $mySelectorText.html(options[0]);
        $mySelectorListDiv.hide();
        $.each(options, function (idx, option) {
            $mySelectorList.append($('<li>' + option + '</li>'))
        });

        $mySelectorList.on('click', 'li', function (e) {
            $mySelectorText.html(options[$(this).index()])
            $mySelectorListDiv.hide()
        })

        $('.form-select').on('mouseover', function (e) {
            $(this).find('.form-select-list').show()
        }).on('mouseout', function (e) {
            $(this).find('.form-select-list').hide()
        })
});