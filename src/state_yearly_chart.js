import {fuelList} from './data';

export const stateYearlyChart = state => {
    const dataset = usEEG.filter( el => typeof el.description === 'number');
    const keyList = fuelList.map(fuel => state.concat(" : ", fuel));
    keyList.push(state.concat(" : other renewables"));
    // Width and height of SVG
    const w = 400;
    const h = 200;
    const colorScheme = ["#d9d9d9", "#bc80bd", "#bebada", "#ffed6f", "#fb8072", "#fdb462", "#80b1d3", "#8dd3c7", "#ffffb3", "#b3de69"];


    // Get length of dataset
    const arrayLength = dataset.length; // length of dataset
    const maxValue = d3.max(dataset, d => d[state.concat(" : all fuels (utility-scale)")])
    const x_axisLength = 400; // length of x-axis in our layout
    const y_axisLength = 200; // length of y-axis in our layout

    const yScale = d3.scaleLinear()
        .domain([0, maxValue])
        .range([0, y_axisLength]);

    const stack = d3.stack()
        .keys(keyList)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);

    //Create SVG element
    const svg = d3.select(".detail-chart-container")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    const groups = svg.selectAll("g.year")
        .data(stack(dataset))
        .enter().append("g")
        .attr("class", "year")
        .style("fill", (d, i) => { return colorScheme[i] });

    // Select and generate rectangle elements
    groups.selectAll("rect")
        .data(d => { return d.slice(0, arrayLength) })
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * x_axisLength / arrayLength)
        .attr("y", (d, i) => {
            debugger
            return h - yScale(d[1])
        })
        .attr("width", (x_axisLength / arrayLength) - 2)
        .attr("height", d => { return (d[1] - d[0]) > 0 ? yScale((d[1] - d[0])) : 0 });

    // Create y-axis
    // svg.append("line")
    //     .attr("x1", 30)
    //     .attr("y1", 75)
    //     .attr("x2", 30)
    //     .attr("y2", 175)
    //     .attr("stroke-width", 1)
    //     .attr("stroke", "black");

    // // Create x-axis
    // svg.append("line")
    //     .attr("x1", 30)
    //     .attr("y1", 175)
    //     .attr("x2", 130)
    //     .attr("y2", 175)
    //     .attr("stroke-width", 2)
    //     .attr("stroke", "black");

    // // Add a Label
    // // y-axis label
    // svg.append("text")
    //     .attr("class", "y label")
    //     .attr("text-anchor", "end")
    //     .text("No. of Rats")
    //     .attr("transform", "translate(20, 80) rotate(-90)");
}