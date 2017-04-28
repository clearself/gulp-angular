app
//获取列表1的标题
.factory('listService', ['$http', function($http) {
    return {
        list: function(name) {
        	return $http({
                method: 'get',
                url: baseURL + name,
                data: {}
            });
        }
    };
}])