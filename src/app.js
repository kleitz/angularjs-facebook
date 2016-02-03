'use strict';

// Declare app level module which depends on views, and components
angular.module('TVG', [
    'ngRoute',
    'TVG.SocialIntegration'
    ]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/socializing'});
    }])
    .run(['$rootScope', '$window', 'FacebookFac',
        function ($rootScope, $window, FacebookFac) {

            $window.fbAsyncInit = function () {
                // Executed when the SDK is loaded
                FB.init({
                    //The app id of the web app; To register a new app visit Facebook App Dashboard( https://developers.facebook.com/apps/ )
                    appId: '516247548562965', //Change this to be read or configured somewhere. I dont like this beeing statically defined
                    //Set if you want to check the authentication status at the start up of the app
                    status: true,

                    //Enable cookies to allow the server to access the session
                    cookie: true,

                    /* Parse XFBML */
                    xfbml: true,
                    version    : 'v2.5'
                });

                FacebookFac.watchLoginChange();
            };

            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }]);
