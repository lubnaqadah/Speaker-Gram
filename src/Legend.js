import React from 'react';

/*REACT Bootstrap Stuff*/
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';


//D3 Stuff
import { select, selectAll } from 'd3-selection'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { max, range } from 'd3-array'
import { format } from 'd3-format'
import { line, arc } from 'd3-shape'
import * as d3 from "d3";

class Legend extends React.Component {
  constructor(props){
    super(props);
  }

  generateLegend(){

  }
  render(){
    return this.props.colors.map((i) =>
        <div key={i}>

        </div>
    )
  }

}

export default Legend;
