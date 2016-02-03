'use strict';

(function () {

    var socialIntegrationModule = angular.module('TVG.SocialIntegration');

    socialIntegrationModule
        .controller('SocialIntegrationCtrl', ['FacebookFac', '$scope', function (FacebookFac, $scope) {

            var ctrl = this;

            ctrl.data = {
                showLoginButton: true,
                facebookData: null,
                facebookDataStringified: null,
                facebookTokens: null,
                facebookTokensStringified: null
            };

            ctrl.loginOnFacebook = function () {
                FacebookFac.login().then(function () {

                    ctrl.data.showLoginButton = false;
                }, function () {
                    ctrl.data.showLoginButton = true;
                });
            };

            ctrl.logoutFromFacebook = function () {
                FacebookFac.logout().then(function () {
                    ctrl.data.showLoginButton = true;
                });
            };

            $scope.$on('FacebookFac::InvalidUserSession', function () {
                ctrl.data.showLoginButton = true;
                ctrl.data.facebookData = null;
            });

            $scope.$on('FacebookFac::ValidUserSession', function () {
                ctrl.data.facebookData = FacebookFac.getUserData();
                ctrl.data.facebookTokens = FacebookFac.getUserTokens();
                ctrl.data.facebookDataStringified = JSON.stringify(ctrl.data.facebookData, undefined, 2);
                ctrl.data.facebookTokensStringified = JSON.stringify(ctrl.data.facebookTokens, undefined, 2);
                ctrl.data.showLoginButton = false;
            });

        }]);

}());