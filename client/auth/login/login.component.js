angular.module("collegepool").controller("LoginCtrl", ['$meteor', '$state', '$rootScope',
    function ($meteor, $state, $rootScope) {
        var vm = this;
        
        
        
        vm.credentials = {
            email: '',
            password: ''
        };
               
        vm.error = '';

        vm.login = function () {
            $meteor.loginWithPassword(vm.credentials.username, vm.credentials.password).then(
                function () {
                   $state.go('picks');
                   $rootScope.username = vm.credentials.username;
                },
                function (err) {
                    vm.error = 'Login error - ' + err;
                }
                );
        };
    }
]);