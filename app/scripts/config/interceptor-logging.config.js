/*
* Created By : Mohan Shanmugarajah
* Created On : 23-June-2015
* Purpose    : Configuration to inject the interceptor*/

'use strict';

(function(){

    angular.module('logger').config(interceptorConfig);

    interceptorConfig.$inject = ['$httpProvider'];

    function interceptorConfig($httpProvider){
        $httpProvider.interceptors.push('interceptorService');
    }

})();

