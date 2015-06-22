/**
 * Created by Danilo on 20/06/2015.
 */
angular.module('Layout.Controllers')
    .controller('LayoutController', function ($scope, $log, $state, $RestApi) {
        $scope.menu = [
            {
                submenu: [{url:'app.home', title:'Home'}]
            }
        ];
        $scope.user = {
            name:'Danilo',
            role:'President of Life'
        };

        //-------------------------------------------------------------------
        $scope.close = function () {
            $mdSidenav('left').close();
        };
        //-------------------------------------------------------------------

        //-------------------------------------------------------------------
        $scope.toggleLeft = function () {
            $mdSidenav('left').toggle();
        };
        //-------------------------------------------------------------------

        //-------------------------------------------------------------------
        $scope.logout = function () {
        };
        //-------------------------------------------------------------------

        //-------------------------------------------------------------------
        // MENU REDIRECT
        $scope.loadUrl = function (url) {
            $state.go(url);
        };
    });