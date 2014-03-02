'use strict';

angular.module('home', [<% if (ngRoute) { %>'ngRoute'<% } %>])<% if (ngRoute) { %>
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'IndexCtrl',
        templateUrl: '/app/home/index.tpl.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })<% } %>
  .controller('IndexCtrl', function ($scope) {
    $scope.awesomeThings = [
      {
        name: 'HTML5 Boilerplate',
        desc: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.'
      },
      {
        name: 'AngularJS',
        desc: 'AngularJS is a toolset for building the framework most suited to your application development.'
      },
      {
        name: 'Karma',
        desc: 'Spectacular Test Runner for JavaScript.'
      }
    ];
  })
;