app.controller('content_ctrl',['$scope','$rootScope','$location','$timeout',function($scope,$rootScope,$location,$timeout){
	$scope.navList = [
		{
			'url':'content.list1',
			'text':'列表一'
		},
		{
			'url':'content.list2',
			'text':'列表二'
		}
	]

	$scope.navClick = function(item){
		for(var i=0;i<$scope.navList.length;i++){
			$scope.navList[i].hasActive = false;
		}
		item.hasActive = true;
	}
}])