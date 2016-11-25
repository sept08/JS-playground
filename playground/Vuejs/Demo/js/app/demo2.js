/**
 * Created by Administrator on 2016/11/23.
 */
define(['text!../../html/demo1.html'],function () {
    console.log("aaaa")
    var options = ('选项一,选项二,选项三,选项四,选项五').split(',');
    debugger
    var $mySelector = $('#mySelector')
    var $mySelectorText = $mySelector.find('.form-select-text')
    var $mySelectorListDiv = $mySelector.find('.form-select-list')
    var $mySelectorList = $mySelector.find('.form-select-list ul')

    $mySelectorText.html(options[0])
    $mySelectorListDiv.hide()
    $.each(options, function (idx, option) {
        $mySelectorList.append($('<li>' + option + '</li>'))
    })

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