const renderChart = (action, dataset) => {
    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeSet3);

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

    if(action == "create") {
        const svg = d3.select(".detail-chart-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "state-details-chart");

        var g = d3.select(".state-details-chart")
            .append("g")
            .attr("class", "state-details-chart-paths")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        displayPaths(g, root, arc, color);
    }
    else if(action == "update"){
        const g = d3.select(".state-details-chart-paths");
        g.selectAll("path")
            .data([])
            .exit()
            .remove();

        displayPaths(g, root, arc, color);
    }   
}

function displayPaths(g, root, arc, color){
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