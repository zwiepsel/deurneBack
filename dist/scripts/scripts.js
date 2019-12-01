'use strict';

var states = [
        { name: 'base', state: { abstract: true, url: '', templateUrl: 'views/base.html', data: {text: "Base", visible: false } } },
        { name: 'login', state: { url: '/login', parent: 'base', templateUrl: 'views/login.html', controller: 'LoginCtrl', data: {text: "Login", visible: false } } },
        { name: 'dashboard', state: { url: '/dashboard', parent: 'base', templateUrl: 'views/dashboard.html', controller: 'DashboardCtrl', data: {text: "Dashboard", visible: false } } },
        { name: 'overview', state: { url: '/overview', parent: 'dashboard', templateUrl: 'views/dashboard/overview.html', data: {text: "Overzicht", visible: true } } },
        { name: 'reservations', state: { url: '/reservations', parent: 'dashboard', templateUrl: 'views/dashboard/reservations.html', controller: 'ReservationCtrl', data: {text: "Reserveringen", visible: true } } },
        { name: 'discounts', state: { url: '/discounts', parent: 'dashboard', templateUrl: 'views/dashboard/discounts.html',controller: 'DiscountCtrl', data: {text: "Kortingen", visible: true } } },
        { name: 'users', state: { url: '/users', parent: 'dashboard', templateUrl: 'views/dashboard/users.html', controller:'UsersCtrl', data: {text: "Klanten", visible: true } } }
        // { name: 'logout', state: { url: '/login',controller: 'LoginCtrl', data: {text: "Uitloggen", visible: true }} }
    ];
   
angular.module('yapp', ['ui.router','snap','ngAnimate','ngResource','ngStorage','bw.paging'])
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,$urlRouterProvider)  {
            $urlRouterProvider.when('/dashboard', '/dashboard/overview');
            $urlRouterProvider.otherwise('/login');
            
            angular.forEach(states, function (state) {
                $stateProvider.state(state.name, state.state);
            });
        }]);

