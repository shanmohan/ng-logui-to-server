/**
 * Created by Mohanachandran on 8/2/2015.
 */

angular.module('app',['ek.logger']);

angular.module('app').controller('TestController', TestController);

TestController.$inject = ['logService'];

function TestController(logService){
  logService.debug('Hi');
}
