import React from 'react';
import d3 from 'd3';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import FlipMove from 'react-flip-move';

class BarChart extends React.Component{

    render(){
        const { classes, data } = this.props;
        const chart_width = 1800;
        const chart_height = 600;




        const x_scale = d3.scaleBand()
                        .domain( d3.range( data.length ) )
                        .rangeRound([ 0, chart_width ])
                        .paddingInner( 0.1 );
        
        const y_scale = d3.scaleLinear()
                        .domain([0, d3.max( data, function(d){
                            return Number(d[1])
                        } )])
                        .range([ 2, chart_height ]);

        
        const bars = data.map( (d, i) => {
            return <rect key={i} x={x_scale(i)} y={chart_height - y_scale(d[1])} width={x_scale.bandwidth()} height={y_scale(d[1])} />
        } );
        

        return (
            <div className={classes.BarChart}>
                <svg width={chart_width} height={chart_height}>
  
                {bars}
                
                </svg>
            </div>
        );
    }
}


const styles = theme => ({
    BarChart: {
        marginTop: 50,

    },

 
  })

export default injectSheet(styles)(BarChart)



/*


svg.selectAll( 'rect' )
    .data( data )
    .enter()
    .append( 'rect' )
    .attr( 'x', function( d, i ){
        return x_scale(i);
    })
    .attr( 'y', function(d ){
        return chart_height - y_scale( d );
    })
    .attr( 'width', x_scale.bandwidth() )
    .attr( 'height', function( d ){
        return y_scale( d );
    })
    .attr( 'fill', '#7ED26D' )
    .on( 'mouseover', function( d ){
        var x       =   parseFloat(d3.select(this).attr('x'))  +
                        x_scale.bandwidth() / 2;
        var y       =   parseFloat(d3.select(this).attr('y')) /
                        2 + chart_height / 2;

        d3.select('#tooltip')
            .style( 'left', x + "px" )
            .style( 'top', y + "px" )
            .style( 'display', 'block' )
            .text(d);
    })
    .on( 'mouseout', function(){
        d3.select( '#tooltip' )
            .style( 'display', 'none' )
    });



*/