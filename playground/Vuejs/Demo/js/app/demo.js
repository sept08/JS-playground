/**
 * Created by Administrator on 2016/11/25.
 */
define(['jquery'], function ($) {
    $("#demo1").on('click', function () {
       require(['app/demo1']);
    });

    $("#demo2").on('click', function () {
        require(['app/demo2']);
    });

    $("#demo3").on('click', function () {
        require(['app/demo3']);
    });
});