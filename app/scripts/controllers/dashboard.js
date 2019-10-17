'use strict';


angular.module('yapp')
  .controller('DashboardCtrl',['$scope', '$state', '$localStorage', '$http', function($scope, $state, $localStorage, $http) {
    $scope.$state = $state;
    $scope.menuItems = [];
    angular.forEach($state.get(), function (item) {
        if (item.data && item.data.visible) {
            $scope.menuItems.push({name: item.name, text: item.data.text});
        }
    });
    $scope.menuItems.push()

 
        $scope.logout= function() {
            console.log('uitloggen')
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
            $state.go('login');
        }


  }]);
