angular.module("collegepool").directive('awards', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/awards/awards.html',
    controllerAs: 'awards',
    controller: function ($scope, $reactive, $q) {

      $reactive(this).attach($scope);

      var getData = () => {
        var deferred = $q.defer();
        Meteor.call('getTotals', (error, result) => {
          if (error) {
            deferred.reject('error');
          } else {
            deferred.resolve(result);
          }
        });
        return deferred.promise;
      };

      getData().then((data) => {
        this.getAwards = data;
        console.log(data);
      });

    }
  }
});