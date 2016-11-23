/**
 * Created by Administrator on 2016/11/23.
 */
requirejs.config({
   baseUrl: 'js/lib',
    paths: {
       app: '../app',
    }
});

requirejs(['app/demo']);