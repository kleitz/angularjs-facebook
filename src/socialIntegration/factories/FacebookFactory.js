'use strict';

(function () {

    var socialIntegrationModule = angular.module('TVG.SocialIntegration');

    socialIntegrationModule.factory('FacebookFac', ['$q', 'User', '$rootScope', function ($q, User, $rootScope) {

        var user = null;
        var tokens = {};

        function clearInfo() {
            user = null;
            tokens = {};
        }

        function getUserInfo() {
            var deferred = $q.defer();
            FB.api('/me?fields=first_name,last_name,email,picture,birthday,location,hometown', function(res) {
                user = User.build(res);
                deferred.resolve(user);
            });
            return deferred.promise;
        }

        //Subscribe to facebook API to wathc the user session changes
        //Note: This is interesting for real application purposes
        function watchLoginChange() {
            FB.Event.subscribe('auth.authResponseChange', function(res) {
                if (res.status === 'connected') { //Check different states on facebook dev pages
                    //This is also the point where you should create a session for the current user.
                    //For this purpose you can use the data inside the res.authResponse object.
                    tokens = res.authResponse;
                    getUserInfo().then(function() {
                        $rootScope.$broadcast('FacebookFac::ValidUserSession');
                    }, function () {
                        clearInfo();
                        $rootScope.$broadcast('FacebookFac::InvalidUserSession');
                    }).finally(function () {
                        if(!$rootScope.$$phase){
                            $rootScope.$apply();
                        }
                    });
                }
                else { //The user is not logged to the app, or into Facebook: destroy the session on the server.
                    clearInfo();
                    $rootScope.$broadcast('FacebookFac::InvalidUserSession');
                }
            });
        }

        function logout() {
            var deferred = $q.defer();
            FB.logout(function(response) {
                deferred.resolve(response);
                $rootScope.$apply();
            });
            return deferred.promise;
        }

        function login() {
            var deferred = $q.defer();
            FB.login(function(response) {
                if (response.status === 'connected') {
                    deferred.resolve(response);
                } else if (response.status === 'not_authorized') { // The person is logged into Facebook, but not your app.
                    deferred.reject(response);
                } else {
                    // The person is not logged into Facebook, so we're not sure if
                    // they are logged into this app or not.
                    deferred.reject(response);
                }
                $rootScope.$apply();
            }, {scope: 'public_profile,email,user_birthday'});
            return deferred.promise;
        }

        function getUserData() {
            return angular.copy(user);
        }

        function getUserTokens() {
            return angular.copy(tokens);
        }

        return {
            login: login,
            logout: logout,
            watchLoginChange: watchLoginChange,
            getUserData: getUserData,
            getUserTokens: getUserTokens
        };

    }]);

}());