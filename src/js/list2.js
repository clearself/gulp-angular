app.controller('list2_ctrl',['$scope','$rootScope','$location','$timeout','listService',function($scope,$rootScope,$location,$timeout,listService){
	listService.list().success(function(res){
			$scope.list2 = res.list2;
		}).error(function(error){});
}])