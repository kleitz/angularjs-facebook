'use strict';

(function () {

    var socialIntegrationModule = angular.module('TVG.SocialIntegration');

    socialIntegrationModule
        .factory('User', [function () {

            function User(id, firstName, lastName, email, homeTown, currentLocation, birthday, pictureUrl, state) {
                this.id = id;
                this.firstName = firstName;
                this.lastName = lastName;
                this.email = email;
                this.homeTown = homeTown;
                this.currentLocation = currentLocation;
                this.birthday = birthday;
                this.pictureUrl = pictureUrl;
                this.state = state;
            }

            function parseHomeTown(hometown) {
                return hometown.name ? hometown.name.split(',')[0]: null;
            }

            function parseLocation(location) {
                return location.name ? location.name.split(',')[0]: null;
            }

            function parsePicture(picture) {
                return picture.data ? picture.data.url : null;
            }

            function parseState(fullLocation){
                return fullLocation.name ? fullLocation.name.split(',')[1]: null;
            }

            User.build = function(data) {
                return new User(
                    data.id,
                    data.first_name,
                    data.last_name,
                    data.email,
                    data.hometown ? parseHomeTown(data.hometown) : null,
                    data.location ? parseLocation(data.location) : null,
                    data.birthday,
                    parsePicture(data.picture),
                    data.location ? parseState(data.location) : null
                );
            };

            return User;

        }]);

}());