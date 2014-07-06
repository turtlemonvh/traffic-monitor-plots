# Traffic Monitor Plotting Tool

## Use

Serve the files with a file server (needed to avoid crossdomain issues).  For example, with python

	cd /path/to/directory/
	python -m SimpleHTTPServer 8080

Then you can play with the visualization at http://localhost:8080/

Start by uploading a csv.  The visualization will be created and you can drag filters to play with it.

Right now it expects all rows to be the same route.  If this is not the case, filter with something like this:

    grep home route_times.csv > home_route_times.csv


## Extensions

We should be able to extend this to handle data from multiple places later, but the # fields may overwhelm the browser...

## Technology Used

* [d3](http://d3js.org/)
* [crossfilter](http://square.github.io/crossfilter/)
* [dc.js](http://dc-js.github.io/dc.js/)
* [angularjs](https://angularjs.org/)
* [underscorejs](http://underscorejs.org/)
* [Flow js](https://github.com/flowjs/flow.js)
* [ng-flow angular directive](http://flowjs.github.io/ng-flow/)

## Why

Because traffic in Atlanta is no bueno.  And to play with crossfilter.

## License

MIT