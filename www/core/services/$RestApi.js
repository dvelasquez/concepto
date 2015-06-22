/**
 * Created by Danilo on 21/06/2015.
 */
angular.module('Core.Services')

    .service('$RestApi', function ($http, $log, CONFIGURATION) {
        var _endpoint = CONFIGURATION.API_ENDPOINT;

        function get_endpoint() {
            if (!_endpoint) {
                throw Error("endpoint is not defined , you must define a variable endpoint for use $RestApi service");
            }

            return _endpoint;
        }

        function invoke(method, url, body) {
            var headers = {
                'Content-Type': 'application/json'
            };
            //if ($Profile.isAuthenticated()) {
            //    headers['Authorization'] = $Profile.get('jwt');
            //}
            var cfg = {
                url: get_endpoint() + url,
                method: method,
                headers: headers
            };

            cfg[(method == "GET" ? "params" : "data")] = body;

            $log.debug("[" + method + " " + url + "] parameters: ", body);

            //$log.debug($http(cfg));

            var http = $http(cfg)
                .success(function (data, status, headers, config) {
                    //IF DEBUGGING??
                    //console.log(arguments)
                })

                .error(function (data, status, headers, config) {
                    //IF DEBUGGING??
                    //console.log(arguments)
                });

            return http;
        }

        function invokeAnonymous(endpoint, method, url, body) {
            var headers = {
                'Content-Type': 'application/json'
            };

            var cfg = {
                url: endpoint + url,
                method: method,
                headers: headers
            };

            cfg[(method == "GET" ? "params" : "data")] = body;

            $log.debug("[" + method + " " + url + "] parameters: ", body);

            $log.debug($http(cfg));

            var http = $http(cfg)
                .success(function (data, status, headers, config) {
                    //IF DEBUGGING??
                    //console.log(arguments)
                })

                .error(function (data, status, headers, config) {
                    //IF DEBUGGING??
                    //console.log(arguments)
                });

            return http;
        }

        return {
            get_endpoint: get_endpoint,
            invoke: invoke,
            invokeAnonymous: invokeAnonymous
        }

    });