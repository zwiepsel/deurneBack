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
