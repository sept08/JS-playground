// Load config.js code that includes configuration, then load the main logic for this page
requirejs(['./config'], function(cfg){
	require(['app/main']);
});