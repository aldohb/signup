var signupControllers = angular.module('signupControllers', []);


// Controller for the registration view
signupControllers.controller('SignupCtrl', ['$scope', '$rootScope', '$window', '$location', 'ErrorConstants',
    function ($scope, $rootScope, $window, $location, errorConstants) {
        $scope.minDate = moment().add(-150, 'years');
        $scope.maxDate = moment().add(-14, 'years');

        $scope.dateOptions = {
            formatYear: 'yyyy',
            formatDay: 'dd',
            formatMonth: 'MM',
            startingDay: 1,
            datepickerMode: 'month'
        };

        $scope.account = {};

        $scope.errors = errorConstants;

        $scope.validateForm = function () {
            // I am using this value to prevent validation errors being
            // displayed as soon as the user starts interacting with
            // the form. We want validation only after the user has
            // submitted.
            $scope.registrationForm.submitted = true;

            // If no errors, then we can proceed to the post-registration
            // display of user data
            if ($scope.registrationForm.$valid) {
                $rootScope.account = $scope.account;
                $location.path('/postreg');
            }
        };

        // Ad-hoc validation for comparing the password and password confirmation
        // sets the fields as invalid if they are not the same to force validation
        // errors in the form
        $scope.validateSamePasswords = function() {
            if ($scope.account.password !== $scope.account.passwordConfirm) {
                $scope.registrationForm.password.$setValidity('diffpassword', false);
                $scope.registrationForm.passwordConfirm.$setValidity('diffpassword', false);
            } else {
                $scope.registrationForm.password.$setValidity('diffpassword', true);
                $scope.registrationForm.passwordConfirm.$setValidity('diffpassword', true);
            }
        };

        // Prompt the user to clear data and, if so desired, proceed to
        // get a clean account object and reset form errors
        $scope.clearForm = function () {
            if ($window.confirm("Do you really want to clear all form data?")) {
                $scope.account = getCleanAccount();
                $scope.registrationForm.$setPristine();
                $scope.registrationForm.submitted = false;
            }
        };

        $scope.openCalendar = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };

        // Check if the users' DOB falls in the allowed range
        function isValidDOB() {
            return $scope.account.dateOfBirth.isBetween($scope.minDate, $scope.maxDate);
        }

        function getCleanAccount() {
            // I like returning my "default" json objects from a function
            // so that they won't be changed by assignment
            return {
                username: "",
                password: "",
                passwordConfirm: "",
                firstName: "",
                lastName: ""
            };
        }
    }
]);


// Controller for the post-registration view
signupControllers.controller('PostRegCtrl', ['$scope', '$rootScope', '$location', '$window',
    function($scope, $rootScope, $location, $window) {
        // If there is no valid user account data, we redirect the user
        // to the registration page
        if (!angular.isDefined($rootScope.account)) {
            $location.path('/');
        }

        // Otherwise we can grab the account from the rootScope and
        // display the data here
        $scope.account = $rootScope.account;

        $scope.saveBio = function () {
            // We don't need no validations, just set submitted to true
            $scope.postRegForm.submitted = true;
        }

        $scope.clearForm = function () {
            if ($window.confirm("Do you really want to clear your bio and interests?")) {
                $scope.account.bio = "";
                $scope.account.interests = "";
                $scope.postRegForm.$setPristine();
                $scope.postRegForm.submitted = false;
            }
        };
    }
]);