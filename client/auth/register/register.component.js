angular.module("collegepool").controller("RegisterCtrl", ['$meteor', '$state', '$rootScope',
  function ($meteor, $state, $rootScope) {
    var vm = this;
 
    vm.credentials = {
      username: '',
      email: '',
      password: ''
    };
 
    vm.error = '';
 
    vm.register = function () {
      $meteor.createUser(vm.credentials).then(
        function () {
          $state.go('picks');
          $rootScope.username = vm.credentials.username;
          
        },
        function (err) {
          vm.error = 'Registration error - ' + err;
        }
      );
    };
  }
]);