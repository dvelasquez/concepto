/**
 * Created by Danilo on 20/06/2015.
 */
angular.module('Core',[]);

angular.module('Core.Services',[]);

angular.module('Core',[
    'Core.Services'
])

    .run(function($log){
        $log.debug('App Controllers Lifted');
    });