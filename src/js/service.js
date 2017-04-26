app
//获取列表1的标题
.factory('listService', ['$http', function($http) {
    return {
        list: function() {
            return $http({
                method: 'get',
                url: baseURL + 'json/data.json',
                data: {}
            });
        }
    };
}])