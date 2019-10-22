'use strict';

angular.module('yapp')
  .controller('LoginCtrl', ['$scope', '$location', '$http', '$localStorage',function($scope, $location, $http, $localStorage) {

    $scope.submit = function() {
        $scope.loginErrorMessage = ""
      login($scope.user.email, $scope.user.password, function (result) {
                if (result === true) {
                    $scope.title = 'Locatie & Tijdstip';
                    $scope.login = true;
                    $scope.hasError = false;
                    $scope.loginHide = true;
                    $location.path('/dashboard');
                } else {
                    $scope.error = 'Email of wachtwoord niet juist';
                    $scope.hasError = true;
                    $scope.loading = false;
                }
            })


      return false;
    }
            function login(username, password, callback) {
            $http({
              //  url:   'http://h2733926.stratoserver.net/DeurneAPI/oauth/token',
                url: 'http://localhost:51556/oauth/token',
                method: 'post',
                async: true,
                crossDomain: true,
                data: $.param({username : username, password : password, "grant_type": "password"}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            }).then(function (response) {
                    // login successful if there's a token in the response
                    if (response.data.access_token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = { username: username, token: response.data.access_token};
 
                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
                        $scope.userStatus = 'Ingelogd: ' + $localStorage.currentUser.username;                   
                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        $scope.loginErrorMessage = "Gebruikersnaam of wachtwoord onjuist"
                        // execute callback with false to indicate failed login
                        callback(false);

                    }
                }, function errorCallback(response) {
                if (response) {
                    callback(false);
                    $scope.logginFailed = true;
                    $scope.loginErrorMessage = "Gebruikersnaam of wachtwoord onjuist"
                }
            })

        }
  }]);
