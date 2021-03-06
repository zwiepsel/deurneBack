'use strict';

angular.module('yapp')
  .controller('ReservationCtrl', ['$scope', '$state', '$http', '$localStorage', function ($scope, $state, $http, $localStorage) {
    $scope.$state = $state;
    var dateToday = new Date();
    $scope.getTimes = false;
    $scope.field1 = true;
    $scope.timeDisabled = true;
    $scope.clicked = false;
    $scope.login = true;
    $scope.create = false;
    $scope.update = false;
    $scope.chosenReservation = {};
    $scope.dongemond = false;
    $scope.selectedLocation = 'Kies een locatie'
    $scope.selectedDate = new Date().format('d-m-Y');
    console.log($scope.selectedDate)
    var dateToday = new Date();
    $scope.$onInit = activate();
    $scope.reservationsToday = [];
    $scope.types = [{
      'id' : 1, 'name' : 'Soccer'
    }, {
      'id' : 2, 'name' : 'Squash'
    }, {
      'id' : 3,  'name' : 'Jump'
    }]

    $('.input-group.date').datepicker({
      format: "dd-mm-yyyy",
      todayBtn: "linked",
      language: "nl",
      autoclose: true,
      todayHighlight: true,
      startDate: dateToday
    });

    $scope.updateData = function () {
      if ($scope.locationId !== undefined && $scope.selectedDate != undefined) {
        $http({
          url: 'http://localhost:51556/api/reservations/byDateLocation',
       //   url: 'https://reserveren.amesdeurne.nl/api/reservations/byDateLocation',
          method: 'get',
          async: true,
          crossDomain: true,
          params: {
            locationId: $scope.locationId,
            date: $scope.selectedDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") 
          }
        }).then(function (response) {
          if (response) {
            $scope.reservationsToday = response.data;
            var d = new Date($scope.selectedDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") )
            createTimePartsModels($scope.amountOfFields, response.data, d.getDay());

          } else {
            console.log('error', response)
          }
        }, function errorCallback(response) {
          $scope.errorMessage = "Er is iets fout gegaan: " + response;
        });
        $scope.getTimes = true;
        $scope.$applyAsync();
      }
    }


    $scope.$watch('selectedType', function () {
      if ($scope.selectedType === 'Soccer') {
          $scope.locationId = 1;
      }
      if ($scope.selectedType === 'Squash') {
        $scope.locationId = 2;
      }
      if ($scope.selectedType === 'Jump') {
        $scope.locationId = 4;
      }
      $scope.updateData();
    });

    $scope.$watch('selectedDate', function () {
      $scope.updateData();

    });

    function TimePartModel(booked, data, iteration, starttime, location) {
      var text = ''
      if (location === "Geertruidenberg") {
        for (i = 0; i < booked.length; i++) {
          text += booked[i].timeRange + ',';
        }
        var times = text.split(',');
        var timeArray = [];
        var resStatus = 'vrij';
        var startHour = starttime;
        var startMinutes = '00';
        var hour = startHour;
        var minutes = startMinutes;
        var calculatedHour = ""
        for (var i = 0; i < iteration; i++) {
          if (times.includes(i.toString())) {
            resStatus = 'bezet'
          } else {
            resStatus = 'vrij'
          }
          if (hour === 23) {
            calculatedHour = hour + ':' + minutes + '-' + 0 + ':' + minutes
          } else {
            calculatedHour = hour + ':' + minutes + '-' + Number(hour + 1) + ':' + minutes
          }
          timeArray.push({
            id: i,

            time: calculatedHour,
            status: resStatus,
            price: 50
          })
          hour = hour + 1;
          // minutes = '00'

        }
        return timeArray;
      } else {
        for (i = 0; i < booked.length; i++) {
          text += booked[i].timeRange + ',';
        }
        var times = text.split(',');
        var timeArray = [];
        var resStatus = 'vrij';

        var startHour = 8;
        var startMinutes = '00';
        var hour = startHour;
        var minutes = startMinutes;
        for (var i = 0; i < 32; i++) {
          var user = '';
          if (times.includes(i.toString())) {
            resStatus = 'bezet'
            for (var j = 0; j < data.length; j++) {
              if (_.contains(data[j].timeRange.split(','), i.toString())) {
                user = data[j].username
              }
            }
          } else {
            resStatus = 'vrij'
          }
          timeArray.push({
            id: i,
            time: hour + ':' + minutes,
            status: resStatus,
            price: 30,
            user: user
          })
          if (minutes === '30') {
            hour = hour + 1;
            minutes = '00'
          } else {
            minutes = '30';
          }

        }
        return timeArray;
      }



    }

    function TimePartModelSoccer(booked) {
      var text = ''
      for (i = 0; i < booked.length; i++) {
          text += booked[i].timeRange + ',';
      }
      var date = new Date($scope.selectedDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") )
      var dayOfWeek = date.getDay();
      var times = text.split(',');
      var timeArray = [];
      var resStatus = 'vrij';
      var startHour = 8;
      var hour = startHour;
      var hourEnd = 0
      var price = 0;

      for (var i = 0; i < 15; i++) {
          hourEnd = hour + 1;
          hourEnd = hourEnd < 10 ? "0" + hourEnd : hourEnd
         //  var timeDesc = hour + ':' + "00" + "-" + hourEnd + ":" + "00";
          var timeDesc =  hour < 10 ? "0" + hour + ':' + "00" + "-" + hourEnd + ":" + "00" : hour + ':' + "00" + "-" + hourEnd + ":" + "00";    
          if (times.includes(i.toString())) {
              resStatus = 'bezet'
          } else {
              resStatus = ''
          }
          if (dayOfWeek >= 1 && dayOfWeek <= 5) {
              if (i < 20) {
                  price = 55.00
              } else {
                  price = 55.00
              }
          } else {
              price = 55.00;
          }
          timeArray.push({
              id: i,
              time: timeDesc,
              status: resStatus,
              price: price,
              gekozen: ''
          })

              hour = hour + 1;

      }
      return timeArray;
  }

  function TimePartModelSquash(booked) {
      var text = ''
      for (i = 0; i < booked.length; i++) {
          text += booked[i].timeRange + ',';
      }
      var date = new Date($scope.selectedDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") )
      var dayOfWeek = date.getDay();
      var times = text.split(',');
      var timeArray = [];
      var resStatus = 'vrij';
      var startHour = 8;
      var hour = startHour;
      var hourEnd = 0;
      var startMinutes = '00'
      var minutesEnd = '';
      var minutes = startMinutes;
      var price = 0;
      for (var i = 0; i < 18; i++) {
          if (minutes === '45' || minutes === '30' || minutes === '15') {
              hourEnd = hour + 1;
              if(minutes === '45'){
                  minutesEnd = '30';
              }
              if(minutes === '30'){
                  minutesEnd = '15';
              }
              if(minutes === '15'){
                  minutesEnd = '00';
              }
              hourEnd = hourEnd < 10 ? "0" + hourEnd : hourEnd
              var timeDesc = hour < 10 ? "0" + hour + ':' + minutes + "-" + hourEnd + ":" + minutesEnd : hour + ':' + minutes + "-" + hourEnd + ":" + minutesEnd;
          } else {
              hourEnd = hour < 10 ? "0" + hour : hour
              minutesEnd = '45';
              var timeDesc = hour < 10 ? "0" + hour + ':' + minutes + "-" + hourEnd + ":" + minutesEnd : hour + ':' + minutes + "-" + hourEnd + ":" + minutesEnd;
          }

          if (times.includes(i.toString())) {
              resStatus = 'bezet'
          } else {
              resStatus = ''
          }
          if (dayOfWeek >= 1 && dayOfWeek <= 5) {
              if (i < 20) {
                  price = 16.00
              } else {
                  price = 16.00
              }
          } else {
              price = 16.00;
          }
          timeArray.push({
              id: i,
              time: timeDesc,
              status: resStatus,
              price: price,
              gekozen: ''
          })

          switch ( minutes) {
              case '45':
                  hour = hour + 1;
                  minutes = '30';
                  break;
              case '30':
                  hour = hour + 1;
                  minutes = '15';
                  break;
              case '15':
                  hour = hour + 1;
                  minutes = '00';
                  break;
              default:
                  minutes = '45';
          }
      }
      return timeArray;
  }

  function TimePartModelJump(booked) {
    var text = ''
      for (i = 0; i < booked.length; i++) {
          text += booked[i].timeRange + ',';
      }
      var date = new Date($scope.selectedDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") )
      var dayOfWeek = date.getDay();
      var times = text.split(',');
      var timeArray = [];
      var resStatus = 'vrij';
      var startHour = 8;
      var hour = startHour;
      var hourEnd = 0
      var price = 0;
 
      for (var i = 0; i < 15; i++) {
          hourEnd = hour + 1;
          hourEnd = hourEnd < 10 ? "0" + hourEnd : hourEnd
         //  var timeDesc = hour + ':' + "00" + "-" + hourEnd + ":" + "00";
          var timeDesc =  hour < 10 ? "0" + hour + ':' + "00" + "-" + hourEnd + ":" + "00" : hour + ':' + "00" + "-" + hourEnd + ":" + "00";    
          if (times.includes(i.toString())) {
              resStatus = 'bezet'
          } else {
              resStatus = ''
          }
          if (dayOfWeek >= 1 && dayOfWeek <= 5) {
              if (i < 20) {
                  price = 55.00
              } else {
                  price = 55.00
              }
          } else {
              price = 55.00;
          }
          timeArray.push({
              id: i,
              time: timeDesc,
              status: resStatus,
              price: price,
              gekozen: ''
          })

              hour = hour + 1;

      }
      return timeArray;
  }

    function createTimePartsModels(amountOfFields, data, type) {
      var field1Booked = data.filter(x => x.field === 1);
      var field2Booked = data.filter(x => x.field === 2);
      var field3Booked = data.filter(x => x.field === 3);
      var field4Booked = data.filter(x => x.field === 4);

      if($scope.selectedType === 'Soccer'){
          $scope.selectedTimes1 = [];
      }
      if($scope.selectedType === 'Squash'){
          $scope.selectedTimes2 = [];
          $scope.selectedTimes3 = [];
      }
      if($scope.selectedType === 'Squash'){
          $scope.selectedTimes4 = [];
      }


      if($scope.selectedType === 'Soccer'){
          $scope.timePart1 = TimePartModelSoccer(field1Booked);
          $scope.times = TimePartModelSoccer(field1Booked);
      }
      if($scope.selectedType === 'Squash'){
          $scope.timePart2 = TimePartModelSquash(field2Booked);
          $scope.timePart3 = TimePartModelSquash(field3Booked);
          $scope.times = TimePartModelSquash(field2Booked);
      }
      if($scope.selectedType === 'Jump'){
          $scope.timePart4 = TimePartModelJump(field4Booked);
          $scope.times = TimePartModelJump(field4Booked);
      }

      switch ($scope.amountOfFields) {
          case '1':
              $scope.field1 = true;
              $scope.field2 = false;
              break;
          case '2':
              $scope.field1 = true;
              $scope.field2 = true;
              break;
          default:
              $scope.field1 = true;
              $scope.field2 = false;
      }
  }

    $('.input-group.date').on('changeDate', function (e) {
      if ($scope.selectedLocation != 'Kies een locatie') {
        $scope.timeDisabled = false;
      }
    });

    $scope.dropboxitemselected = function (item) {
      $scope.selectedType = item.name;
    }
    

    if (!Array.prototype.find) {
      Array.prototype.find = function (predicate) {
        if (this == null) {
          throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return value;
          }
        }
        return undefined;
      };
    }

    Array.prototype.indexOf || (Array.prototype.indexOf = function (d, e) {
      var a;
      if (null == this) throw new TypeError('"this" is null or not defined');
      var c = Object(this),
        b = c.length >>> 0;
      if (0 === b) return -1;
      a = +e || 0;
      Infinity === Math.abs(a) && (a = 0);
      if (a >= b) return -1;
      for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) {
        if (a in c && c[a] === d) return a;
        a++
      }
      return -1
    });

    $scope.selectedTimes1 = [];
    $scope.selectedTimes2 = [];
    $scope.selectedTimes3 = [];
    $scope.selectedTimes4 = [];
    $scope.selectTime = function (index, time, field) {
      var dontBook = false;
      if(field === 3){
          if($scope.selectedTimes2.length >0){
              dontBook = true;
          }
      }
      if(field === 2){
          if($scope.selectedTimes3.length >0){
              dontBook = true;
          }
      }

      if(!dontBook){
        $scope.chosenField = field
        $scope.selectedTimes = [];
        switch (field) {
          case 1:
            $scope.selectedTimes = $scope.selectedTimes1;
            break;
          case 2:
            $scope.selectedTimes = $scope.selectedTimes2;
            break;
          case 3:
            $scope.selectedTimes = $scope.selectedTimes3;
            break;
          case 4:
          $scope.selectedTimes = $scope.selectedTimes4;
          break;
        }

        if (!angular.element('#field' + field + '-time' + index).hasClass('inactive')) {
          $scope.selectedTimes.splice($scope.selectedTimes.indexOf(time), 1);
          angular.element('#field' + field + '-time' + index).addClass('inactive');
  
        } else {
          if(field === 4 && $scope.selectedTimes.length > 0){
            return;
          }
          $scope.selectedTimes.splice($scope.selectedTimes.indexOf(time), 0, time);
          angular.element('#field' + field + '-time' + index).removeClass('inactive');
        }
        ($scope.selectedTimes.length > 0 ? $scope.selected = true : $scope.selected = false);
        ($scope.selectedTimes.find(findOccupied) ? $scope.occupied = true : $scope.occupied = false);
        if ($scope.selectedTimes.find(findOccupied) && $scope.selectedTimes.find(findFree)) {
          $scope.invalid = true;
        } else {
          $scope.invalid = false;
        }
      }

    }



    $scope.createReservation = function () {
      var error = false;
      var sequence = 0;
      $scope.results = [];
      var sequential = true;
      var limit = $scope.selectedTimes.length;
      for (var i = 0; i < limit; ++i) {
        $scope.results.push($scope.selectedTimes[i])
        $scope.results = $scope.results.sort(SortById)
        $scope.selectedStartTime = $scope.results[0]
        //$scope.selectedEndTime = $scope.results.length[$scope.results.length -1];
        for (var j = 0; j < $scope.results.length - 1; j++) {

          // both descending and ascending orders count as we are using Math.abs()
          if (Math.abs($scope.results[j].id - $scope.results[j].id + 1) != 1) {
            sequential = false;
          }
        }
          $scope.selectedEndTime = $scope.times[$scope.results[i].id]
      }

      if (sequential) {
        $scope.chosenReservation = {};
        $scope.chosenReservation.reservation = $scope.reservationsToday.find(findTime)
        $scope.chosenReservation.starttime = $scope.selectedTimes.find(findStartTime)
        $scope.chosenReservation.field = $scope.chosenField;

        $('#reservationModal').modal({
          show: 'true'
        });
        $scope.create = true;
      } else {
        error = true;
        errorMessage = "Er zijn ongeldige tijden gekozen, u dient deze te corrigeren";
        $scope.create = false;
      }
      $scope.chosenReservation.title = "Nieuwe reservering"
    }

    function SortById(a, b) {
      return ((a.id < b.id) ? -1 : ((a.id > b.id) ? 1 : 0));
    }
    $scope.setStartTime = function (id) {
      $scope.selectedStartTime = $scope.times[id];
      if (id >= $scope.selectedEndTime.id) {
        $scope.selectedEndTime = $scope.times[id + 1];
      }
    }

    $scope.setEndTime = function (id) {
      $scope.selectedEndTime = $scope.times[id];
      if (id <= $scope.selectedStartTime.id) {
        $scope.selectedEndTime = undefined;
      }
    }
    $scope.saveJumpReservation = function(){
      if ($scope.jumpReservationForm.$valid) {
          $http({
            url: 'http://localhost:51556/api/reservations/create',
          //  url: 'https://reserveren.amesdeurne.nl/api/reservations/jumpReservation',
            method: 'post',
            async: true,
            crossDomain: true,
            headers: {
              "Content-Type": "application/json"
            },
            data: {
              "location": $scope.locationId,
              "email": $scope.chosenReservation.Email,
              "name": $scope.chosenReservation.name,
              "phone": $scope.chosenReservation.phone,
              "date": new Date($scope.selectedDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") ),
              "field": $scope.chosenField.field,
              "timeRange": $scope.chosenReservation.starttime
            }
          }).then(function (response) {
            console.log(response)
            if (response.status === 200) {
              $scope.selectedTimes1 = [];
              $scope.selectedTimes2 = [];
              $scope.selectedTimes3 = [];
              $scope.selectedTimes4 = [];
              $scope.create = false;
              $scope.update = false;
              $scope.removeChecked();
              $scope.updateData();
              $.toaster('Boeking opgeslagen', 'Verwerkt', 'success');
              $('#addJumpModal').modal('hide');
            } else {
              $.toaster('Er is iets fout gegaan bij het maken van de reservatie', 'Fout', 'danger');
              console.log(response);
            }
          }, function errorCallback(response) {
            $.toaster('Er is iets fout gegaan bij het maken van de reservatie', 'Fout', 'danger');
            console.log(response);
          });
      }
    }

    $scope.saveReservation = function () {
      $scope.submitted = true;

      var timeRangeArray = [];
      if ($scope.selectedType === 'Soccer') {
        $scope.locationId = 1;
      }
      if ($scope.selectedType === 'Squash') {
        $scope.locationId = 2;
      }
      if ($scope.selectedType === 'Jump') {
        $scope.locationId = 4;
      }
      var ReservationTimes = (Number($scope.selectedEndTime.id)) - $scope.selectedStartTime.id

        ReservationTimes = ReservationTimes + 1;

      for (var j = 0; j < ReservationTimes; j++) {
        timeRangeArray.push($scope.selectedStartTime.id + j)
      }

      console.log(timeRangeArray)
      if ($scope.reservationForm.$valid) {
        if ($scope.update) {
          $http({
             url: 'http://localhost:51556/api/reservations/update',
         //   url: 'https://reserveren.amesdeurne.nl/api/reservations/update',
            method: 'post',
            async: true,
            crossDomain: true,
            headers: {
              "Content-Type": "application/json"
            },
            data: {
              "id": $scope.chosenReservation.id,
              "locationId": $scope.locationId,
              "username": $scope.chosenReservation.username,
              "firstName": $scope.chosenReservation.firstName,
              "lastName": $scope.chosenReservation.lastName,
              "reservationDate": $scope.selectedDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"),
              "phone": $scope.chosenReservation.phone,
              "field": $scope.chosenField,
              "timeRange": timeRangeArray.join()
              // "timeRange": $scope.selectedStartTime.id + ',' + (Number($scope.selectedEndTime.id) - 1)
            }
          }).then(function (response) {
            if (response.status === 200) {
              $scope.selectedTimes1 = [];
              $scope.selectedTimes2 = [];
              $scope.selectedTimes3 = [];
              $scope.selectedTimes4 = [];
              $scope.create = false;
              $scope.update = false;
              $scope.removeChecked();
              $scope.updateData();
              $.toaster('Reservatie succesvol bijgewerkt', 'Verwerkt', 'success');
              $('#reservationModal').modal('hide');
            } else {
              $.toaster('Er is iets fout gegaan bij het updaten van de reservatie', 'Fout', 'danger');
              console.log("Er is iets fout gegaan: " + response.data);
            }
          }, function errorCallback(response) {
            $.toaster('Er is iets fout gegaan bij het updaten van de reservatie', 'Fout', 'danger');
            console.log("Er is iets fout gegaan: " + response.data);
          });
        }
        if ($scope.create) {
          $http({
             url: 'http://localhost:51556/api/reservations/create',
          //  url: 'https://reserveren.amesdeurne.nl/api/reservations/create',
            method: 'post',
            async: true,
            crossDomain: true,
            headers: {
              "Content-Type": "application/json"
            },
            data: {
              "locationId": $scope.locationId,
              "username": $scope.chosenReservation.username,
              "firstName": $scope.chosenReservation.firstName,
              "lastName": $scope.chosenReservation.lastName,
              "phone": $scope.chosenReservation.phone,
              "reservationDate": new Date($scope.selectedDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") ),
              "field": $scope.chosenField,
              "timeRange": timeRangeArray.join(),
              "payed" : 2
            }
          }).then(function (response) {
            if (response.status === 200) {
              $scope.selectedTimes1 = [];
              $scope.selectedTimes2 = [];
              $scope.selectedTimes3 = [];
              $scope.selectedTimes4 = [];
              $scope.create = false;
              $scope.update = false;
              $scope.removeChecked();
              $scope.updateData();
              $.toaster('Reservatie opgeslagen', 'Verwerkt', 'success');
              $('#reservationModal').modal('hide');
            } else {
              $.toaster('Er is iets fout gegaan bij het maken van de reservatie', 'Fout', 'danger');
              console.log(response);
            }
          }, function errorCallback(response) {
            $.toaster('Er is iets fout gegaan bij het maken van de reservatie', 'Fout', 'danger');
            console.log(response);
          });
        }
      }
    }

    $scope.addJump = function(){

      var error = false;
      var sequence = 0;
      $scope.results = [];
      var sequential = true;
      var limit = $scope.selectedTimes.length;
      for (var i = 0; i < limit; ++i) {
        $scope.results.push($scope.selectedTimes[i])
        $scope.results = $scope.results.sort(SortById)
        $scope.selectedStartTime = $scope.results[0]
        $scope.selectedEndTime = $scope.results.length[$scope.results.length -1];
        for (var j = 0; j < $scope.results.length - 1; j++) {

          // both descending and ascending orders count as we are using Math.abs()
          if (Math.abs($scope.results[j].id - $scope.results[j].id + 1) != 1) {
            sequential = false;
          }
        }
          $scope.selectedEndTime = $scope.times[$scope.results[i].id]
      }

      if (sequential) {
        $scope.chosenReservation = {};
        $scope.chosenReservation.reservation = $scope.reservationsToday.find(findTime)
        $scope.chosenReservation.starttime = $scope.selectedTimes[0].id;
        $scope.chosenReservation.field = $scope.chosenField;
        $('#addJumpModal').modal({
          show: 'true'
        });
        $scope.create = true;
      } else {
        error = true;
        errorMessage = "Er zijn ongeldige tijden gekozen, u dient deze te corrigeren";
        $scope.create = false;
      }
      $scope.chosenReservation.title = "Nieuwe jump boeking"
    }

    $scope.jumpReservation = function(){
      var error = false;
      var sequence = 0;
      $scope.results = [];
      var sequential = true;
      var limit = $scope.selectedTimes.length;
      for (var i = 0; i < limit; ++i) {
        $scope.results.push($scope.selectedTimes[i])
        $scope.results = $scope.results.sort(SortById)
        $scope.selectedStartTime = $scope.results[0]
        $scope.selectedEndTime = $scope.results.length[$scope.results.length -1];
        for (var j = 0; j < $scope.results.length - 1; j++) {

          // both descending and ascending orders count as we are using Math.abs()
          if (Math.abs($scope.results[j].id - $scope.results[j].id + 1) != 1) {
            sequential = false;
          }
        }
          $scope.selectedEndTime = $scope.times[$scope.results[i].id]
      }

      if (sequential) {
        $scope.chosenReservation = {};
        $scope.chosenReservation.reservation = $scope.reservationsToday.find(findTime)
        $scope.chosenReservation.starttime = $scope.selectedTimes[0].id;
        $scope.chosenReservation.field = $scope.chosenField;

        $http({
             url: 'http://localhost:51556/api/reservations/byDateLocation',
           //  url: 'https://reserveren.amesdeurne.nl/api/reservations/JumpByDateLocation',
             method: 'get',
             async: true,
             crossDomain: true,
             params: {
               time: $scope.chosenReservation.starttime,
               date: $scope.selectedDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") 
             }
           }).then(function (response) {
             if (response) {
              $scope.jumpReservations = response.data;
              $scope.chosenReservation.title = "Jump reserveringen (" + $scope.jumpReservations.length + ")"; 
              $('#jumpModal').modal({
                show: 'true'
              });
   
             } else {
               console.log('error', response)
             }
           }, function errorCallback(response) {
          $scope.errorMessage = "Er is iets fout gegaan: " + response;
        });
      } else {
        error = true;
        errorMessage = "Er zijn ongeldige tijden gekozen, u dient deze te corrigeren";

      }

    }

    $scope.removeJumpReservation = function(index){
      console.log($scope.jumpReservations[index])
      $http({
             url: 'http://localhost:51556/api/reservations/byDateLocation',
        //   url: 'https://reserveren.amesdeurne.nl/api/reservations/deleteJumpReservation',
           method: 'delete',
           async: true,
           crossDomain: true,
           params: {
             id: $scope.jumpReservations[index].id,
           }
         }).then(function (response) {
           if (response) {
            $scope.jumpReservations.splice(index, 1);

 
           } else {
             console.log('error', response)
           }
         }, function errorCallback(response) {
        $scope.errorMessage = "Er is iets fout gegaan: " + response;
      });
    }

    $scope.closeJump = function (){
      $scope.removeChecked();
      $scope.selectedTimes1 = [];
      $scope.selectedTimes2 = [];
      $scope.selectedTimes3 = [];
      $scope.selectedTimes4 = [];
      $scope.selectedTimes = [];
      $scope.selected = false;
      $('#jumpModal').modal('hide');
    }

    $scope.abortReservation = function () {
      $scope.removeChecked();
      $scope.selectedTimes1 = [];
      $scope.selectedTimes2 = [];
      $scope.selectedTimes3 = [];
      $scope.selectedTimes4 = [];
      $scope.selectedTimes = [];
      $scope.selected = false;
      $('#reservationModal').modal('hide');
    }

    $scope.abortDelete = function () {
      $scope.removeChecked();
      $scope.selectedTimes1 = [];
      $scope.selectedTimes2 = [];
      $scope.selectedTimes3 = [];
      $scope.selectedTimes4 = [];
      $scope.selectedTimes = [];
      $scope.selected = false;
      $('#deleteModal').modal('hide');
    }

    $scope.removeChecked = function () {
      if ($scope.selectedTimes != undefined) {
        for (var j = 0; j < $scope.selectedTimes.length; j++) {
          angular.element('#field' + $scope.chosenField + '-time' + $scope.selectedTimes[j].id).addClass('inactive');
        }
      }
      $scope.selected = false;
    }

    $scope.changeReservation = function () {
      $scope.update = true;
      var error = false;
      var sequence = 0;
      $scope.results = [];
      var sequential = true;
      var limit = $scope.selectedTimes.length;
      for (var i = 0; i < limit; ++i) {
        console.log($scope.selectedStartTime, $scope.selectedTimes)
        $scope.results.push($scope.selectedTimes[i])
        $scope.results = $scope.results.sort(SortById)
        $scope.selectedStartTime = $scope.results[0]
        for (var j = 0; j < $scope.results.length - 1; j++) {
          // both descending and ascending orders count as we are using Math.abs()
          if (Math.abs($scope.results[j].id - $scope.results[j].id + 1) != 1) {
            sequential = false;
          }
        }
        $scope.selectedEndTime = $scope.times[$scope.results[i].id + 1]
      }
      if (sequential) {
        $scope.chosenReservation = {};
        for (var k = 0; k < $scope.selectedTimes.length; k++) {
          for (var j = 0; j < $scope.reservationsToday.length; j++) {
            if (_.contains($scope.reservationsToday[j].timeRange.split(','), $scope.selectedTimes[k].id.toString())) {
              $scope.chosenReservation = $scope.reservationsToday[j];
            }
          }
          $scope.selectedStartTime = $scope.timePart1[_.first($scope.chosenReservation.timeRange.split(','))]
          $scope.selectedEndTime = $scope.timePart1[Number(_.last($scope.chosenReservation.timeRange.split(',')))]


          $scope.chosenReservation.field = $scope.chosenField;
        }

        $('#reservationModal').modal({
          show: 'true'
        });
        $scope.update = true;
      } else {
        error = true;
        errorMessage = "Er zijn ongeldige tijden gekozen, u dient deze te corrigeren";
        $scope.update = false;
      }

      $scope.chosenReservation.title = "Wijzig reservering"
    }

    $scope.clearChecks = function () {
      $scope.removeChecked();
      $scope.selectedTimes1 = [];
      $scope.selectedTimes2 = [];
      $scope.selectedTimes3 = [];
      $scope.selectedTimes4 = [];
      $scope.selectedTimes = [];
      $scope.selected = false;
    }

    $scope.deleteReservation = function () {
      $scope.chosenReservation = {};
      $scope.reservationsToDelete = [];
      for (var k = 0; k < $scope.selectedTimes.length; k++) {
        for (var j = 0; j < $scope.reservationsToday.length; j++) {
          if (_.contains($scope.reservationsToday[j].timeRange.split(','), $scope.selectedTimes[k].id.toString())) {
            $scope.chosenReservation = $scope.reservationsToday[j];
            if (!($scope.chosenReservation.id in $scope.reservationsToDelete)) {
              $scope.reservationsToDelete.push($scope.chosenReservation.id);
            }
          }
        }
      }

      $('#deleteModal').modal({
        show: 'true'
      });
      $scope.chosenReservation.title = "Reservatie's verwijderen"
    }

    $scope.confirmDelete = function () {
      for (var k = 0; k < $scope.reservationsToDelete.length; k++) {
        $http({
          url: 'http://localhost:51556/api/reservations/delete',
         // url: 'https://reserveren.amesdeurne.nl/api/reservations/delete',
          method: 'delete',
          async: true,
          crossDomain: true,
          params: {
            reservationId: $scope.reservationsToDelete[k],
            locationId: $scope.locationId,
          },
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + $localStorage.currentUser.token
          },
        }).then(function (response) {
          if (response) {
              $scope.selectedTimes1 = [];
              $scope.selectedTimes2 = [];
              $scope.selectedTimes3 = [];
              $scope.selectedTimes4 = [];
              $scope.create = false;
              $scope.update = false;
              $scope.removeChecked();
              $scope.updateData();
              $.toaster('Reservaties verwijderd', 'Verwerkt', 'success');
              $('#deleteModal').modal('hide');
          } else {
          //  $.toaster('Er is iets fout gegaan bij het verwijderen van de reservatie', 'Fout', 'danger');
            $scope.removeChecked();
            $scope.updateData();
            $('#deleteModal').modal('hide');
          }
        }, function errorCallback(response) {
         // $.toaster('Er is iets fout gegaan bij het verwijderen van de reservatie', 'Fout', 'danger');
          $scope.removeChecked();
          $scope.updateData();
          $('#deleteModal').modal('hide');
        });
      }
    }

    function findOccupied(time) {
      return time.status === 'bezet';
    }

    function findFree(time) {
      return time.status === 'vrij';
    }

    function findStartTime(time) {
      return time.id === $scope.results[0]
    }

    function findLocation(location) {
      return location.city === $scope.selectedLocation;
    }

    function findTime(reservation) {

    }

    function dateString2Date(dateString) {
      var dt = dateString.split(/\-|\s/);
      return new Date(dt.slice(0, 3).reverse().join('-'));
    }

    function activate() {
      if ($localStorage.currentUser) {
        $scope.loginHide = true;
      } else {
        $scope.loginHide = false;
      }
      $scope.selectedType = 'Soccer'
  //     $http({
  //  //     url: 'https://reserveren.amesdeurne.nl/api/reservations/locations',
  //       url: 'https://reserveren.amesdeurne.nl/api/reservations/locations',
  //       method: 'get',
  //       async: true,
  //       crossDomain: true
  //     }).then(function (response) {
  //       if (response) {
  //         $scope.locations = response.data;
  //        // $scope.selectedLocation = $scope.locations[0].city;
 
  //       } else {
  //         //error
  //       }
  //     });
    }
  }]);
