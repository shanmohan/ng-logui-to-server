/*
* Created By : Mohan Shanmugarajah
* Created On : 23-June-2015
* Purpose    : Service which overrides the default angular exception logging
* */

'use strict';

(function(){

    angular.module('logger').factory('exceptionLoggingService', exceptionLoggingService);

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
