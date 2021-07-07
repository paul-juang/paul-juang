 //interactive bar chart
 $(function() { 
 
  $("<a>").attr({id:"return",title:"返回首頁"})
  .css({color: "rgb(0,0,255)"})
  .text("\u21B6").appendTo('body');
  $("<br>").appendTo('body');

  $("#return").on("click",function() {
    $(this).attr("href","/")
  })

   $("<label>").text("Sort by Wins")
           .append($("<input>").attr({type: "checkbox",id: "checkbox"}))
           .appendTo("body");

    var outerwidth = 960,  
        outerheight = 500, 
        margin = {top: 20, right: 20, bottom: 80, left: 20},
        width = outerwidth - margin.right - margin.left,
        height = outerheight - margin.top - margin.bottom;
         
    var svg = d3.select("body").append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom-80)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xpadding = 0.1;

    var xScale = d3.scale.ordinal()
        .rangeBands([0, width],xpadding);

    var yScale = d3.scale.linear()
        .range([height,0]);

    var color = d3.scale.category20();

    var type = function (d) {
      d.W = +d.W;
      return d;
     }

    d3.csv("nfl.csv",type,function(dataset) {    

      xScale.domain(dataset.map(function(d) { return d.Team}));

      var max = d3.max(dataset, function(d) { return d.W; });
      var min = d3.min(dataset, function(d) { return d.W; })
      yScale.domain([min,max]);


      svg.selectAll("rect")
         .data(dataset)
         .enter().append("rect")
         .attr("x", function(d){ return xScale(d.Team);})
         .attr("y", function(d){ return yScale(d.W);})
         .attr("width", function(d){ return xScale.rangeBand();})
         .attr("height", function(d){ return height - yScale(d.W);})
         .attr("fill", function(d){ return color(d.Team);})
         .append("title")
         .text(function(d){ return d.Team; });

         //set order property for each member
         dataset.forEach(function(d,index) { d["order"] = index;}); 

         $("#checkbox").on("change",function() {         
            if (this.checked) {
              var sortComparer = function(a,b) {
                return b.W - a.W;    //descending
              };
            } else {
              var sortComparer = function(a,b) {
                return a.order - b.order;  //ascending
              };
            }
            dataset.sort(sortComparer)        
            xScale.domain(dataset.map(function(d) { return d.Team}));

            svg.transition()
            .duration(500)
            .selectAll("rect")
            .delay(function(d,i){ return i * 50;})
            .attr("x", function(d) { return xScale(d.Team);});
          }); 
    }) //end of d3.csv

}) //end of (function)

/*
nfl.csv
Team,Division,W,L,T,Color
Patriots,AFC East,14,2,0,#C80815
Dolphins,AFC East,10,6,0,#008D97
Bills,AFC East,7,9,0,#C60C30
Jets,AFC East,5,11,0,#0C371D
Steelers,AFC North,11,5,0,#000000
Ravens,AFC North,8,8,0,#280353
Bengals,AFC North,6,9,1,#FB4F14
Browns,AFC North,5,11,0,#FE3C00
Texans,AFC South,9,7,0,#B31B34
Titans,AFC South,9,7,0,#0D254C
Colts,AFC South,8,8,0,#003B7B
Jaguars,AFC South,6,10,0,#006778
Chiefs,AFC West,12,4,0,#B20032
Raiders,AFC West,12,4,0,#000000
Broncos,AFC West,9,7,0,#FB4F14
Chargers,AFC West,5,11,0,#0C2340
Cowboys,NFC East,13,3,0,#0D254C
Giants,NFC East,11,5,0,#192F6B
Redskins,NFC East,8,7,1,#773141
Eagles,NFC East,7,9,0,#203731
Packers,NFC North,10,6,0,#203731
Lions,NFC North,9,7,0,#006DB0
Vikings,NFC North,8,8,0,#3B0160
Bears,NFC North,3,13,0,#DD4814
Falcons,NFC South,11,5,0,#BD0D18
Buccaneers,NFC South,9,7,0,#D60A0B
Saints,NFC South,7,9,0,#000000
Panthers,NFC South,6,10,0,#0088CE
Seahawks,NFC West,10,5,1,#002244
Cardinals,NFC West,7,8,1,#9B2743
Rams,NFC West,4,12,0,#13264B
49ers,NFC West,2,14,0,#AF1E2C

*/

