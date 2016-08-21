angular.module("collegepool").controller("ResetCtrl", ['$meteor', '$state',
  function ($meteor, $state) {
    var vm = this;
 
    vm.credentials = {
      email: ''
    };
 
    vm.error = '';
 
    vm.reset = function () {
      $meteor.forgotPassword(vm.credentials).then(
        
        function () {
          console.log(vm.credentials);
          console.log('email sent');
          alert('forgot email sent');
        },
        function (err) {
          vm.error = 'Error sending forgot password email - ' + err;
        }
      );
    };
  }
]);