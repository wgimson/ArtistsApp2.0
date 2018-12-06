
import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

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

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getKanyeMentions(this.createKanyeChart, this);
  }

  createChartBoilerplate() {

  }

  createChartForArtist(context) {

    //Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 1500 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

    // Parse the date / time
    //var parseDate = d3.timeFormat("%d-%b-%y").parse;

    // // // Set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // Define the axes
    var xAxis = d3.axisBottom(x)
      .ticks(5);

    var yAxis = d3.axisLeft(y)
      .ticks(15);

    // Define the line
    var valueline = d3.line()
        .curve(d3.curveMonotoneX)
        .x(function(d) {
          return x(d.date);
         })
        .y(function(d) {
          return y(d.mentions);
        });

        //d3.select("body").remove("svg");

    // // Adds the svg canvas
    var svg = d3.select("body")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");


    context.artistMentions.forEach(function(d) {
      //var parsetime = d3.timeParse("%d-%b-%y");
      d.date = new Date(d.date);
      d.mentions = +d.mentions;
    });

    // Scale the range of the data
    x.domain(d3.extent(context.kanyeMentions, function(d) { return d.date; }));
    y.domain([0, d3.max(context.kanyeMentions, function(d) { return d.mentions; })]);



    // Add the valueline path.
    svg.append("path")
        //.attr("class", "line")
        .attr("d", valueline(context.artistMentions))
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");

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

    // TEST
    // d3.select('p')
    // .style('background-color', 'red')
    // .style('height', '500px')
    // .style('width', '500px');
  }

  createKanyeChart(context) {

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
    var xAxis = d3.axisBottom(x)
      .ticks(5);

    var yAxis = d3.axisLeft(y)
      .ticks(15);

    // Define the line
    var valueline = d3.line()
        .curve(d3.curveMonotoneX)
        .x(function(d) {
          return x(d.date);
         })
        .y(function(d) {
          return y(d.mentions);
        });

        //d3.select("body").remove("svg");

    // // Adds the svg canvas
    var svg = d3.select("body")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");


    context.kanyeMentions.forEach(function(d) {
      //var parsetime = d3.timeParse("%d-%b-%y");
      d.date = new Date(d.date);
      d.mentions = +d.mentions;
    });

    // Scale the range of the data
    x.domain(d3.extent(context.kanyeMentions, function(d) { return d.date; }));
    y.domain([0, d3.max(context.kanyeMentions, function(d) { return d.mentions; })]);



    // Add the valueline path.
    svg.append("path")
        //.attr("class", "line")
        .attr("d", valueline(context.kanyeMentions))
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
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
          const temp = data['data'][0].timeseries.deltas;
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
        }
      );
  }

  onArtistInfo(artistInfo: any) {
    this.artistName = artistInfo.name;
    this.getArtistMentions(artistInfo.id, this.createChartForArtist, this);
  }

}