//bar chart with x and y axis
$(function() {

  var outerwidth = 960,
      outerheight = 500,
      margin = {top: 20, right: 60, bottom: 30, left: 80},    
      width = outerwidth - margin.left - margin.right,
      height = outerheight - margin.top - margin.bottom,
      xpadding = 0.1;

  var svg = d3.select("body")
            .append('svg')
            .attr('width',outerwidth).attr('height',outerheight);

  var g = svg.append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xScale = d3.scale.ordinal()
               .rangeBands([0, width],xpadding);

  var yScale = d3.scale.linear()
               .range([height, 0]);

  var color = d3.scale.category20();

  var type = function(d) {
     d.frequency = +d.frequency;
     return d;
  }

  d3.tsv("data.tsv",type, function(error, data) {

      if (error) throw error;

      xScale.domain(data.map(function(d) { return d.letter; }));
      yScale.domain([0, d3.max(data, function(d) { return d.frequency; })]);

      var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
               .outerTickSize(0);          // Turn off the marks at the end of the axis.
      var yAxis = d3.svg.axis().scale(yScale).orient("left")
               .ticks(12,"%")
               .outerTickSize(0);          // Turn off the marks at the end of the axis.

      g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      g.append("g")
        .attr("class", "y xis")
        .call(yAxis);

     // .append("text")
     // .attr("transform", "rotate(-90)")
     // .attr("y", 6)
     // .attr("dy", "0.71em")
     // .attr("text-anchor", "end")
     // .text("Frequency");

      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(d.letter); })
        .attr("y", function(d) { return yScale(d.frequency); })
        .attr("width", xScale.rangeBand())
        .attr("height", function(d) { return height - yScale(d.frequency); })
        .attr("fill", function(d) { return color(d.letter); });

    });

})

//data2.tsv
/*
letter  frequency
A .08167
B .01492
C .02782
D .04253
E .12702
F .02288
G .02015
H .06094
I .06966
J .00153
K .00772
L .04025
M .02406
N .06749
O .07507
P .01929
Q .00095
R .05987
S .06327
T .09056
U .02758
V .00978
W .02360
X .00150
Y .01974
Z .00074
*/

//horizotal bar 
$(function() { 

    var outerwidth = 960,  
        outerheight = 500, 
        margin = {top: 80, right: 180, bottom: 220, left: 260},  //220
        width = outerwidth - margin.right - margin.left,
        height = outerheight - margin.top - margin.bottom;

    var xColumn = "population";
    var yColumn = "name";
    var xpadding = 0.2;


      
    var svg = d3.select("body").append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom-80)

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   var xAxisG = g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")");

  var yAxisG = g.append("g")
        .attr("class", "y axis");

    
    var xScale = d3.scale.linear()
        .range([0,width]);

    var yScale = d3.scale.ordinal()
        .rangeBands([0, height],xpadding);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
        .ticks(6)                   // Use approximately 5 ticks marks.
        .tickFormat(d3.format("s")) // Use intelligent abbreviations, e.g. 5M for 5 Million
        .outerTickSize(0);          // Turn off the marks at the end of the axis.

    var yAxis = d3.svg.axis().scale(yScale).orient("left")
        .outerTickSize(0);          // Turn off the marks at the end of the axis.

    
    var type =function (d) {
      d.population = +d.population;
      return d;
     }

    d3.csv("geonames.csv",type,function(dataset) {    

      xScale.domain([0,d3.max(dataset,function(d) {return d[xColumn]})])
      yScale.domain(dataset.map(function(d) { return d[yColumn]}));

      xAxisG.call(xAxis);
      yAxisG.call(yAxis);

      g.selectAll("rect")
         .data(dataset)
         .enter().append("rect")
         .attr("x", 0)
         .attr("y", function(d){ return yScale(d[yColumn]);})
         .attr("width", function(d){ return xScale(d[xColumn]);})
         .attr("height", yScale.rangeBand())
         .attr("fill",function(d) { return color(d[yColumn])})

    }) //end of d3.csv

}) //end of (function)

/*
//geonames.csv
name,latitude,longitude,population
Shanghai,31.22222,121.45806,22315474
Buenos Aires,-34.61315,-58.37723,13076300
Mumbai,19.07283,72.88261,12691836
*/

//draw line using path and d3.svg.line()

