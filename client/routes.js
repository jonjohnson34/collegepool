
angular.module("collegepool")
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('contact',{
                url: '/contact',
                templateUrl: 'client/home/home.html'
            })

            .state('about',{
                url: '/about',
                template: '<about></about>'
            })

            .state('scores', {
                url: '/scores',
                template: '<scores></scores>'
            })

            .state('totals', {
                url: '/totals',
                template: '<totals></totals>'
            })

            .state('login', {
                url: '/login',
                templateUrl: 'client/auth/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'lc'
            })

            .state('register', {
                url: '/register',
                templateUrl: 'client/auth/register/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'rc'
            })
            .state('resetpw', {
                url: '/resetpw',
                templateUrl: 'client/auth/reset-password/reset-password.html',
                controller: 'ResetCtrl',
                controllerAs: 'rpc'
            })
           
           .state('picks', {
                url: "/picks",
                template: '<picks></picks>'
            })
            
           .state('awards', {
                url: "/awards",
                template: '<awards></awards>'
            })
            
            .state('admin', {
                url: "/admin",
                template: '<admin></admin>'

            })  
            .state('allPicks', {
                url: "/allPicks",
                template: '<allPicks></allPicks>'

            })

            .state('logout', {
                url: '/logout',
                resolve: {
                    "logout": function ($meteor, $state) {
                        return $meteor.logout().then(function () {
                            $state.go('login');
                        }, function (err) {
                            console.log('logout error - ', err);
                        });
                    }
                }
            });
 

        $urlRouterProvider.otherwise("/login");
    });

