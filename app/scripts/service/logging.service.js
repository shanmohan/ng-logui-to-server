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
