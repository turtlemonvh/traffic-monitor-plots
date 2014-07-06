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

	        // https://github.com/mbostock/d3/wiki/Time-Formatting
	        // (e.g.) 20130523 10:15:00
	        var dateFormat = d3.time.format("%Y%m%d %X");

	        // May want to switch to pre-calculating more data
	        // (e.g.) date as integer 1-365, time in 15 minute blocks
	        // See http://dc-js.github.io/dc.js/docs/stock.html#section-8
	        // DOY function from: http://javascript.about.com/library/bldayyear.htm
			function getDOY(dateObj) {
				var onejan = new Date(dateObj.getFullYear(),0,1);
				return Math.ceil((dateObj - onejan) / 86400000);
			}
			function getMinutesBin(dateObj) {
				return 15*Math.round((dateObj.getHours()*60 + dateObj.getMinutes())/15);
			}

			self.data = d3.csv.parseRows(reader.result, function(row){
				var date = dateFormat.parse(row[1] + " " + row[3] + ":00");
				return {
					route: row[0], // string
					date: date,
					dayOfWeek: +row[2], // integer; 0 is Monday
					dayOfYear: +getDOY(date),
					timeOfDay: +getMinutesBin(date), // 15 min bins
					duration: +row[4] // integer time
				}
			});

			// Final status
		    msgBus.emitMsg('fileupload:status', {
		        status: "Done parsing: " + $filter('number')(self.data.length, 0) + " rows"
	        });

	        // console.log(self.data)
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

trafficPlots.directive('trafficCharts', ['dataFilter',
function(dataFilter){
	return {
		restrict: 'E',
		templateUrl: 'dataViz.html',
		link: function(scope, element, attrs) {
			// eventually use scope to switch which location to use

			// See example
			// http://dc-js.github.io/dc.js/docs/stock.html
			// Data should stay in service so table and other features can be managed with angular
			// e.g. update current avg # display with angular

			// Bar charts
			// https://github.com/dc-js/dc.js/blob/master/web/docs/api-1.6.0.md#bar-chart
			var timeOfDayChart = dc.barChart("#time-of-day");
			var timeOfYearChart = dc.barChart("#time-of-year");
			var dayOfWeekChart = dc.rowChart("#day-of-week");

			var timeDistributionChart = dc.barChart("#time-distribution");

		}
	}
}])
