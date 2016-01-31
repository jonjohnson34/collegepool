
angular.module("collegepool")
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider
            
            .state('/contact',{
                url: '/contact',
                templateUrl: 'client/home/home.html'
            })

            .state('about', {
                url: '/about',
                template: '<about></about>'
            })

            .state('games', {
                url: '/games',
                template: '<games></games>'
            })

            .state('makepicks', {
                url: '/makepicks',
                template: '<makepicks></makepicks>'
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
            })

            .state('picks', {
                url: "/picks",
                template: '<picks></picks>'
            })
            
            .state('admin', {
                url: "/admin",
                template: '<admin></admin>'

            })  
            .state('allPicks', {
                url: "/allPicks",
                template: '<allPicks></allPicks>'

            });

       $urlRouterProvider.otherwise("/");
    });
    
