/**
 * Created by Danilo on 20/06/2015.
 */
angular.module('Login.Controllers',[]);
angular.module('Layout.Controllers',[]);
angular.module('Home.Controllers',[]);
angular.module('Test.Controllers',[]);

angular.module('App.Controllers',[
    'Login.Controllers',
    'Layout.Controllers',
    'Home.Controllers',
    'Test.Controllers'

])

    .run(function($log){
        $log.debug('App Controllers Lifted');
    });