;(function(){function g(a,c){a.setHours(a.getHours()+parseFloat(c));return a}function h(a,c){var b="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");return c?b[a.getDay()].substr(0,3):b[a.getDay()]}function k(a,c){var b="January February March April May June July August September October November December".split(" ");return c?b[a.getMonth()].substr(0,3):b[a.getMonth()]}function e(a,c){if(a){if("compound"==a){if(!1===c)return this.format.compound;var b={},d;for(d in Date.prototype.format.compound)b[d]=
this.format(Date.prototype.format.compound[d]);return b}if(Date.prototype.format.compound[a])return this.format(Date.prototype.format.compound[a],c);if("constants"==a){if(!1===c)return this.format.constants;b={};for(d in Date.prototype.format.constants)b[d]=this.format(Date.prototype.format.constants[d]);return b}if(Date.prototype.format.constants[a])return this.format(Date.prototype.format.constants[a],c);if("pretty"==a){if(!1===c)return this.format.pretty;b={};for(d in Date.prototype.format.pretty)b[d]=
this.format(Date.prototype.format.pretty[d]);return b}if(Date.prototype.format.pretty[a])return this.format(Date.prototype.format.pretty[a],c);var b=a.split(""),e="";for(d in b){var f=b[d];f&&/[a-z]/i.test(f)&&!/\\/.test(e+f)&&(b[d]=l[f]?l[f].apply(this):f);e=b[d]}return b.join("").replace(/\\/g,"")}return a}var l={d:function(){var a=this.getDate();return 9<a?a:"0"+a},D:function(){return h(this,!0)},j:function(){return this.getDate()},l:function(){return h(this)},N:function(){return this.getDay()+
1},S:function(){var a=this.getDate();return/^1[0-9]$/.test(a)?"th":/1$/.test(a)?"st":/2$/.test(a)?"nd":/3$/.test(a)?"rd":"th"},w:function(){return this.getDay()},z:function(){return Math.round(Math.abs((this.getTime()-(new Date("1/1/"+this.getFullYear())).getTime())/864E5))},W:function(){var a=new Date(this.getFullYear(),0,1);return Math.ceil(((this-a)/864E5+a.getDay()+1)/7)},F:function(){return k(this)},m:function(){var a=this.getMonth()+1;return 9<a?a:"0"+a},M:function(){return k(this,!0)},n:function(){return this.getMonth()+
1},t:function(){return(new Date(this.getFullYear(),this.getMonth()+1,0)).getDate()},L:function(){var a=this.getFullYear();return 0==a%4&&0!=a%100||0==a%400},o:function(){return parseInt(this.getFullYear())},Y:function(){return parseInt(this.getFullYear())},y:function(){return parseInt((this.getFullYear()+"").substr(-2))},a:function(){return 12<=this.getHours()?"pm":"am"},A:function(){return 12<=this.getHours()?"PM":"AM"},B:function(){return"@"+("00"+Math.floor((60*((this.getHours()+1)%24*60+this.getMinutes())+
this.getSeconds()+.001*this.getMilliseconds())/86.4)).slice(-3)},g:function(){var a=this.getHours();return 0==a?12:12>=a?a:a-12},G:function(){return this.getHours()},h:function(){var a=this.getHours(),a=12>=a?a:a-12;return 0==a?12:9<a?a:"0"+a},H:function(){var a=this.getHours();return 9<a?a:"0"+a},i:function(){var a=this.getMinutes();return 9<a?a:"0"+a},s:function(){var a=this.getSeconds();return 9<a?a:"0"+a},u:function(){return this.getMilliseconds()},e:function(){var a=this.toString().match(/ ([A-Z]{3,4})([-|+]?\d{4})/);
return 1<a.length?a[1]:""},I:function(){var a=new Date(this.getFullYear(),0,1),c=new Date(this.getFullYear(),6,1),a=Math.max(a.getTimezoneOffset(),c.getTimezoneOffset());return this.getTimezoneOffset()<a?1:0},O:function(){var a=this.toString().match(/ ([A-Z]{3,4})([-|+]?\d{4})/);return 2<a.length?a[2]:""},P:function(){var a=this.toString().match(/ ([A-Z]{3,4})([-|+]?\d{4})/);return 2<a.length?a[2].substr(0,3)+":"+a[2].substr(3,2):""},T:function(){return this.toLocaleString("en",{timeZoneName:"short"}).split(" ").pop()},
Z:function(){return 60*this.getTimezoneOffset()},c:function(){return g(new Date(this),-(this.getTimezoneOffset()/60)).toISOString()},r:function(){return g(new Date(this),-(this.getTimezoneOffset()/60)).toISOString()},U:function(){return this.getTime()/1E3|0}},m={commonLogFormat:"d/M/Y:G:i:s",exif:"Y:m:d G:i:s",isoYearWeek:"Y\\WW",isoYearWeek2:"Y-\\WW",isoYearWeekDay:"Y\\WWj",isoYearWeekDay2:"Y-\\WW-j",mySQL:"Y-m-d h:i:s",postgreSQL:"Y.z",postgreSQL2:"Yz",soap:"Y-m-d\\TH:i:s.u",soap2:"Y-m-d\\TH:i:s.uP",
unixTimestamp:"@U",xmlrpc:"Ymd\\TG:i:s",xmlrpcCompact:"Ymd\\tGis",wddx:"Y-n-j\\TG:i:s"},n={AMERICAN:"F j, Y",AMERICANSHORT:"m/d/Y",AMERICANSHORTWTIME:"m/d/Y h:i:sA",ATOM:"Y-m-d\\TH:i:sP",COOKIE:"l, d-M-Y H:i:s T",EUROPEAN:"j F Y",EUROPEANSHORT:"d.m.Y",EUROPEANSHORTWTIME:"d.m.Y H:i:s",ISO8601:"Y-m-d\\TH:i:sO",LEGAL:"j F Y",RFC822:"D, d M y H:i:s O",RFC850:"l, d-M-y H:i:s T",RFC1036:"D, d M y H:i:s O",RFC1123:"D, d M Y H:i:s O",RFC2822:"D, d M Y H:i:s O",RFC3339:"Y-m-d\\TH:i:sP",RSS:"D, d M Y H:i:s O",
W3C:"Y-m-d\\TH:i:sP"},p={"pretty-a":"g:i.sA l jS \\o\\f F, Y","pretty-b":"g:iA l jS \\o\\f F, Y","pretty-c":"n/d/Y g:iA","pretty-d":"n/d/Y","pretty-e":"F jS - g:ia","pretty-f":"g:iA","pretty-g":"F jS, Y","pretty-h":"F jS, Y g:mA"};Object.defineProperty?Object.defineProperty(e,"compound",{value:m}):e.compound=m;Object.defineProperty?Object.defineProperty(e,"constants",{value:n}):e.constants=n;Object.defineProperty?Object.defineProperty(e,"pretty",{value:p}):e.pretty=p;Object.defineProperty&&!Date.prototype.hasOwnProperty("format")?
Object.defineProperty(Date.prototype,"format",{value:e}):Date.prototype.format=e})();
/***********************************************************************************
* Add Array.indexOf                                                                *
***********************************************************************************/
(function ()
{
	if (typeof Array.prototype.indexOf !== 'function')
	{
		Array.prototype.indexOf = function(searchElement, fromIndex)
		{
			for (var i = (fromIndex || 0), j = this.length; i < j; i += 1)
			{
				if ((searchElement === undefined) || (searchElement === null))
				{
					if (this[i] === searchElement)
					{
						return i;
					}
				}
				else if (this[i] === searchElement)
				{
					return i;
				}
			}
			return -1;
		};
	}
})();
/**********************************************************************************/

