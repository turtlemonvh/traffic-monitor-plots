# Traffic Monitor Plotting Tool

## Use

Serve the files with a file server (needed to avoid crossdomain issues).  For example, with python

	cd /path/to/directory/
	python -m SimpleHTTPServer 8080

Then you can play with the visualization at [http://localhost:8080/](http://localhost:8080/)

Start by uploading a csv.  The visualization will be created and you can drag filters to play with it.

Right now it expects all rows to be the same route.  If this is not the case, filter with something like this:

    grep myroutename all_route_times.csv > myroutename_times.csv


## Sample data

You can find historical data for commute times on Atlanta's [southbound connector](https://maps.google.com/maps?saddr=I-75+S%2FI-85+S&daddr=I-75+S%2FI-85+S&hl=en&ll=33.777899,-84.381738&spn=0.033424,0.066047&sll=33.691581,-84.402208&sspn=0.005915,0.008256&geocode=FW18AwIdyUr4-g%3BFRAeAgIdMBr4-g&t=h&mra=me&mrsp=1,0&sz=18&z=15) and [northbound connector](https://maps.google.com/maps?saddr=I-75+N%2FI-85+N&daddr=I-85+N&hl=en&ll=33.725625,-84.380836&spn=0.066889,0.132093&sll=33.694398,-84.403576&sspn=0.005914,0.008256&geocode=FUEmAgIdhxb4-g%3BFc6VAwIdYkz4-g&t=h&mra=me&mrsp=0&sz=18&z=14) in the `sample_data` directory of this repository.

## Extensions / TODOs

We should be able to extend this to handle data from multiple places later, but the # fields may overwhelm the browser...

Add a github pages site for this:

* https://pages.github.com/


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