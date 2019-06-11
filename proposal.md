## Overview

This project is a data visualization of energy generation in the US in 2018. The data will be organized by state and type of energy source. 

It will contain a map of the US which shows the total energy generated (thousand megawatthours) for each state. A more detailed breakdown of the energy generated will show up on the side when hovering over a specific state. 

## Functionality

- display US states with energy generation
- display energy generation details when hovering 

## Wireframes

It will be a single page app mainly consists of two charts, a map and pie chart each showing different energy statistics. Each chart will have a title/labels that reflects the data being presented. The map will have different shades according to the percentage of total energy generated in the US. The details chart on the side will utilize different colors for different types of energy sources.

![wireframe](https://github.com/yongbingao/JSproject/blob/master/Wireframe.png)

### Technologies employed

- Vanilla JavaScript to organize data
- d3.js for rendering US map and detailed content
- EIA website/api for data on energy generation
- Webpack to bundle various scripts 

### Main files

- main.js: handles retrieving and determining what data to display
- map.js: chart for rendering US map
- details.js: breakdown chart for specific state

## MVPs

- render a US map separated by state boundaries
- show total energy generation for each state on map
- show breakdown of energy generation when hovering over a state

## Development timeline

### Day 1

- research and compile data for all states/energy source
- learn to create US map on d3.js

### Day 2

- learn to display detail breakdown of data with a pie chart

### Day 3

- incorporate energy data on map chart
- incorporate energy breakdown data on pie chart
- link displaying pie chart on hover over a state

### Day 4

- add styling to charts
- add different colors to pie chart according to energy source
- add color gradient to map chart according to percentage of total US energy generation