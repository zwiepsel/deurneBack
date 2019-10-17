angular.module('yapp')
  .controller('UsersCtrl',['$scope', '$state', '$http', '$localStorage' ,function ($scope, $state, $http, $localStorage) {
   $scope.$onInit = activate();

    $scope.filter = function(e){
        var $panel = $(e.target).parents('.filterable'),
        $filters = $panel.find('.filters input'),
        $tbody = $panel.find('.table tbody');
        if ($filters.prop('disabled') == true) {
            $filters.prop('disabled', false);
            $filters.first().focus();
        } else {
            $filters.val('').prop('disabled', true);
            $tbody.find('.no-result').remove();
            $tbody.find('tr').show();
        }
    };

    $('.filterable .filters input').keyup(function(e){
        /* Ignore tab key */
        var code = e.keyCode || e.which;
        if (code == '9') return;
        /* Useful DOM data and selectors */
        var $input = $(this),
        inputContent = $input.val().toLowerCase(),
        $panel = $input.parents('.filterable'),
        column = $panel.find('.filters th').index($input.parents('th')),
        $table = $panel.find('.table'),
        $rows = $table.find('tbody tr');
        /* Dirtiest filter function ever ;) */
        var $filteredRows = $rows.filter(function(){
            var value = $(this).find('td').eq(column).text().toLowerCase();
            return value.indexOf(inputContent) === -1;
        });
        /* Clean previous no-result if exist */
        $table.find('tbody .no-result').remove();
        $rows.show();
        $filteredRows.hide();
        /* Prepend no-result row if all rows are filtered */
        if ($filteredRows.length === $rows.length) {
            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="'+ $table.find('.filters th').length +'">No result found</td></tr>'));
        }
    });

    $scope.deleteUser = function(){
      $scope.deleteUser = true;
      $('#usersModal').modal('hide');
        $('#deleteUserModal').modal({
          show: 'true'
        });
    }
    
    $scope.abortUser = function () {
      $('#usersModal').modal('hide');
    }

    $(document).ready(function () {
        $(":checkbox").labelauty({
            label: false
        });
    });

    $scope.openUser = function(user){
      $scope.chosenUser = user;
      $scope.chosenUser.title = "Wijzig gebruiker"
        $('#usersModal').modal({
          show: 'true'
        });
    }

    $scope.abortDelete= function(){
      $('#deleteUserModal').modal('hide');
      $.toaster('Verwijderen afgebroken', 'geannuleerd', 'warning');
    }

    $scope.deleteUserConfirmed = function(user){
              $http({
          url: 'http://h2733926.stratoserver.net/DeurneAPI/api/accounts/deleteUserByName',
          method: 'delete',
          async: true,
          crossDomain: true,
          data: {
              "City": user.city,
              "FirstName": user.firstName,
              "LastName": user.lastName,
              "Phone" : user.phoneNumber,
              "Street" : user.street,
              "Username" : user.email,
              "Zipcode" : user.zipcode,
              "Email" : user.email
            },
        headers: {
            'Authorization': 'Bearer ' + $localStorage.currentUser.token,
            'Content-Type' : 'application/json;charset=UTF-8'
        },
        }).then(function (response) {
          if (response) {
              $('#deleteUserModal').modal('hide');
              activate();
              $.toaster('Gebruiker succesvol verwijderd', 'Verwerkt', 'success');
          } else {
            console.log('error', response)
              $.toaster('Gebruiker niet verwijderd', 'Fout', 'error');
          }
        }, function errorCallback(response) {
          $scope.errorMessage = "Er is iets fout gegaan: " + response;
            $.toaster('Gebruiker niet verwijderd', 'Fout', 'error');
        });


    }

    $scope.saveUser = function(user)
    {
        $http({
          url: 'http://h2733926.stratoserver.net/DeurneAPI/api/accounts/updateUser',
          method: 'post',
          async: true,
          crossDomain: true,
          data: {
              "City": user.city,
              "FirstName": user.firstName,
              "LastName": user.lastName,
              "Phone" : user.phoneNumber,
              "Street" : user.street,
              "Username" : user.email,
              "Zipcode" : user.zipcode,
              "Email" : user.email
              // "timeRange": $scope.selectedStartTime.id + ',' + (Number($scope.selectedEndTime.id) - 1)
            },
        headers: {
            'Authorization': 'Bearer ' + $localStorage.currentUser.token,
            'Content-Type' : 'application/json;charset=UTF-8'
        },
        }).then(function (response) {
          if (response) {
              $.toaster('Gebruiker succesvol bijgewerkt', 'Verwerkt', 'success');
              $('#usersModal').modal('hide');
          } else {
            console.log('error', response)
            console.log(response.data);
          }
        }, function errorCallback(response) {
          $scope.errorMessage = "Er is iets fout gegaan: " + response;
            console.log(response.data);
        });
    }

    function activate() {

        $http({
          url: 'http://h2733926.stratoserver.net/DeurneAPI/api/accounts/users',
          method: 'get',
          async: true,
          crossDomain: true,
        headers: {
            'Authorization': 'Bearer ' + $localStorage.currentUser.token,
            'Content-Type' : 'application/json;charset=UTF-8'
        },
        }).then(function (response) {
          if (response) {
            $scope.users = response.data
            
            $scope.length = $scope.users.length
          } else {
            console.log(response.data);
          }
        }, function errorCallback(response) {
          $scope.errorMessage = "Er is iets fout gegaan: " + response;
            console.log(response.data);
        });
    }

  }]);