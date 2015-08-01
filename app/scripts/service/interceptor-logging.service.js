/*
 * Author  : Mohan Shanmugarajah
 * Date    : 23-June-2015
 * Purpose : An interceptor service which intercepts $http calls and exposes necessary
 *           functionalities such as expception handling
 * */

(function () {

    angular.module('ek.logger').factory('interceptorService',interceptorService );

    interceptorService.$inject = ['$q','logService'];

    function interceptorService($q,logService){

        var interceptor = {
            request : requestInterceptor,
            requestError : requestErrorInterceptor,
            response : responseInterceptor,
            responseError : responseErrorInterceptor
        };


        function requestInterceptor(config){
            //dataService.RequestModuleObj.IsHttpServicesAvailable = true;
            //config.headers['x-session-token'] = '415954427904';
            //config.headers['ajax-request'] = 'YES';
            //console.info('requestInterceptor is called');
            return config;
        }

        function requestErrorInterceptor(config){
            return config;
        }



        function responseInterceptor(config){

            return config ;
        }

        function responseErrorInterceptor(response){

            logService.debug('## $http call failed => responseErrorInterceptor##');

            var error = {
                method : response.config.method,
                url : response.config.url,
                message : response.data,
                status : response.status
            };

            logService.error(JSON.stringify(error));

            return $q.reject(response);
        }

        return interceptor
    }

})();
