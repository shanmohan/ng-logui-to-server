"use strict";!function(){angular.module("ek.logger",[])}(),function(){function a(a,b){function c(){return printStackTrace()}function d(){return printStackTrace()}function e(a,c){var e=angular.toJson({url:b.location.href,message:a,type:c,stackTrace:d});console.log("Logging from logIntoServer##"),console.log(e);$.ajax({type:"POST",url:"http://lnxdevvm272:5000/syslog",contentType:"text/plain",data:e})}function f(b){a.error(b),e(b,"error")}function g(b){a.debug(b),e(b,"warn")}return{print:c,debug:g,error:f}}angular.module("ek.logger").factory("logService",a),a.$inject=["$log","$window"]}(),function(){function a(a,b,c){return function(b,d){a.debug("### Unhandled exception => exceptionLoggingService ##"),a.error.apply(a,arguments);try{var e=b.toString(),f=c.print({e:b});c.error(e,"error",f,d)}catch(g){a.warn("Error while logging the errors to the server"),a.error(g)}}}angular.module("ek.logger").factory("exceptionLoggingService",a),a.$inject=["$log","$window","logService"]}(),function(){angular.module("ek.logger").provider("$exceptionHandler",{$get:function(a){return a}})}(),function(){function a(a,b){function c(a){return a}function d(a){return a}function e(a){return a}function f(c){b.debug("## $http call failed => responseErrorInterceptor##");var d={method:c.config.method,url:c.config.url,message:c.data,status:c.status};return b.error(JSON.stringify(d)),a.reject(c)}var g={request:c,requestError:d,response:e,responseError:f};return g}angular.module("ek.logger").factory("interceptorService",a),a.$inject=["$q","logService"]}(),function(){function a(a){a.interceptors.push("interceptorService")}angular.module("ek.logger").config(a),a.$inject=["$httpProvider"]}();