$(function() {    

 var outerWidth = 960;
 var outerHeight = 500;
 var margin = { left: 100, top: 24, right: 80, bottom: 100 };

 var xColumn = "timestamp";
 var yColumn = "temperature";

 var xAxisLabelText = "Time";
 var xAxisLabelOffset = 48;

 var yAxisLabelText = "Temperature °C";
 var yAxisLabelOffset = 40;

 var innerWidth  = outerWidth  - margin.left - margin.right;
 var innerHeight = outerHeight - margin.top  - margin.bottom;

 var svg = d3.select("body").append("svg")
             .attr("width", outerWidth)
             .attr("height", outerHeight);

 var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 var xScale = d3.time.scale().range([0, innerWidth]);
 var yScale = d3.scale.linear().range([innerHeight, 0]);

 var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
                   .ticks(5)
                   .outerTickSize(0);

 var yAxis = d3.svg.axis().scale(yScale).orient("left")
                   .ticks(10)
                   .tickFormat(d3.format("s"))
                   .outerTickSize(0);

 var line = d3.svg.line()
                  .x(function(d) { return xScale(d[xColumn]); })
                  .y(function(d) { return yScale(d[yColumn]); });

 var path = g.append("path") 
             .attr("class", "chart-line");

 var xAxisG = g.append("g")
               .attr("class", "x axis")
               .attr("transform", "translate(0," + innerHeight + ")");

  var yAxisG = g.append("g")
                .attr("class", "y axis");
              
 var xAxisLabel = xAxisG.append("text")
                        .style("text-anchor", "middle")
                        .attr("transform", "translate(" + (innerWidth / 2) + "," + xAxisLabelOffset + ")")
                        .attr("class", "label")
                        .text(xAxisLabelText);

 var yAxisLabel = yAxisG.append("text")
                        .style("text-anchor", "middle")
                        .attr("transform", "translate(-" + yAxisLabelOffset + "," + (innerHeight / 2) + ") rotate(-90)")
                        .attr("class", "label")
                        .text(yAxisLabelText);

 var type = function(d) {
              d.timestamp = new Date(d.timestamp);
              d.temperature = +d.temperature;
              return d;
            }

 d3.csv("temperature.csv", type, function(data) {

  xScale.domain(d3.extent(data, function (d){ return d[xColumn]; }));
  yScale.domain(d3.extent(data, function (d){ return d[yColumn]; }));

  xAxisG.call(xAxis);
  yAxisG.call(yAxis);

  path.attr("d", line(data));

 });

}) //end of (function())

