
import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  artistName: string;
  kanye: any;
  events: any;
  timeseries: any;
  allMetrics: any;
  twitterMetric: any;
  kanyeMentions = [];
  artistMentions = [];

  constructor(
    private apiService: ApiService,
    private spinnerService: Ng4LoadingSpinnerService
    ) {}

  ngOnInit() {
    this.artistName = 'Kanye West';
    this.getArtistMentions(356, this.createChartForArtist, this);
    //this.getKanyeMentions(this.createKanyeChart, this);
  }

  createChartForArtist(context) {

    context.artistMentions.forEach(function(d) {
      //var parsetime = d3.timeParse("%d-%b-%y");
      d.date = new Date(d.date);
      d.mentions = +d.mentions;
    });
         //Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 1500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // Parse the date / time
    //var parseDate = d3.timeFormat("%d-%b-%y").parse;

    // // // Set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // Scale the range of the data
    let fromDate = context.app_fromDate ? context.stringifyDate(context.app_fromDate) : '2017-01-01';
    let toDate = context.app_toDate ? context.stringifyDate(context.app_toDate) : '2017-12-31';
    x.domain(d3.extent(context.artistMentions, function(d) { return d.date; }));
    //chart.x.domain([new Date(fromDate), new Date(toDate)]);
    y.domain([0, d3.max(context.artistMentions, function(d) { return d.mentions; })]);

    // Define the axes
    var xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m"));
      //.ticks(5);

    var yAxis = d3.axisLeft(y);
      //.ticks(15);

    // Define the line
    var valueline = d3.line()
      .curve(d3.curveMonotoneX)
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.mentions);
      });

    // // Adds the svg canvas
    var svg = d3.select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr('class', 'svgComp')
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

              // Add the X Axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Add the Y Axis
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);


    // Add the valueline path.
    svg.append("path")
    //.attr("class", "line")
    .attr("d", valueline(context.artistMentions))
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
    .attr("fill", "none");

    svg.append("text")
      .attr("x", (width / 2))
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text(context.artistName);







    // TEST
    // d3.select('p')
    // .style('background-color', 'red')
    // .style('height', '500px')
    // .style('width', '500px');
  }

  createChartBoilerplate(context) {

    //Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 1500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // Parse the date / time
    //var parseDate = d3.timeFormat("%d-%b-%y").parse;

    // // // Set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // Define the axes
    var xAxis = d3.axisBottom(x);
      //.ticks(5);

    var yAxis = d3.axisLeft(y);
      //.ticks(15);

    // Define the line
    var valueline = d3.line()
      .curve(d3.curveMonotoneX)
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.mentions);
      });

    // // Adds the svg canvas
    var svg = d3.select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

              // Add the X Axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Add the Y Axis
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    svg.append("text")
      .attr("x", (width / 2))
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text(context.artistName);

    return {
      x: x,
      y: y,
      xAxis: xAxis,
      yAxis: yAxis,
      valueline: valueline,
      svg: svg
    };
  }

  createKanyeChart(context) {

    const chart = context.createChartBoilerplate(context);

    context.kanyeMentions.forEach(function(d) {
      //var parsetime = d3.timeParse("%d-%b-%y");
      d.date = new Date(d.date);
      d.mentions = +d.mentions;
    });

    // Scale the range of the data
    chart.x.domain(d3.extent(context.kanyeMentions, function(d) { return d.date; }));
    //chart.x.domain([new Date('2017-01-01'), new Date('2017-12-31')]);
    chart.y.domain([0, d3.max(context.kanyeMentions, function(d) { return d.mentions; })]);

    // Add the valueline path.
    chart.svg.append("path")
        //.attr("class", "line")
        .attr("d", chart.valueline(context.kanyeMentions))
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");

    // TEST
    // d3.select('p')
    // .style('background-color', 'red')
    // .style('height', '500px')
    // .style('width', '500px');
  }

  getArtistEvents(artistId, startDays, endDays) {
     this.apiService.getEvents(artistId, startDays, endDays)
        .subscribe(
          data => { this.events = data; console.log(this.events); },
          err => console.log(err),
          () => console.log('done loading event data')
        );
  }

  getArtistTimeSeries(id, metrics, startDate, endDate) {
      this.apiService.getTimeSeries(id, metrics, startDate, endDate)
      .subscribe(
        data => { this.timeseries = data; console.log(this.timeseries); },
        err => console.log(err),
        () => console.log('done loading timeseries data')
      );
  }

  getMetricIdByName(name) {
    this.apiService.getAllMetrics()
      .subscribe(
        data => { this.allMetrics = data; console.log(this.allMetrics); },
        err => console.log(err),
        () => {
          this.allMetrics.forEach((m) => {
            if (m) {
              console.log('hiI');
            }
          });
          console.log('done loading all metrics data');
        }
      );
  }

  getMetric(id) {
    this.apiService.getMetric(id)
      .subscribe(
        data => { this.twitterMetric = data; console.log(this.twitterMetric); },
        err => console.log(err),
        () => console.log('done loading twitter metric data')
      );
  }

  getKanyeMentions(callback, context) {
    this.apiService.getTimeSeries(356, [247], '2017-01-01', '2017-12-31')
      .subscribe(
        data => {
          const temp = data['data'][0].timeseries.deltas;
          for (const property in temp) {
            if (temp.hasOwnProperty(property)) {
                this.kanyeMentions.push({ date: property, mentions: temp[property] })
            }
          }
        },
        err => console.log(err),
        () => {
          callback(context);
        }
      );
  }

  getArtistMentions(artistId: number, callback, context) {
    this.artistMentions = [];
    this.apiService.getTimeSeries(artistId, [247], '2017-01-01', '2017-12-31')
      .subscribe(
        data => {
          const temp = (data['data'][0] ? data['data'][0].timeseries.deltas : []);
          for (const property in temp) {
            if (temp.hasOwnProperty(property)) {
                this.artistMentions.push({ date: property, mentions: temp[property] })
            }
          }
          console.log(this.artistMentions);
        },
        err => console.log(err),
        () => {
          callback(context);
          this.spinnerService.hide();
        }
      );
  }

  getArtistMentionsRange(artist: any, callback, context) {
    this.artistMentions = [];
    const tempFromDate = `${artist.app_fromDate.year}-${artist.app_fromDate.month}-${artist.app_fromDate.day}`;
    const tempToDate = `${artist.app_toDate.year}-${artist.app_toDate.month}-${artist.app_toDate.day}`;
    this.apiService.getTimeSeries(artist.id, [247], tempFromDate, tempToDate)
      .subscribe(
        data => {
          const temp = (data['data'][0] ? data['data'][0].timeseries.deltas : []);
          for (const property in temp) {
            if (temp.hasOwnProperty(property)) {
                this.artistMentions.push({ date: property, mentions: temp[property] })
            }
          }
          console.log(this.artistMentions);
        },
        err => console.log(err),
        () => {
          context.app_toDate = artist.app_toDate;
          context.app_fromDate = artist.app_fromDate;
          callback(context);
          this.spinnerService.hide();
        }
      );
  }

  onArtistInfo(artistInfo: any) {
    // this.spinnerService.show();
    if (artistInfo === undefined) {
      alert('sorry could not find artist');
      return;
    }

    this.artistName = artistInfo.name;
    //this.getArtistMentions(artistInfo.id, this.createChartForArtist, this);
    this.getArtistMentionsRange(artistInfo, this.createChartForArtist, this);
  }

  stringifyDate(date: any) {
    return (`${date.year}-${date.month}-${date.day}`);
  }

}
