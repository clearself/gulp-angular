app.controller('list2_ctrl',['$scope','$rootScope','$stateParams','$location','$timeout','listService',function($scope,$rootScope,$stateParams,$location,$timeout,listService){
	$scope.listName = 'coming_soon';
	listService.list($scope.listName).success(function(res){
		$scope.listItems = res.subjects;
			console.log(res);
	}).error(function(error){});
}])