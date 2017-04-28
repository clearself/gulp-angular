app.controller('list1_ctrl',['$scope','$rootScope','$location','$timeout','listService',function($scope,$rootScope,$location,$timeout,listService){
	$scope.listName = 'in_theaters';
	listService.list($scope.listName).success(function(res){
		$scope.listItems = res.subjects;
			console.log(res);
	}).error(function(error){});
}])