(function ($,undefined)
{
	var toasting =
	{
		gettoaster : function ()
		{
			var toaster = $('#' + settings.toaster.id);

			if(toaster.length < 1)
			{
				toaster = $(settings.toaster.template).attr('id', settings.toaster.id).css(settings.toaster.css).addClass(settings.toaster['class']);

				if ((settings.stylesheet) && (!$("link[href=" + settings.stylesheet + "]").length))
				{
					$('head').appendTo('<link rel="stylesheet" href="' + settings.stylesheet + '">');
				}

				$(settings.toaster.container).append(toaster);
			}

			return toaster;
		},

		notify : function (title, message, priority)
		{
			var $toaster  = this.gettoaster();
			var delimiter = (title && message) ? settings.toast.defaults.delimiter : '';
			var $toast    = $(settings.toast.template.replace('%priority%', priority).replace('%delimiter%', delimiter)).hide().css(settings.toast.css).addClass(settings.toast['class']);

			$('.title', $toast).css(settings.toast.csst).html(title);
			$('.message', $toast).css(settings.toast.cssm).html(message);

			if ((settings.debug) && (window.console))
			{
				console.log(toast);
			}

			$toaster.append(settings.toast.display($toast));

			if (settings.donotdismiss.indexOf(priority) === -1)
			{
				var timeout = (typeof settings.timeout === 'number') ? settings.timeout : ((typeof settings.timeout === 'object') && (priority in settings.timeout)) ? settings.timeout[priority] : 2500;
				setTimeout(function()
				{
					settings.toast.remove($toast, function()
					{
						$toast.remove();
					});
				}, timeout);
			}
		}
	};

	var defaults =
	{
		'toaster'         :
		{
			'id'        : 'toaster',
			'container' : 'body',
			'template'  : '<div></div>',
			'class'     : 'toaster',
			'css'       :
			{
				'position' : 'fixed',
				'top'      : '10px',
				'right'    : '10px',
				'width'    : '300px',
				'zIndex'   : 50000
			}
		},

		'toast'       :
		{
			'template' :
			'<div class="alert alert-%priority% alert-dismissible" role="alert">' +
				'<button type="button" class="close" data-dismiss="alert">' +
					'<span aria-hidden="true">&times;</span>' +
					'<span class="sr-only">Close</span>' +
				'</button>' +
				'<span class="title"></span>%delimiter% <span class="message"></span>' +
			'</div>',

			'defaults' :
			{
				'title'     : 'Notice',
				'priority'  : 'success',
				'delimiter' : ':'
			},

			'css'      : {},
			'cssm'     : {},
			'csst'     : { 'fontWeight' : 'bold' },

			'fade'     : 'slow',

			'display'    : function ($toast)
			{
				return $toast.fadeIn(settings.toast.fade);
			},

			'remove'     : function ($toast, callback)
			{
				return $toast.animate(
					{
						opacity : '0',
						padding : '0px',
						margin  : '0px',
						height  : '0px'
					},
					{
						duration : settings.toast.fade,
						complete : callback
					}
				);
			}
		},

		'debug'        : false,
		'timeout'      : 2500,
		'stylesheet'   : null,
		'donotdismiss' : []
	};

	var settings = {};
	$.extend(settings, defaults);

	$.toaster = function (options)
	{
		if (typeof options === 'object')
		{
			if ('settings' in options)
			{
				settings = $.extend(true, settings, options.settings);
			}
		}
		else
		{
			var values = Array.prototype.slice.call(arguments, 0);
			var labels = ['message', 'title', 'priority'];
			options = {};

			for (var i = 0, l = values.length; i < l; i += 1)
			{
				options[labels[i]] = values[i];
			}
		}

		var title    = (('title' in options) && (typeof options.title === 'string')) ? options.title : settings.toast.defaults.title;
		var message  = ('message' in options) ? options.message : null;
		var priority = (('priority' in options) && (typeof options.priority === 'string')) ? options.priority : settings.toast.defaults.priority;

		if (message !== null)
		{
			toasting.notify(title, message, priority);
		}
	};

	$.toaster.reset = function ()
	{
		settings = {};
		$.extend(settings, defaults);
	};
})(jQuery);
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
              //  url:   'https://reserveren.amesdeurne.nl/oauth/token',
                url: 'https://reserveren.amesdeurne.nl/oauth/token',
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
       //   url: 'https://reserveren.amesdeurne.nl/api/reservations/byDateLocation',
          url: 'https://reserveren.amesdeurne.nl/api/reservations/byDateLocation',
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
         //   url: 'https://reserveren.amesdeurne.nl/api/reservations/create',
            url: 'https://reserveren.amesdeurne.nl/api/reservations/jumpReservation',
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
            if (response.statusText === "OK") {
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
         //   url: 'https://reserveren.amesdeurne.nl/api/reservations/update',
            url: 'https://reserveren.amesdeurne.nl/api/reservations/update',
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
              "reservationDate": new Date($scope.selectedDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") ),
              "phone": $scope.chosenReservation.phone,
              "field": $scope.chosenField,
              "timeRange": timeRangeArray.join()
              // "timeRange": $scope.selectedStartTime.id + ',' + (Number($scope.selectedEndTime.id) - 1)
            }
          }).then(function (response) {
            if (response.statusText === "OK") {
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
         //   url: 'https://reserveren.amesdeurne.nl/api/reservations/create',
            url: 'https://reserveren.amesdeurne.nl/api/reservations/create',
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
            if (response.statusText === "OK") {
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
          //   url: 'https://reserveren.amesdeurne.nl/api/reservations/byDateLocation',
             url: 'https://reserveren.amesdeurne.nl/api/reservations/JumpByDateLocation',
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
        //   url: 'https://reserveren.amesdeurne.nl/api/reservations/byDateLocation',
           url: 'https://reserveren.amesdeurne.nl/api/reservations/deleteJumpReservation',
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
         // url: 'https://reserveren.amesdeurne.nl/api/reservations/delete',
          url: 'https://reserveren.amesdeurne.nl/api/reservations/delete',
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
            if (response.statusText === "OK") {
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
              $.toaster('Er is iets fout gegaan bij het verwijderen van de reservatie', 'Fout', 'danger');

            }
          } else {
            $.toaster('Er is iets fout gegaan bij het verwijderen van de reservatie', 'Fout', 'danger');
            $scope.removeChecked();
            $scope.updateData();
            $('#deleteModal').modal('hide');
          }
        }, function errorCallback(response) {
          $.toaster('Er is iets fout gegaan bij het verwijderen van de reservatie', 'Fout', 'danger');
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
          // url: 'https://reserveren.amesdeurne.nl/api/accounts/deleteUserByName',
          url: 'https://reserveren.amesdeurne.nl/api/accounts/deleteUserByName',
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
         // url: 'https://reserveren.amesdeurne.nl/api/accounts/updateUser',
          url: 'https://reserveren.amesdeurne.nl/api/accounts/updateUser',
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
          // url: 'https://reserveren.amesdeurne.nl/api/accounts/users',
          url: 'https://reserveren.amesdeurne.nl/api/accounts/users',
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
        //  url: 'https://reserveren.amesdeurne.nl/api/discounts/find',
          url: 'https://reserveren.amesdeurne.nl/api/discounts/find',
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
        //  url: 'https://reserveren.amesdeurne.nl/api/discounts/create',
          url: 'https://reserveren.amesdeurne.nl/api/discounts/create',
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
