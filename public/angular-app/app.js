angular.module('meanhotel', ['ngRoute', 'angular-jwt', 'ui.router',['$qProvider', function ($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]]).config(config).run(run);

function config($httpProvider, $routeProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');

  $routeProvider
      .when('/', {
      templateUrl: 'angular-app/main/main.html',
      access: {
        restricted: false
      }
    })
    .when('/dashboard', {
      templateUrl: 'angular-app/hotel-list/dashboards.html',
      controller: HotelsController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/hotel/:id', {
      templateUrl: 'angular-app/hotel-display/dashboard.html',
      controller: HotelController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/register', {
      templateUrl: 'angular-app/register/register.html',
      controller: RegisterController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/profile', {
      templateUrl: 'angular-app/profile/profile.html',
      access: {
        restricted: true
      }
    })
      .when('/getdata', {
        templateUrl: 'angular-app/getdata/getdata.html',
        controller: getDataController,
        access: {
          restricted: false
        }
      })
    .otherwise({
      redirectTo: '/'
    });
}

function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      event.preventDefault();
      $location.path('/');
    }
  });
}
