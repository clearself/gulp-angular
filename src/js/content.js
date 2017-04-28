app.controller('content_ctrl',['$scope','$rootScope','$location','$timeout',function($scope,$rootScope,$location,$timeout){
	$scope.navList = [
		{
			"url":"content.list1",
			"text":"正在热映"
		},
		{
			"url":"content.list2",
			"text":"即将上映"
		}
	]

}])