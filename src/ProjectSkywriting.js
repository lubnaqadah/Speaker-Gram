import React from 'react';

/*REACT Bootstrap Stuff*/
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

//My CSS stuff

//D3 Stuff
import { select, selectAll } from 'd3-selection'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { max, range } from 'd3-array'
import { format } from 'd3-format'
import { line, arc, curve } from 'd3-shape'
import * as d3 from "d3";

//Math stuff
const MathJax = require('react-mathjax')

class ProjectSkywriting extends React.Component {


  constructor(props){
     super(props);
     this.state = {
       svg_width: 600,
       svg_height: 600,
       circleWidth: 400, //Width of the circle
    	 circleHeight: 400,	//Height of the circle
       dotRadius: 4,
    	 margin: {top: 20, right: 20, bottom: 20, left: 20}, //The margins of the SVG
    	 labelFactor: 1.25, //How much farther than the radius of the outer circle should the labels be placed
    	 wrapWidth: 60, //The number of pixels after which a label needs to be given a new line
       minLevel: 0,
    	 opacityCircles: 1, //The opacity of the circles of each blob
       strokeWidth: 2,
    	 radialHistogram: {
         opacityCompanyHistogram: 0.10,
         opacityIndividualHistogram: 0.10 //The opacity of the area of the blob
       }
     };
     this.createGraph = this.createGraph.bind(this);
     this.createCircularGridAndAxes = this.createCircularGridAndAxes.bind(this);
     this.createCompanyRadialHistogram = this.createCompanyRadialHistogram.bind(this);
     this.createIndividualRadialHistograms = this.createIndividualRadialHistograms.bind(this);
  }


  /*
   * ==============================
   * BEGIN: Create General Setup
   * ==============================
   */
  createGraph(){

    const node = this.node;

    //remove all previous elements assoc. with graoh, so it can be recreated
    select(node).selectAll("*").remove();
    let grid = this.createCircularGridAndAxes(select(node));
    let companyHistogram = this.createCompanyRadialHistogram(grid);
    let individualHistograms = this.createIndividualRadialHistograms(grid);
  }

  createCircularGridAndAxes(parent){
    let radius = Math.min(this.state.circleWidth/2, this.state.circleHeight/2);
    let radiansOfSlice = Math.PI * 2 / this.props.numCriteria;
    let rScale = scaleLinear()
  		.range([0, radius])
  		.domain([0, this.props.numLevels]);
    let allAxis = (this.props.data[0].map(function(i, j){return i.axis}))

    let circularGridAndAxis = parent.append("g")
      .attr("class", "axisWrapper")

    circularGridAndAxis
      .selectAll(".levels")
      .data( range(0, this.props.numLevels).reverse() )
      .enter()
      .append("circle")
        .attr("class", "gridCircle")
        .attr("r", (d, i) => { return radius/this.props.numLevels*d; })
        .style("fill", "#CDCDCD")
        .style("stroke", "#FFFFFF")
        .style("fill-opacity", this.state.opacityCircles)


    circularGridAndAxis.selectAll(".upAxisLabel")
	   .data( range(0, this.props.numLevels).reverse() )
	   .enter()
     .append("text")
  	   .attr("class", "upAxisLabel")
  	   .attr("x", -10)
  	   .attr("y", (d) => { return -d * radius/this.props.numLevels; })
  	   .attr("dy", "0.4em")
  	   .style("font-size", "10px")
       .style("fill-opacity", 1)
       .style("z-index", -1000)
       .attr("fill", "#ff0000")
  	   .text( (d, i) => { return d});

    circularGridAndAxis.selectAll(".downAxisLabel")
 	   .data( range(0, this.props.numLevels).reverse() )
 	   .enter()
      .append("text")
   	   .attr("class", "downAxisLabel")
   	   .attr("x", 5)
   	   .attr("y", (d) => { return -d * radius/this.props.numLevels; })
   	   .attr("dy", "0.4em")
   	   .style("font-size", "10px")
       .style("fill-opacity", 1)
       .style("z-index", -1000)
       .attr("fill", "#000000")
   	   .text( (d, i) => { return i });

    let axis = circularGridAndAxis.selectAll(".axis")
   		.data(allAxis)
   		.enter()
   		.append("g")
   		.attr("class", "axis");


    let numLevels = this.props.numLevels;

    axis.append("line")
  		.attr("x1", 0)
  		.attr("y1", 0)
  		.attr("x2", function(d, i){ return rScale( numLevels* 1.1) * Math.cos(radiansOfSlice*i - Math.PI/2); })
  		.attr("y2", function(d, i){ return rScale( numLevels * 1.1) * Math.sin(radiansOfSlice*i - Math.PI/2); })
  		.attr("class", "line")
  		.style("stroke", "#1c3465")
  		.style("stroke-width", "2px");

    //Append the labels at each axis
    let withinScopeLabelFactor = this.state.labelFactor;

  	axis.append("text")
  		.attr("class", "legend")
  		.style("font-size", "11px")
      .style("fill", "#1c3465")
  		.attr("text-anchor", "middle")
  		.attr("dy", "0.35em")
  		.attr("x", function(d, i){ return rScale(numLevels * withinScopeLabelFactor) * Math.cos(radiansOfSlice*i - Math.PI/2); })
  		.attr("y", function(d, i){ return rScale(numLevels * withinScopeLabelFactor) * Math.sin(radiansOfSlice*i - Math.PI/2); })
  		.text(function(d){ return d})
  		.call(wrap, this.state.wrapWidth);

    return axis;
  }

