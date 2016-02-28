(function() {

  'use strict'

  var svgWidth = 500;
  var svgHeight = 200;

  var colorScheme = {
    background: '#CCC'
  };

  // declare main svg
  var svg = d3.select('body')
    .append('svg')
      .attr({
        'width': svgWidth,
        'height': svgHeight
      });

  var svgBackground = svg.append('rect')
    .attr({
      'width': '100%',
      'height': '100%',
      'fill': colorScheme.background
    });

})();
