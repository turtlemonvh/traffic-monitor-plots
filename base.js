var trafficPlots = angular.module('trafficPlots', ['flow']);


// d3.csv.parseRows
trafficPlots.service('dataFilter', function() {
	this.filter = {};
})

trafficPlots.constant('_', window._ );
trafficPlots.constant('d3', window.d3 );

trafficPlots.controller('baseCtrl', ['$scope', 'dataFilter',
function($scope, dataFilter){
	$scope.uploadedFile = {};
	$scope.progress = {};

	$scope.addFile = function($file, $event) {
		console.log($file);
		console.log($event);
		$scope.uploadedFile = $file;
		progress.status = "File added"
	}

}]);