  /*
   * ==============================
   * END: Create General Setup
   * ==============================
   */
  /*
   * ==============================
   * Begin: Create individual Radial Histogram
   * ==============================
   */
   createIndividualRadialHistograms(grid){
     if(this.props.data.length == 0) return;
     let outerRange = Math.min(this.state.circleWidth/2, this.state.circleHeight/2); //need to think about this more
     let outerRadius = outerRange - ((1/this.props.numLevels) * outerRange);
     //let innerRadius = outerRadius / this.props.numLevels; //imagine a ring.  This is the radius of the innermost point of ring (starts at center of circle)
     let innerRadius = 0;
     let radiansOfSlice = Math.PI * 2 / this.props.numCriteria;
     let outerScale = scaleLinear().range([innerRadius, outerRadius]).domain([this.state.minLevel, this.props.numLevels - 1]);
     let numCriteria = this.props.numCriteria; //props not recogized directly in callback function
     let shiftValue = 2 * Math.PI

     let rScale = scaleLinear()
      .range([0, outerRange])
      .domain([0, this.props.numLevels]);

     let histogramBorder = d3.lineRadial().curve(d3.curveLinearClosed)
       .radius(function(d) { return rScale(d.value); })
       .angle(function(d,i) {	return i*radiansOfSlice; });

     let arc = d3.arc()
       .innerRadius(function (d, i) {
         return innerRadius;
       })
       .outerRadius(function (d, i) {
         return outerScale(d.value);
       })
       .startAngle(function (d, i) {return 2 * Math.PI * ( (2*i - 1) / (2*numCriteria) );}) // i=0,1,2,3,4
       .endAngle(function (d, i) {return 2 * Math.PI * ( (2*i + 1) / (2*numCriteria) );});

     //console.log(this.props.companies);
     //create a wrapper for arcs because we're dealing with objects for axis:value
     let opacityIndividualHistogram = this.state.radialHistogram.opacityIndividualHistogram;
     let opacityCompanyHistogram = this.state.radialHistogram.opacityCompanyHistogram;

     let color = scaleOrdinal()
 				.range(this.props.colors);


     let arcWrapperGroup;
     let temp;
     let tempString;

     for(let index=0; index<this.props.data.length; index++){


       arcWrapperGroup = grid.selectAll(".individualArcWrapper_" + index)
          .data(this.props.data[index])
          .enter()
          .append("path")
            .attr("class", "individualArcWrapper_" + index)
            .attr("d", function(d,i) { return arc(d, i); })
            .style("fill", function(d,i) { return color(index); })
            .style("fill-opacity", this.state.radialHistogram.opacityIndividualHistogram)
            .style("stroke-width", this.state.strokeWidth + "px")
            .style("stroke-opacity", "1")
            .style("stroke", function(d,i) { return color(index); })
            .on('mouseover', function (d){
              //Bring back this individual arc
              tempString = ".individualArcWrapper_" + index;
              temp = d3.selectAll(tempString)
                .transition().duration(200)
                .style("fill-opacity", 0.7);
            })
            .on('mouseout', function(){
              //Bring back all blobs
              d3.selectAll(".individualArcWrapper_" + index)
                .transition().duration(200)
                .style("fill-opacity", opacityIndividualHistogram);
              //Bring back arc opacity
              d3.selectAll(".companyArcWrapper")
                .transition().duration(200)
                .style("fill-opacity", opacityCompanyHistogram);
            });
      }




   }
  /*
   * ==============================
   * End: Create individual Radial Histogram
   * ==============================
   */

