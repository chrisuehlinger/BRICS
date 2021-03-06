var width = 960,
    height = 960;

var projection = d3.geo.orthographic()
    .scale(450)
    .clipAngle(90);

var canvas = d3.select("body").append("canvas")
    .attr("width", width)
    .attr("height", height);

var c = canvas.node().getContext("2d");

var path = d3.geo.path()
    .projection(projection)
    .context(c);

var title = d3.select("#currTitle");

queue()
    .defer(d3.json, "data/world-110m.json")
    .defer(d3.tsv, "data/brics.tsv")
    .await(ready);

function ready(error, world, names) {
  var globe = {type: "Sphere"},
      land = topojson.feature(world, world.objects.land),
      countries = topojson.feature(world, world.objects.countries).features,
      borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }),
      i = -1,
      n = names.length;

  countries = countries.filter(function(d) {
    return names.some(function(n) {
      if (d.id == n.id) return d.name = n.name;
    });
  }).sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });
    
    var scrollOffset = '10%';
    
    new Waypoint({
      element: $('h1'),
      handler: function(direction) {
        transition()
      }
    });
    
    new Waypoint({
      element: $('#brazil'),
      handler: function(direction) {
        transition('Brazil')
      },
        offset:scrollOffset
    });
    
    new Waypoint({
      element: $('#russia'),
      handler: function(direction) {
        transition('Russian Federation')
      },
        offset:scrollOffset
    });
    
    new Waypoint({
      element: $('#india'),
      handler: function(direction) {
        transition('India')
      },
        offset:scrollOffset
    });
    
    new Waypoint({
      element: $('#china'),
      handler: function(direction) {
        transition('China')
      },
        offset:scrollOffset
    });
    
    new Waypoint({
      element: $('#southAfrica'),
      handler: function(direction) {
        transition('South Africa')
      },
        offset:scrollOffset
    });

    c.clearRect(0, 0, width, height);
            c.fillStyle = "#bbb", c.beginPath(), path(land), c.fill();
            c.strokeStyle = "#fff", c.lineWidth = .5, c.beginPath(), path(borders), c.stroke();
            c.strokeStyle = "#000", c.lineWidth = 2, c.beginPath(), path(globe), c.stroke();
  function transition(countryName) {
      var thisCountry = countries.filter(function(country){return country.name === countryName})[0];
      console.log(thisCountry,d3.geo.centroid(thisCountry));

    d3.transition()
        .duration(1250)
        .tween("rotate", function() {
          var p = thisCountry ? d3.geo.centroid(thisCountry) : [0,0],
              r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
          return function(t) {
            projection.rotate(r(t));
            c.clearRect(0, 0, width, height);
            c.fillStyle = "#bbb", c.beginPath(), path(land), c.fill();
              if(thisCountry)
                c.fillStyle = "#f00", c.beginPath(), path(thisCountry), c.fill();
            c.strokeStyle = "#fff", c.lineWidth = .5, c.beginPath(), path(borders), c.stroke();
            c.strokeStyle = "#000", c.lineWidth = 2, c.beginPath(), path(globe), c.stroke();
          };
        });
  }
}