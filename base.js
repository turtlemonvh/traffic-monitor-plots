var trafficPlots = angular.module('trafficPlots', ['flow']);

trafficPlots.constant('_', window._ );
trafficPlots.constant('d3', window.d3 );

trafficPlots.factory('msgBus', ['$rootScope', function($rootScope) {
  var msgBus = {};
  msgBus.emitMsg = function(msg, data) {
    data = data || {};
    $rootScope.$emit(msg, data);
  };
  msgBus.onMsg = function(msg, func, scope) {
    var unbind = $rootScope.$on(msg, func);
    if (scope) {
      scope.$on('$destroy', unbind);
    }
    return unbind;
  };
  return msgBus;
}]);

// d3.csv.parseRows
trafficPlots.service('dataFilter', ['d3', 'msgBus', '$filter',
function(d3, msgBus, $filter) {
	var self = this;

	this.filter = {};

	this.parseFile = function() {
		if (!self.file) {
			alert('Problem parsing - no csv set');
		}
		var reader = new FileReader();
        msgBus.emitMsg('fileupload:status', {
          status: "File added"
        });

        msgBus.emitMsg('fileupload:status', {
          status: "Start reading"
        });
		reader.readAsText(self.file);

		reader.onload = function(){
			// Parsing status
	        msgBus.emitMsg('fileupload:status', {
	          status: "Start parsing"
	        });
			self.data = d3.csv.parseRows(reader.result);

			// Final status
		    msgBus.emitMsg('fileupload:status', {
		        status: "Done parsing: " + $filter('number')(self.data.length, 0) + " rows"
	        });
		};
	}

	// Set up crossfilter
	
}]);


trafficPlots.controller('baseCtrl', ['$scope', 'dataFilter', 'msgBus', 
function($scope, dataFilter, msgBus){
	$scope.uploadedFile = {};
	$scope.progress = "Waiting for file";
	$scope.dataFilter = dataFilter;

	msgBus.onMsg('fileupload:status', function(event, data) {
		$scope.progress = data.status;
		$scope.$digest();
	});

	$scope.addFile = function($file, $event) {
		// FlowFile object
		// https://github.com/flowjs/flow.js#flowfile
		$scope.uploadedFile = $file;

		// HTML5 file object
		// http://www.html5rocks.com/en/tutorials/file/dndfiles/#toc-reading-files
	    if (!$file.file.name.match(/.*(csv)$/)) {
	        alert('Invalid file type uploaded')
	        $scope.uploadedFile = {};
	        return;
	    }

	    // Set file and read in data
	    dataFilter.file = $file.file;
		dataFilter.parseFile();
	}

}]);