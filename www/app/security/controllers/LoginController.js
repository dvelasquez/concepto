/**
 * Created by Danilo on 20/06/2015.
 */
angular.module('Login.Controllers')
    .controller('LoginController',function($scope, $log, $state, $RestApi){
        $scope.user = {
            username:null,
            password:null
        };


        $scope.login = function(){
            $state.go('app.home');
        };
    });