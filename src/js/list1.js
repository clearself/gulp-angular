app.controller('list1_ctrl',['$scope','$rootScope','$location','$timeout','listService',function($scope,$rootScope,$location,$timeout,listService){
	$rootScope.num = 1;
	listService.list().success(function(res){
			$scope.list1 = res.list1;
		}).error(function(error){});
}])