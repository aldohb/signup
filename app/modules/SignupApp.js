var signupApp = angular.module('signupApp', ['ngRoute', 'signupControllers', 'ui.bootstrap']);

// We only have 2 views, the signup view (for user data entry)
// and the post-registration view (for displaying data and accepting bio)
// If the user visits another path she will be redirected to the signup page
signupApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                controller: 'SignupCtrl',
                templateUrl: 'views/signup.html'
            }).
            when('/postreg/', {
                controller: 'PostRegCtrl',
                templateUrl: 'views/postReg.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
]);