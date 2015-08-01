/*
 * Created On : 23-June-2015
 * Created By : Mohan Shanmugarajah [S404853]
 * Purpose    : Module which manages the client side error/debug/exception logging into the server,
 *              Intended to be re-used across the empact UI projects
 * */

'use strict';

(function(){

    //Overrides angular's default exception handler with out loggingService
    angular.module('logger').provider('$exceptionHandler', {
            $get: function (exceptionLoggingService) {
                return (exceptionLoggingService);
            }
        }
    );


})();
