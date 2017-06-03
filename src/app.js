(function() {
    'use strict';

    const PROJECT_NAME = 'myApp';

    angular
        .module(PROJECT_NAME, [
            'ui.router',
            'ngCookies',
            'ngMaterial',
            'ngMessages',
            'ui.utils.masks',
            'ui.mask',
            'idf.br-filters',
            'ng-currency',
            'md.data.table',
            'angular-loading-bar',
            'flow'
        ])
        .config(config)
        .run(run);

    angular
        .module(PROJECT_NAME)
        .factory('httpRequestInterceptor', function() {
            return {
                request: function(config) {
                    return config;
                }
            };
        });

    angular.module(PROJECT_NAME).constant('config', {
        // RESTful - ColdFusion
        // Registrar REST: http://localhost:8500/px-boleto-redirect/backend/cf/restInit.cfm
        'REST_URL': window.location.origin + '/rest/px-boleto-redirect',
    });

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$mdDateLocaleProvider',
        'cfpLoadingBarProvider', '$httpProvider', 'flowFactoryProvider'
    ];

    function config($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdDateLocaleProvider,
        cfpLoadingBarProvider, $httpProvider, flowFactoryProvider) {

        $httpProvider.interceptors.push('httpRequestInterceptor');

        cfpLoadingBarProvider.includeSpinner = false;

        $urlRouterProvider.otherwise(function($injector) {
            var $state = $injector.get('$state');
            $state.go('redirect');
        });

        moment.locale('pt-BR');

        // https://material.angularjs.org/latest/api/service/$mdDateLocaleProvider
        $mdDateLocaleProvider.months = ['janeiro',
            'fevereiro',
            'março',
            'abril',
            'maio',
            'junho',
            'julho',
            'agosto',
            'setembro',
            'outubro',
            'novembro',
            'dezembro'
        ];
        $mdDateLocaleProvider.shortMonths = ['jan.',
            'fev',
            'mar',
            'abr',
            'maio',
            'jun',
            'jul',
            'ago',
            'set',
            'out',
            'nov',
            'dez'
        ];
        $mdDateLocaleProvider.parseDate = function(dateString) {
            var m = moment(dateString, 'L', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };
        $mdDateLocaleProvider.formatDate = function(date) {
            if (moment(date).format('L') === 'Invalid date') {
                return '';
            } else {
                return moment(date).format('L');
            }
        };

        flowFactoryProvider.defaults = {
            testChunks: false,
            permanentErrors: [404, 500, 501],
            maxChunkRetries: 1,
            chunkRetryInterval: 5000,
            simultaneousUploads: 4,
        };
    }

    run.$inject = ['$rootScope', '$state', '$cookies', '$http'];

    function run($rootScope, $state, $cookies, $http) {
        //$state.go('example');
    }
})();