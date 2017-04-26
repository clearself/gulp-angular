var app = angular.module('app',["ui.router"]);
app.config(function($stateProvider, $urlRouterProvider,$httpProvider){
	$stateProvider
        .state('index', {
            url: "/index",
            templateUrl: "./dist/login.html",
            controller:'login_ctrl'
        })
        .state('content',{
            url: "/content",
            templateUrl: "./dist/content.html",
            controller:'content_ctrl'
        })
        .state('content.list1',{
            url: "/list1",
            templateUrl: "./dist/list1.html",
            controller:'list1_ctrl'
        })
        .state('content.list2',{
            url: "/list2",
            templateUrl: "./dist/list2.html",
            controller:'list2_ctrl'
        });
    	$urlRouterProvider.otherwise("/index");
    //更改配置，$http 的post\put 请求时  后台能接收到参数
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.transformRequest = [function(data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                            + encodeURIComponent(value) + '&';
                }
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };
        return angular.isObject(data) && String(data) !== '[object File]'
                ? param(data)
                : data;
    }];
});

;app.run(function($rootScope, $templateCache) {  
    $rootScope.$on('$routeChangeStart', function(event, next, current) {  
        if (typeof(current) !== 'undefined'){  
            $templateCache.remove(current.templateUrl);  
        }  
    });  
})
;app.filter("htmlFilter", function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});