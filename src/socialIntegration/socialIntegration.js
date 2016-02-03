'use strict';
(function() {

  angular.module('TVG.SocialIntegration', ['ngRoute'])

      .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/socializing', {
          templateUrl: 'src/socialIntegration/templates/social-integration.html',
          controller: 'SocialIntegrationCtrl',
          controllerAs: 'socialIntegration'
        });
      }]);

}());