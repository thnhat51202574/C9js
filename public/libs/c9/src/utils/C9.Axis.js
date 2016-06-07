'use strict';

class Axis {
    constructor(options, svg, data, width, height, xAxe, yAxe) {
        var config = {
            x_axis_show     : true,
            x_axis_padding  : {},   // TODO
            x_axis_text     : 'Name',
            y_axis_show     : true,
            y_axis_padding  : {},   // TODO
            y_axis_text     : 'Value',
            y2_axis_show    : true,
            y2_axis_padding : {},   // TODO
            y2_axis_text    : 'Value',
            grid_x_show: false,
            grid_y_show: false
        };

        this._xAxisShow     = options.x_axis_show      || config.x_axis_show;
        this._xAxisPadding  = options.x_axis_padding   || config.x_axis_padding;
        this._xAxisText     = options.x_axis_text      || config.x_axis_text;
        this._yAxisShow     = options.y_axis_show      || (svg.c9Chart == "timeline" ? false : config.y_axis_show);
        this._yAxisPadding  = options.y_axis_padding   || config.y_axis_padding;
        this._yAxisText     = options.y_axis_text      || config.y_axis_text;
        this._y2AxisShow    = options.y2_axis_show     || config.y2_axis_show;
        this._y2AxisPadding = options.y2_axis_padding  || config.y2_axis_padding;
        this._y2AxisText    = options.y2_axis_text     || config.y2_axis_text;
        this._gridXShow     = options.grid_x_show       || config.grid_x_show;
        this._gridYShow     = options.grid_y_show       || config.grid_y_show;


        var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);

        var y = d3.scale.linear().range([height, 0]);

        x.domain(data.map(function(d) {
            return d.name;
        }));

        y.domain([0, d3.max(data, function(d) {
            return d.value;
        })]);

        if (svg.c9Chart == "timeline") {

            var xScale = d3.time.scale()
                .domain([options.starting, options.ending])
                .range([0, width]);
            this._xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .tickFormat(options.tickFormat === undefined ? d3.time.format("%I %p") : options.tickFormat.format)
                .tickSize(options.tickFormat === undefined ? 6 : options.tickFormat.tickSize)
                .ticks(options.tickFormat === undefined ? d3.time.hours : options.tickFormat.tickTime, options.tickFormat === undefined ? 1 : options.tickFormat.tickInterval);
            delete options.starting;
            delete options.ending;

            // this._yAxis = d3.svg.axis()
            //     .scale(y)
            //     .orient("left")
            //     .ticks(10);

        } else if (svg.c9Chart == "line") {

            this._xAxis = xAxe;
            this._yAxis = yAxe;

        } else {

            this._xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .ticks(10);

            this._yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(10);

        }

        

        // Grid
        if (this._gridXShow) {
            // Select CURRENT svg container, to make this axis outside
            // as a SEPARATED component, just like AXIS, of CHART
            // d3.select(this._svg[0][0].parentNode)
            this._xAxis.innerTickSize(-height)
                .outerTickSize(0);
        }

        if (this._gridYShow) {
            // Select CURRENT svg container, to make this axis outside
            // as a SEPARATED component, just like AXIS, of CHART
            // d3.select(this._svg[0][0].parentNode)
            this._yAxis.innerTickSize(-width)
                .outerTickSize(0);
        }

        this._svg    = svg;
        this._data   = data;
        this._width  = width;   // TODO : ADD Getter/setter
        this._height  = height;

        if (this._xAxisShow) {
            this._svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (height) + ")")
                .call(this._xAxis)
                .append("text")
                .attr("dx", "-.8em")
                .attr("dy", "-.55em")
                .attr("x", width)
                .attr("y", "20")
                .style("text-anchor", "start")
                .text(this._xAxisText);
                // .attr("transform", "rotate(-90)" );
        }

        if (this._yAxisShow) {
            this._svg.append("g")
                .attr("class", "y axis")
                .call(this._yAxis)
                .append("text")
                // .attr("transform", "rotate(-90)")
                .attr("y", -10)
                .attr("dy", ".10")
                .style("text-anchor", "end")
                .text(this._yAxisText);
        }


        /**
            TODO:
            - Add y2-axis
        **/
            
    }

    /*==============================
    =            Getter            =
    ==============================*/
    
    get xAxis() {
        return this._xAxis;
    }

    get yAxis() {
        return this._yAxis;
    }

    get xAxisShow() {
        return this._xAxisShow;
    }

    get xAxisPadding() {
        return this._xAxisPadding;
    }

    get yAxisShow() {
        return this._yAxisShow;
    }

    get yAxisPadding() {
        return this._yAxisPadding;
    }

    get y2AxisShow() {
        return this._y2AxisShow;
    }

    get y2AxisPadding() {
        return this._y2AxisPadding;
    }
    
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    
    set xAxis(newXAxis) {
        if (newXAxis) {
            this._xAxis = newXAxis;
        }
    }

    set yAxis(newYAxis) {
        if (newYAxis) {
            this._yAxis = newYAxis;
        }
    }

    set xAxisShow(newXAxisShow) {
        if (newXAxisShow) {
            this._xAxisShow = newXAxisShow;
        }
    }

    set xAxisPadding(newXAxisPadding) {
        if (newXAxisPadding) {
            this._xAxisPadding = newXAxisPadding;
        }
    }

    set yAxisShow(newYAxisShow) {
        if (newYAxisShow) {
            this._yAxisShow = newYAxisShow;
        }
    }

    set yAxisPadding(newYAxisPadding) {
        if (newYAxisPadding) {
            this._yAxisPadding = newYAxisPadding;
        }
    }

    set y2AxisShow(newY2AxisShow) {
        if (newY2AxisShow) {
            this._y2AxisShow = newY2AxisShow;
        }
    }

    set y2AxisPadding(newY2AxisPadding) {
        if (newY2AxisPadding) {
            this._y2AxisPadding = newY2AxisPadding;
        }
    }
    
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/
    /*=====  End of Main Functions  ======*/
    
}