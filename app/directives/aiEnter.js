/* Directive to bind an event listener for the "enter" key to call the
    form validation function */
signupApp.directive('aiEnter', function() {
    return function(scope, element, attrs) {
        element.on("keydown keypress", function(event) {
            if (event.which === 13) {
                event.preventDefault();

                scope.$apply(function () {
                    scope.$eval(attrs.aiEnter, {'event': event});
                });
            }
        });
    }
});