//temperature.csv
/*
timestamp,temperature
2015-03-20T21:00:00.000Z,23.9516625615764
2015-03-20T22:00:00.000Z,23.0728888291688
2015-03-20T23:00:00.000Z,22.2708190476318
2015-03-21T00:00:00.000Z,21.3394373423804
2015-03-21T01:00:00.000Z,20.1010743049325
2015-03-21T02:00:00.000Z,18.4150717551479
2015-03-21T03:00:00.000Z,17.7483817583905
2015-03-21T04:00:00.000Z,17.6589726749868
2015-03-21T05:00:00.000Z,17.0922334804965
2015-03-21T06:00:00.000Z,17.9022626474071
2015-03-21T07:00:00.000Z,17.9134315019288
2015-03-21T08:00:00.000Z,17.9623415917395
2015-03-21T09:00:00.000Z,18.6299049947767
2015-03-21T10:00:00.000Z,18.7246461115231
2015-03-21T11:00:00.000Z,18.3452032121395
2015-03-21T12:00:00.000Z,17.9509405148159
2015-03-21T13:00:00.000Z,17.6459367384257
2015-03-21T14:00:00.000Z,18.0026108196051
2015-03-21T15:00:00.000Z,18.6413944821435
2015-03-21T16:00:00.000Z,19.3671431509997
2015-03-21T17:00:00.000Z,20.8082012083461
2015-03-21T18:00:00.000Z,22.5238576663828
2015-03-21T19:00:00.000Z,24.4214051463704
2015-03-21T20:00:00.000Z,26.2049693716955
2015-03-21T21:00:00.000Z,26.579802484894
2015-03-21T22:00:00.000Z,26.5525094442272
2015-03-21T23:00:00.000Z,23.9758724990251
2015-03-22T00:00:00.000Z,20.7705334007582
2015-03-22T01:00:00.000Z,19.5826361563267
2015-03-22T02:00:00.000Z,18.7265399946616
2015-03-22T03:00:00.000Z,18.2886029132647
2015-03-22T04:00:00.000Z,17.4904771411586
2015-03-22T05:00:00.000Z,17.1831430954037
2015-03-22T06:00:00.000Z,17.2898856656444
2015-03-22T07:00:00.000Z,17.8578100360021
2015-03-22T08:00:00.000Z,18.1992192220978
2015-03-22T09:00:00.000Z,18.13420905954
2015-03-22T10:00:00.000Z,18.5888149684944
2015-03-22T11:00:00.000Z,18.6733003026984
2015-03-22T12:00:00.000Z,19.1600833190036
2015-03-22T13:00:00.000Z,19.207095797011
2015-03-22T14:00:00.000Z,18.9847082241235
2015-03-22T15:00:00.000Z,19.4293802064908
2015-03-22T16:00:00.000Z,20.8493124700409
2015-03-22T17:00:00.000Z,21.5898145184046
2015-03-22T18:00:00.000Z,22.3397182467298
2015-03-22T19:00:00.000Z,22.7891858876349
2015-03-22T20:00:00.000Z,23.3412628564144
2015-03-22T21:00:00.000Z,23.4926420057589
2015-03-22T22:00:00.000Z,23.0962283240861
2015-03-22T23:00:00.000Z,22.2667502918227
2015-03-23T00:00:00.000Z,21.0266142557277
2015-03-23T01:00:00.000Z,20.0093349857605
2015-03-23T02:00:00.000Z,18.9851414732381
2015-03-23T03:00:00.000Z,18.5245615004214
2015-03-23T04:00:00.000Z,18.290694254732
2015-03-23T05:00:00.000Z,18.0595508666643
2015-03-23T06:00:00.000Z,18.4732789951039
2015-03-23T07:00:00.000Z,18.7258481532495
2015-03-23T08:00:00.000Z,18.5595128641976
2015-03-23T09:00:00.000Z,18.179674037842
2015-03-23T10:00:00.000Z,17.7681299392415
2015-03-23T11:00:00.000Z,17.443021321053
2015-03-23T12:00:00.000Z,17.3451205175492
2015-03-23T13:00:00.000Z,17.4374701133724
2015-03-23T14:00:00.000Z,17.8929191631296
2015-03-23T15:00:00.000Z,18.9122039984753
2015-03-23T16:00:00.000Z,19.6161969984469
2015-03-23T17:00:00.000Z,20.7299868156002
2015-03-23T18:00:00.000Z,21.7689130719553
2015-03-23T19:00:00.000Z,22.5533898355016
2015-03-23T20:00:00.000Z,22.8372668296634
2015-03-23T21:00:00.000Z,23.2014773800322
2015-03-23T22:00:00.000Z,22.5682062882985
2015-03-23T23:00:00.000Z,22.3205675513796
2015-03-24T00:00:00.000Z,20.8661118605035
2015-03-24T01:00:00.000Z,18.5360183512352
2015-03-24T02:00:00.000Z,17.5156724451801
2015-03-24T03:00:00.000Z,17.2066897483676
2015-03-24T04:00:00.000Z,17.1974604599623
2015-03-24T05:00:00.000Z,17.3377835934013
2015-03-24T06:00:00.000Z,17.28662295757
2015-03-24T07:00:00.000Z,17.4291104924263
2015-03-24T08:00:00.000Z,17.4228793012653
2015-03-24T09:00:00.000Z,17.4209561166271
2015-03-24T10:00:00.000Z,17.141757829703
2015-03-24T11:00:00.000Z,17.3048584589793
2015-03-24T12:00:00.000Z,17.337482794781
2015-03-24T13:00:00.000Z,17.7016509341158
2015-03-24T14:00:00.000Z,17.5637528905341
2015-03-24T15:00:00.000Z,18.8276163388499
2015-03-24T16:00:00.000Z,19.4404648699534
2015-03-24T17:00:00.000Z,20.5646049670802
2015-03-24T18:00:00.000Z,21.9525507884113
2015-03-24T19:00:00.000Z,21.9040221846194
2015-03-24T20:00:00.000Z,22.8197541616282
2015-03-24T21:00:00.000Z,22.2390831913042
2015-03-24T22:00:00.000Z,22.4688244906963
2015-03-24T23:00:00.000Z,21.9461828791739
2015-03-25T00:00:00.000Z,21.3218883084538
2015-03-25T01:00:00.000Z,19.9688738415096
2015-03-25T02:00:00.000Z,18.9409031033049
2015-03-25T03:00:00.000Z,18.1829931467353
2015-03-25T04:00:00.000Z,17.6071132686007
2015-03-25T05:00:00.000Z,17.4155712472229
2015-03-25T06:00:00.000Z,17.8112238813252
2015-03-25T07:00:00.000Z,18.0118371454174
2015-03-25T08:00:00.000Z,17.9925110740977
2015-03-25T09:00:00.000Z,17.9146107460869
2015-03-25T10:00:00.000Z,17.6354297651737
2015-03-25T11:00:00.000Z,17.2990959392658
2015-03-25T12:00:00.000Z,16.8942534144482
2015-03-25T13:00:00.000Z,17.0215911252788
2015-03-25T14:00:00.000Z,17.5370547200027
2015-03-25T15:00:00.000Z,19.6239569219906
2015-03-25T16:00:00.000Z,21.4284862546897
2015-03-25T17:00:00.000Z,22.5971622932944
2015-03-25T18:00:00.000Z,24.4516364021043
2015-03-25T19:00:00.000Z,26.314179825294
2015-03-25T20:00:00.000Z,27.2966725797272
2015-03-25T21:00:00.000Z,27.8594008881709
2015-03-25T22:00:00.000Z,26.98771523591
2015-03-25T23:00:00.000Z,26.1419652896808
2015-03-26T00:00:00.000Z,24.2967135065912
2015-03-26T01:00:00.000Z,21.2627783997077
2015-03-26T02:00:00.000Z,19.6223366524463
2015-03-26T03:00:00.000Z,18.9702936572059
2015-03-26T04:00:00.000Z,18.64173108115
2015-03-26T05:00:00.000Z,18.5430028446263
2015-03-26T06:00:00.000Z,18.2597209484404
2015-03-26T07:00:00.000Z,17.8251835175158
2015-03-26T08:00:00.000Z,17.4726877440558
2015-03-26T09:00:00.000Z,17.651946077925
2015-03-26T10:00:00.000Z,17.7491791888976
2015-03-26T11:00:00.000Z,17.5917881825657
2015-03-26T12:00:00.000Z,17.5239416379086
2015-03-26T13:00:00.000Z,17.5307201091079
2015-03-26T14:00:00.000Z,18.2489964460844
2015-03-26T15:00:00.000Z,20.2797517883074
2015-03-26T16:00:00.000Z,21.888709612845
2015-03-26T17:00:00.000Z,23.8693783046019
2015-03-26T18:00:00.000Z,25.6434924437705
2015-03-26T19:00:00.000Z,27.3338701714523
2015-03-26T20:00:00.000Z,30.235307632747
2015-03-26T21:00:00.000Z,31.6784014189275
2015-03-26T22:00:00.000Z,32.4243323492878
2015-03-26T23:00:00.000Z,33.1688980688728
2015-03-27T00:00:00.000Z,30.8713221141196
2015-03-27T01:00:00.000Z,26.8944097638179
2015-03-27T02:00:00.000Z,24.6128150483182
2015-03-27T03:00:00.000Z,22.889746429207
2015-03-27T04:00:00.000Z,21.7148736202902
2015-03-27T05:00:00.000Z,20.8438711038614
2015-03-27T06:00:00.000Z,19.2559699722154
2015-03-27T07:00:00.000Z,18.337368653838
2015-03-27T08:00:00.000Z,17.6177708093268
2015-03-27T09:00:00.000Z,17.1977444392481
2015-03-27T10:00:00.000Z,16.7043132969425
2015-03-27T11:00:00.000Z,16.2471811295094
2015-03-27T12:00:00.000Z,16.087861898997
2015-03-27T13:00:00.000Z,15.6362635324538
2015-03-27T14:00:00.000Z,15.692528763157
2015-03-27T15:00:00.000Z,16.1186855064984
2015-03-27T16:00:00.000Z,17.3886258325874
2015-03-27T17:00:00.000Z,18.2540910121364
2015-03-27T18:00:00.000Z,19.5148327389508
2015-03-27T19:00:00.000Z,20.6023266315466
2015-03-27T20:00:00.000Z,21.3854066767194
2015-03-27T21:00:00.000Z,21.9084983994613
*/


