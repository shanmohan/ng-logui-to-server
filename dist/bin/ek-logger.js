/*
* Created On : 23-June-2015
* Created By : Mohan Shanmugarajah [S404853]
* Purpose    : Module which manages the client side error/debug/exception logging into the server,
*              Intended to be re-used across the empact UI projects
* */

'use strict';

(function(){

    angular.module('ek.logger', []);

})();

/*
* Created On : 23-June-2015
*@ Created By : Mohan Shanmugarajah
* Purpose    : Exposes logging services
* */

'use strict';

(function(){

    angular.module('ek.logger').factory('logService', logService);

    logService.$inject = ['$log','$window'];

    function logService($log,$window){
        return {
            print : print,
            debug : debug,
            error : error
        };

        function print(){
            return printStackTrace();
        }

        function getStackTrace(){
            return printStackTrace();
        }

        function logIntoServer(message,type){

            var logData = angular.toJson({
                            url : $window.location.href,
                            message : message,
                            type : type,
                            stackTrace : getStackTrace
                        });

            console.log('Logging from logIntoServer##');
            console.log(logData);

            var req = {
                method: 'POST',
                url: 'http://lnxdevvm272:5000/syslog',
                headers: {
                    'Content-Type': 'text/plain'
                },
                data: logData
            };

            $.ajax({
                type : 'POST',
                url : 'http://lnxdevvm272:5000/syslog',
                contentType : 'text/plain',
                data : logData
            });

           // $http(req);
        }

        function error(message){
            $log.error(message);
            logIntoServer(message,'error');
        }

        function debug(message){
            $log.debug(message);
            logIntoServer(message,'warn');
        }
    }


})();

/*
* Created By : Mohan Shanmugarajah
* Created On : 23-June-2015
* Purpose    : Service which overrides the default angular exception logging
* */

'use strict';

(function(){

    angular.module('ek.logger').factory('exceptionLoggingService', exceptionLoggingService);

    exceptionLoggingService.$inject = ['$log', '$window','logService'];

    function exceptionLoggingService($log, $window, logService){

        return function error(exception, cause){

            $log.debug('### Unhandled exception => exceptionLoggingService ##');

            $log.error.apply($log, arguments);

            try{

                var errorMessage = exception.toString();
                var stackTrace = logService.print({e: exception});

                //Log the error at the server side
                //To be implemented

                logService.error(errorMessage, 'error',stackTrace,cause);

     /*           $.ajax({
                    type : 'POST',
                    url : '',
                    contentType : 'application/json',
                    data : angular.toJson({
                        url : $window.location.href,
                        message : errorMessage,
                        type : 'exception',
                        stackTrace : stackTrace,
                        cause : cause
                    })
                })*/

            }catch (loggingError){
                $log.warn('Error while logging the errors to the server');
                $log.error(loggingError);
            }

        }

    }



})();

/*
 * Created On : 23-June-2015
 * Created By : Mohan Shanmugarajah [S404853]
 * Purpose    : Module which manages the client side error/debug/exception logging into the server,
 *              Intended to be re-used across the empact UI projects
 * */

'use strict';

(function(){

    //Overrides angular's default exception handler with out loggingService
    angular.module('ek.logger').provider('$exceptionHandler', {
            $get: function (exceptionLoggingService) {
                return (exceptionLoggingService);
            }
        }
    );


})();

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

/*
* Created By : Mohan Shanmugarajah
* Created On : 23-June-2015
* Purpose    : Configuration to inject the interceptor*/

'use strict';

(function(){

    angular.module('ek.logger').config(interceptorConfig);

    interceptorConfig.$inject = ['$httpProvider'];

    function interceptorConfig($httpProvider){
        $httpProvider.interceptors.push('interceptorService');
    }

})();


/**
 * Created by Mohanachandran on 8/2/2015.
 */

angular.module('app',['ek.logger']);

angular.module('app').controller('TestController', TestController);

TestController.$inject = ['logService'];

function TestController(logService){
  logService.debug('Hi');
}
