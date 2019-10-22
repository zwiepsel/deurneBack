angular.module('yapp')
  .controller('DiscountCtrl',['$scope', '$state', '$http', '$localStorage', function ($scope, $state, $http, $localStorage) {

    $scope.chosenDiscount = {};
    $scope.chosenDiscount.startDate = new Date().format('d-m-Y');
    var dateToday = new Date();
    //$scope.$onInit = activate();

    $('.input-group.date').datepicker({
      format: "dd-mm-yyyy",
      todayBtn: "linked",
      language: "nl",
      autoclose: true,
      todayHighlight: true,
      startDate: dateToday
    });

    $scope.generateCode = function () {
      $scope.chosenDiscount.code = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }

    $scope.createDiscount = function () {
      $('#discountModal').modal({
        show: 'true'
      });
    }

    $scope.findDiscount = function(){
    $scope.discountSearch = true;
    $('#discountSearchModal').modal({
        show: 'true'
      });
    }

    $scope.searchDiscount = function(searchDiscount){
        $http({
        //  url: 'http://h2733926.stratoserver.net/DeurneAPI/api/discounts/find',
          url: 'http://localhost:51556/api/discounts/find',
          method: 'post',
          async: true,
          crossDomain: true,
          data: {
            "code": searchDiscount.code,
            "description": searchDiscount.description,
            "amount": searchDiscount.amount,
            "percentage": searchDiscount.percentage,
            "validFrom": dateString2Date(searchDiscount.startDate),
            "validTill": dateString2Date(searchDiscount.endDate),
            "Charges": searchDiscount.charges,
            "Email" : searchDiscount.email
          },
          headers: {
            'Authorization': 'Bearer ' + $localStorage.currentUser.token,
            'Content-Type': 'application/json;charset=UTF-8'
          },
        }).then(function (response) {
          if (response) {
            $.toaster('Korting gevonden', 'Verwerkt', 'success');
            $scope.chosenDiscount.code = response.data.Code;
            $scope.chosenDiscount.description = response.data.Description;
            $scope.chosenDiscount.email = response.data.Email;
            $scope.chosenDiscount.amount = response.data.Amount;
            $scope.chosenDiscount.percentage = response.data.Percentage;
            $scope.chosenDiscount.charges = response.data.Charges;
            $scope.chosenDiscount.startDate = new Date(response.data.ValidFrom).format('d-m-Y');
            $scope.chosenDiscount.endDate = new Date(response.data.ValidTill).format('d-m-Y');

          } else {
            $.toaster('Korting niet gevonden', 'helaas', 'warning');
            $scope.chosenDiscount = {};
          }
        }, function errorCallback(response) {
            $.toaster('Korting niet gevonden', 'helaas', 'warning');
            $scope.errorMessage = "Er is iets fout gegaan: " + response.data;
            $scope.chosenDiscount = {};
            console.log(response.data);
        });
    }

    $scope.abortDiscount = function(){
        $scope.chosenDiscount = {};
        $('#discountModal').modal('hide');
    }

    $scope.abortSearchDiscount = function(){
        $scope.chosenDiscount = {};
        $('#discountSearchModal').modal('hide');
    }

    $scope.saveDiscount = function (chosenDiscount) {
      $scope.submitted = true;
      if ($scope.discountForm.$valid) {
        $http({
        //  url: 'http://h2733926.stratoserver.net/DeurneAPI/api/discounts/create',
          url: 'http://localhost:51556/api/discounts/create',
          method: 'post',
          async: true,
          crossDomain: true,
          data: {
            "code": chosenDiscount.code,
            "description": chosenDiscount.description,
            "amount": chosenDiscount.amount,
            "percentage": chosenDiscount.percentage,
            "validFrom": dateString2Date(chosenDiscount.startDate),
            "validTill": dateString2Date(chosenDiscount.endDate),
            "Charges": chosenDiscount.charges,
            "Email" : chosenDiscount.email
          },
          headers: {
            'Authorization': 'Bearer ' + $localStorage.currentUser.token,
            'Content-Type': 'application/json;charset=UTF-8'
          },
        }).then(function (response) {
          if (response) {
            $.toaster('Korting succesvol aangemaakt', 'Verwerkt', 'success');
            $scope.chosenDiscount = {};
            $('#discountModal').modal('hide');
          } else {
            console.log('error', response.data)
          }
        }, function errorCallback(response) {
          $scope.errorMessage = "Er is iets fout gegaan: " + response.data;
          console.log(response.data);
        });
      }
    }

    function randomString(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    }

    function dateString2Date(dateString) {
      if(dateString != undefined)
      {
      var dt = dateString.split(/\-|\s/);
      return new Date(dt.slice(0, 3).reverse().join('-'));
      }
    }


  }]);