//scatter plot chart
$(function(){

      var outerWidth = 960;
      var outerHeight = 500;
      var margin = { left: 100, top: 24, right: 80, bottom: 100 };
      var rMin = 1; // "r" stands for radius
      var rMax = 6;
      var xColumn = "sepal_length";
      var yColumn = "petal_length";
      var rColumn = "sepal_width";
      var colorColumn = "species";

      var xAxisLabelText = "Sepal Length (cm)";
      var xAxisLabelOffset = 48;

      var yAxisLabelText = "Petal Length (cm)";
      var yAxisLabelOffset = 30;

      var innerWidth  = outerWidth  - margin.left - margin.right;
      var innerHeight = outerHeight - margin.top  - margin.bottom;

      var svg = d3.select("body").append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight);

      var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var xScale = d3.scale.linear().range([0, innerWidth]);
      var yScale = d3.scale.linear().range([innerHeight, 0]);
      var rScale = d3.scale.linear().range([rMin, rMax]);
      var colorScale = d3.scale.category10();

      var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
                        .ticks(12)
                        .tickFormat(d3.format("s"))
                        .outerTickSize(0);
        
      var yAxis = d3.svg.axis().scale(yScale).orient("left")
                        .ticks(8)
                        .tickFormat(d3.format("s"))
                        .outerTickSize(0);
  

      var xAxisG = g.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + innerHeight + ")");

      var yAxisG = g.append("g")
                    .attr("class", "y axis");
              
      var xAxisLabel = xAxisG.append("text")
                             .style("text-anchor", "middle")
                             .attr("x", innerWidth / 2)
                             .attr("y", xAxisLabelOffset)
                             .attr("class", "label")
                             .text(xAxisLabelText);

      var yAxisLabel = yAxisG.append("text")
                             .style("text-anchor", "middle")
                             .attr("transform", "translate(-" + yAxisLabelOffset + "," + (innerHeight / 2) + ") rotate(-90)")
                             .attr("class", "label")
                             .text(yAxisLabelText);

      var type = function(d) {
        d.sepal_length = +d.sepal_length;
        d.sepal_width  = +d.sepal_width;
        d.petal_length = +d.petal_length;
        d.petal_width  = +d.petal_width;
        return d;
      }

      d3.csv("iris.csv", type, function(data) {

        xScale.domain(d3.extent(data, function (d){ return d[xColumn];}));
        yScale.domain(d3.extent(data, function (d){ return d[yColumn];}));
        rScale.domain(d3.extent(data, function (d){ return d[rColumn];}));

        xAxisG.call(xAxis);
        yAxisG.call(yAxis);

        var circles = g.selectAll("circle").data(data);

        circles.enter().append("circle");

        circles
          .attr("cx",      function (d){ return xScale(d[xColumn]);})
          .attr("cy",      function (d){ return yScale(d[yColumn]);})
          .attr("r",       function (d){ return rScale(d[rColumn]);})
          .attr("fill",    function (d){ return colorScale(d[colorColumn]); });

        circles.exit().remove();

      });


})

