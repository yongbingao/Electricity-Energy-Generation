const renderChart = (dataset) => {
    // debugger
    // var nodeData = {
    //     "name": "TOPICS", "children": [{
    //         "name": "Topic A",
    //         "children": [{ "name": "Sub A1", "size": 5 }, { "name": "Sub A2", "size": 7 }]
    //     }, {
    //         "name": "Topic B",
    //         "children": [{ "name": "Sub B1", "size": 3 }, { "name": "Sub B2", "size": 9 }, {
    //             "name": "Sub B3", "size": 3
    //         }]
    //     }, {
    //         "name": "Topic C",
    //         "children": [{ "name": "Sub A1", "size": 4 }, { "name": "Sub A2", "size": 2 }]
    //     }]
    // };

    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeSet3);
    
    const svg = d3.select(".main-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "state-sunburst-chart");

    var g = d3.select(".state-sunburst-chart")
        .append("g")
        .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

    var partition = d3.partition()
        .size([2 * Math.PI, radius]);

    var root = d3.hierarchy(dataset)
        .sum(d => d.output);

    partition(root);
    var arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .innerRadius(d => d.y0)
        .outerRadius(d => d.y1);

    g.selectAll("path")
        .data(root.descendants())
        .enter()
        .append("path")
        .attr("display", d => d.depth ? null : "none")
        .attr("d", arc)
        .style("stroke", "#fff")
        .style("fill", d => { 
            while (d.depth > 1) {
                d = d.parent; 
            }
            return color(d.data.name); 
        });
}

export default renderChart;