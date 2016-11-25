/**
 * Created by Administrator on 2016/11/25.
 */
define(['jquery',
        'text!../../html/demo1.html',
        'css!../../css/lesson1.css'],
    function ($,htmlDemo1) {
        // load html
        $("#ds1").append(htmlDemo1);

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
});