//iris.csv
/*
sepal_length,sepal_width,petal_length,petal_width,species
5.1,3.5,1.4,0.2,setosa
4.9,3.0,1.4,0.2,setosa
4.7,3.2,1.3,0.2,setosa
4.6,3.1,1.5,0.2,setosa
5.0,3.6,1.4,0.2,setosa
5.4,3.9,1.7,0.4,setosa
4.6,3.4,1.4,0.3,setosa
5.0,3.4,1.5,0.2,setosa
4.4,2.9,1.4,0.2,setosa
4.9,3.1,1.5,0.1,setosa
5.4,3.7,1.5,0.2,setosa
4.8,3.4,1.6,0.2,setosa
4.8,3.0,1.4,0.1,setosa
4.3,3.0,1.1,0.1,setosa
5.8,4.0,1.2,0.2,setosa
5.7,4.4,1.5,0.4,setosa
5.4,3.9,1.3,0.4,setosa
5.1,3.5,1.4,0.3,setosa
5.7,3.8,1.7,0.3,setosa
5.1,3.8,1.5,0.3,setosa
5.4,3.4,1.7,0.2,setosa
5.1,3.7,1.5,0.4,setosa
4.6,3.6,1.0,0.2,setosa
5.1,3.3,1.7,0.5,setosa
4.8,3.4,1.9,0.2,setosa
5.0,3.0,1.6,0.2,setosa
5.0,3.4,1.6,0.4,setosa
5.2,3.5,1.5,0.2,setosa
5.2,3.4,1.4,0.2,setosa
4.7,3.2,1.6,0.2,setosa
4.8,3.1,1.6,0.2,setosa
5.4,3.4,1.5,0.4,setosa
5.2,4.1,1.5,0.1,setosa
5.5,4.2,1.4,0.2,setosa
4.9,3.1,1.5,0.1,setosa
5.0,3.2,1.2,0.2,setosa
5.5,3.5,1.3,0.2,setosa
4.9,3.1,1.5,0.1,setosa
4.4,3.0,1.3,0.2,setosa
5.1,3.4,1.5,0.2,setosa
5.0,3.5,1.3,0.3,setosa
4.5,2.3,1.3,0.3,setosa
4.4,3.2,1.3,0.2,setosa
5.0,3.5,1.6,0.6,setosa
5.1,3.8,1.9,0.4,setosa
4.8,3.0,1.4,0.3,setosa
5.1,3.8,1.6,0.2,setosa
4.6,3.2,1.4,0.2,setosa
5.3,3.7,1.5,0.2,setosa
5.0,3.3,1.4,0.2,setosa
7.0,3.2,4.7,1.4,versicolor
6.4,3.2,4.5,1.5,versicolor
6.9,3.1,4.9,1.5,versicolor
5.5,2.3,4.0,1.3,versicolor
6.5,2.8,4.6,1.5,versicolor
5.7,2.8,4.5,1.3,versicolor
6.3,3.3,4.7,1.6,versicolor
4.9,2.4,3.3,1.0,versicolor
6.6,2.9,4.6,1.3,versicolor
5.2,2.7,3.9,1.4,versicolor
5.0,2.0,3.5,1.0,versicolor
5.9,3.0,4.2,1.5,versicolor
6.0,2.2,4.0,1.0,versicolor
6.1,2.9,4.7,1.4,versicolor
5.6,2.9,3.6,1.3,versicolor
6.7,3.1,4.4,1.4,versicolor
5.6,3.0,4.5,1.5,versicolor
5.8,2.7,4.1,1.0,versicolor
6.2,2.2,4.5,1.5,versicolor
5.6,2.5,3.9,1.1,versicolor
5.9,3.2,4.8,1.8,versicolor
6.1,2.8,4.0,1.3,versicolor
6.3,2.5,4.9,1.5,versicolor
6.1,2.8,4.7,1.2,versicolor
6.4,2.9,4.3,1.3,versicolor
6.6,3.0,4.4,1.4,versicolor
6.8,2.8,4.8,1.4,versicolor
6.7,3.0,5.0,1.7,versicolor
6.0,2.9,4.5,1.5,versicolor
5.7,2.6,3.5,1.0,versicolor
5.5,2.4,3.8,1.1,versicolor
5.5,2.4,3.7,1.0,versicolor
5.8,2.7,3.9,1.2,versicolor
6.0,2.7,5.1,1.6,versicolor
5.4,3.0,4.5,1.5,versicolor
6.0,3.4,4.5,1.6,versicolor
6.7,3.1,4.7,1.5,versicolor
6.3,2.3,4.4,1.3,versicolor
5.6,3.0,4.1,1.3,versicolor
5.5,2.5,4.0,1.3,versicolor
5.5,2.6,4.4,1.2,versicolor
6.1,3.0,4.6,1.4,versicolor
5.8,2.6,4.0,1.2,versicolor
5.0,2.3,3.3,1.0,versicolor
5.6,2.7,4.2,1.3,versicolor
5.7,3.0,4.2,1.2,versicolor
5.7,2.9,4.2,1.3,versicolor
6.2,2.9,4.3,1.3,versicolor
5.1,2.5,3.0,1.1,versicolor
5.7,2.8,4.1,1.3,versicolor
6.3,3.3,6.0,2.5,virginica
5.8,2.7,5.1,1.9,virginica
7.1,3.0,5.9,2.1,virginica
6.3,2.9,5.6,1.8,virginica
6.5,3.0,5.8,2.2,virginica
7.6,3.0,6.6,2.1,virginica
4.9,2.5,4.5,1.7,virginica
7.3,2.9,6.3,1.8,virginica
6.7,2.5,5.8,1.8,virginica
7.2,3.6,6.1,2.5,virginica
6.5,3.2,5.1,2.0,virginica
6.4,2.7,5.3,1.9,virginica
6.8,3.0,5.5,2.1,virginica
5.7,2.5,5.0,2.0,virginica
5.8,2.8,5.1,2.4,virginica
6.4,3.2,5.3,2.3,virginica
6.5,3.0,5.5,1.8,virginica
7.7,3.8,6.7,2.2,virginica
7.7,2.6,6.9,2.3,virginica
6.0,2.2,5.0,1.5,virginica
6.9,3.2,5.7,2.3,virginica
5.6,2.8,4.9,2.0,virginica
7.7,2.8,6.7,2.0,virginica
6.3,2.7,4.9,1.8,virginica
6.7,3.3,5.7,2.1,virginica
7.2,3.2,6.0,1.8,virginica
6.2,2.8,4.8,1.8,virginica
6.1,3.0,4.9,1.8,virginica
6.4,2.8,5.6,2.1,virginica
7.2,3.0,5.8,1.6,virginica
7.4,2.8,6.1,1.9,virginica
7.9,3.8,6.4,2.0,virginica
6.4,2.8,5.6,2.2,virginica
6.3,2.8,5.1,1.5,virginica
6.1,2.6,5.6,1.4,virginica
7.7,3.0,6.1,2.3,virginica
6.3,3.4,5.6,2.4,virginica
6.4,3.1,5.5,1.8,virginica
6.0,3.0,4.8,1.8,virginica
6.9,3.1,5.4,2.1,virginica
6.7,3.1,5.6,2.4,virginica
6.9,3.1,5.1,2.3,virginica
5.8,2.7,5.1,1.9,virginica
6.8,3.2,5.9,2.3,virginica
6.7,3.3,5.7,2.5,virginica
6.7,3.0,5.2,2.3,virginica
6.3,2.5,5.0,1.9,virginica
6.5,3.0,5.2,2.0,virginica
6.2,3.4,5.4,2.3,virginica
5.9,3.0,5.1,1.8,virginica
*/