   /*
    * ==============================
    * BEGIN: Create Company Radial Histogram
    * ==============================
    */
   createCompanyRadialHistogram(grid){
     if(this.props.companies.length == 0) return;
     let outerRange = Math.min(this.state.circleWidth/2, this.state.circleHeight/2); //need to think about this more
     let outerRadius = outerRange - ((1/this.props.numLevels) * outerRange);
     //let innerRadius = outerRadius / this.props.numLevels; //imagine a ring.  This is the radius of the innermost point of ring (starts at center of circle)
     let innerRadius = 0;
     let radiansOfSlice = Math.PI * 2 / this.props.numCriteria;
     let innerScale = scaleLinear().range([outerRadius, innerRadius]).domain([this.state.minLevel, this.props.numLevels - 1]);
     let numCriteria = this.props.numCriteria; //props not recogized directly in callback function
     let shiftValue = 2 * Math.PI
     /* One possibility...
     let arc = d3.arc()
       .innerRadius(function (d) {return innerScale(d.value);})
       .outerRadius(function (d) {return outerRadius;})
       .startAngle(function (d, i) {return 2 * Math.PI * ((i - (1/numCriteria) * (2*Math.PI/numCriteria))/numCriteria);}) // i=0,1,2,3,4
       .endAngle(function (d, i) {return 2 * Math.PI * ((i + (1/numCriteria) * (2*Math.PI/numCriteria))/numCriteria);});
     */
     let arc = d3.arc()
       .innerRadius(function (d) {return innerScale(d.value);})
       .outerRadius(function (d) {return outerRadius;})
       .startAngle(function (d, i) {return 2 * Math.PI * ( (2*i - 1) / (2*numCriteria) );}) // i=0,1,2,3,4
       .endAngle(function (d, i) {return 2 * Math.PI * ( (2*i + 1) / (2*numCriteria) );});

     //console.log(this.props.companies);
     //create a wrapper for arcs because we're dealing with objects for axis:value
     let opacityIndividualHistogram = this.state.radialHistogram.opacityIndividualHistogram;
     let opacityCompanyHistogram = this.state.radialHistogram.opacityCompanyHistogram;
     let arcWrapper = grid.selectAll(".companyArcWrapper")
      .data(this.props.companies[0])
      .enter()
       .append("path")
        .attr("class", "companyArcWrapper")
        .attr("d", function(d,i) { return arc(d, i); })
        .style("fill", '#00ffff')
        .style("fill-opacity", this.state.radialHistogram.opacityCompanyHistogram)
        .on('mouseover', function (d,i){
    			//Dim all individual arcs
    			d3.selectAll(".individualArcWrapper")
    				.transition().duration(200)
    				.style("fill-opacity", opacityIndividualHistogram);
    			//Bring back all individual arcs
    			d3.selectAll(".companyArcWrapper")
    				.transition().duration(200)
    				.style("fill-opacity", 0.7);
    		})
    		.on('mouseout', function(){
    			//Bring back all individual arcs
    			d3.selectAll(".individualArcWrapper")
    				.transition().duration(200)
    				.style("fill-opacity", opacityIndividualHistogram);
          //Bring back company arc opacity
          d3.selectAll(".companyArcWrapper")
            .transition().duration(200)
            .style("fill-opacity", opacityCompanyHistogram);
    		});
   }
   /*
    * ==============================
    * END: Create Company Radial Histogram
    * ==============================
    */

  /*
   * ==============================
   * BEGIN: REACT Rendering Methods
   * ==============================
   */
  componentDidMount(){
    if((this.props.data.length > 0) && (this.props.numCriteria > 0))
      this.createGraph();
  }
  componentDidUpdate(){
    if((this.props.data.length > 0) && (this.props.numCriteria > 0))
      this.createGraph();
  }
  /*
   * ==============================
   * END: REACT Rendering Methods
   * ==============================
   */







  render() {
    return (
      <div className="ProjectSkywritingGraph">
        <svg ref={node => this.node = node}
         width={this.state.svg_width} height={this.state.svg_height}
         viewBox={`-300 -300 ${this.state.svg_width} ${this.state.svg_height}`}>
        </svg>
      </div>
    );
  }
}

/////////////////////////////////////////////////////////
/////////////////// Helper Function /////////////////////
/////////////////////////////////////////////////////////

//Taken from http://bl.ocks.org/mbostock/7555321
//Wraps SVG text
function wrap(text, width) {
  text.each(function() {
    var text = select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.4, // ems
        y = text.attr("y"),
        x = text.attr("x"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

    while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
    }
  });
}//wrap


export default ProjectSkywriting;