//draw tree layout
$(function(){
      var outerwidth = 960 + 240,  //+900 -860 = 40
          outerheight = 500 + 200,  //+860 ideal for print
          margin = {top: 20, right: 280, bottom: 20, left: 280},
          width = outerwidth - margin.right - margin.left,
          height = outerheight - margin.top - margin.bottom,             
          treewidth = height ;
          treeheight = width ;


      var svg = d3.select("body").append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
             

      var tree = d3.layout.tree()
                    .size([treewidth, treeheight]);

      d3.json("testData.json",function(jsonArr){    //same as $.getJSON

        var data = makeTree(jsonArr, "0");
        //var data = makeTreex(jsonArr);


        var root = data[0];

// ************** Generate the tree diagram    *****************
        var nodes = tree.nodes(root); // create data nodes suitable for tree structure
        var links = tree.links(nodes); // create links to connect source(parent) and target(child) nodes

        var nodes = svg.selectAll(".node")
                     .data(nodes).enter()
                     .append("g")
                     .attr("class", "node")
                     .attr("transform", function(d){ return "translate(" + d.x + "," + d.y+ ")"; }); // ****vertical line 1/2****
                    //.attr("transform", function(d){ return "translate(" + d.y + "," + d.x + ")"; }); // flip x and y of nodes 1/2***

        var rect = nodes.append("rect")
                   .attr("width", 40)
                   .attr("height", 20);  

            nodes.append("text")          
                 //.attr("y", 20 / 2)    //rec height/2
                 .attr("y", rect.attr("height") / 2)    //rect height/2
                 .attr("dy", ".35em")
                 .attr("stroke", function(d) { return "none";})
                                 // .attr("stroke", function(d) { return d.idx ? "#FF00CC" : "none";})

                 .text(function(d) { return d.name; });
                                  //.text(function(d) { return d.idx || d.name; });

 

        var links =  svg.selectAll(".link")
                      .data(links);        //bind data

            links.enter().append("line")   //enter 
                      .attr("class", "link");

            links.attr('x1', function(d){return d.source.x+20})  //update
                 .attr('y1', function(d){return d.source.y+20})  //rect.height = 20
                 .attr('x2', function(d){return d.target.x+20})  //rect.width/2 = 20
                 .attr('y2', function(d){return d.target.y});

  });  //end of getJson

      
  function makeTree(arr,parent){
       let node = [];
       
       arr.filter(obj => obj.parent === parent)
       .forEach(obj => {       
             let children = makeTree(arr,obj.name);           
             if (children.length) obj["children"] = children;
             node.push(obj);   
          })
 
       return node;
      }


  function makeTreex(data) {
  
       let treeData = [];
       let dataMap = data.reduce((map, node) => {
       map[node.name] = node;
       return map;

       }, {});

       data.forEach((node,index) => {   
          let parent = dataMap[node.parent];

          if (parent) {
            (parent.children || (parent.children = []))
            .push(node)
          }
          else {
            treeData.push(node);
         }
    
       })

      return treeData;
   }


})

