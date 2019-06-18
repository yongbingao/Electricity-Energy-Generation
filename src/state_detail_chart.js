import {fuelList} from './data';
import {renderLegend} from "./legend";

// function addDetailChartContainerHeader() {
//     const detailChartContainerHeader = document.createElement("h2");
//     detailChartContainerHeader.setAttribute("id", "detail-chart-container-header");
//     detailChartContainerHeader.innerHTML = "State Generation Details";

//     const detailChartContainerHeaderUnit = document.createElement("h3");
//     detailChartContainerHeaderUnit.setAttribute("id", "detail-chart-container-header-unit");
//     detailChartContainerHeaderUnit.innerHTML = "(thousand megawatthours - 1,000 MWh)";

//     document.getElementsByClassName("detail-chart-container")[0].appendChild(detailChartContainerHeader);
//     document.getElementsByClassName("detail-chart-container")[0].appendChild(detailChartContainerHeaderUnit);
// }

const renderChart = (action, dataset) => {
    // addDetailChartContainerHeader();

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    const fullFuelList = fuelList.slice().push("other renewables");

    //d3 color scheme set 3
    const colorScheme = ["#d9d9d9", "#bc80bd", "#bebada", "#ffed6f", "#fb8072", "#fdb462", "#80b1d3", "#8dd3c7", "#ffffb3", "#b3de69"];
    const color = d3.scaleOrdinal()
                    .domain(fullFuelList)
                    .range(colorScheme);

    const x = d3.scaleLinear()
                .range([0, 2 * Math.PI]);

    const y = d3.scaleLinear()
                .range([0, radius]);

    const partition = d3.partition();

    const root = d3.hierarchy(dataset)
                   .sum(d => d.output);

    const arc = d3.arc()
                  .startAngle(d => {return Math.max(0, Math.min(2 * Math.PI, x(d.x0)))})
                  .endAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x1))))
                  .innerRadius(d => {return Math.max(0, y(d.y0))})
                  .outerRadius(d => Math.max(0, y(d.y1)))
                  .cornerRadius(4);

    document.getElementById("right-section-container-header").innerHTML = `${dataset.name} Generation Details`;

    if(action == "create") {
        const svg = d3.select(".detail-chart-container")
                      .append("svg")
                      .attr("width", width)
                      .attr("height", height)
                      .attr("class", "state-details-chart");

        const g = d3.select(".state-details-chart")
                    .append("g")
                    .attr("class", "state-details-chart-paths")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        displayPaths(g);
        renderLegend();
    }
    else if(action == "update"){
        const g = d3.select(".state-details-chart-paths");

        g.selectAll("path")
            .data([])
            .exit()
            .remove();

        displayPaths(g);
    }   

    function click(d) {
        d3.select(".state-details-chart-paths")
            .transition()
            .duration(750)
            .tween("scale", () => {
                const   xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                        yd = d3.interpolate(y.domain(), [d.y0, 1]),
                        yr = d3.interpolate(y.range(), [d.y0 ? 37.5 : 0, radius]);

                return t => {
                    x.domain(xd(t));
                    y.domain(yd(t)).range(yr(t));
                };
            })
            .selectAll("path")
            .attrTween("d", d => {
                return () => { 
                    return arc(d) 
                };
            })
    }

    function displayPaths(g) {
        g.selectAll("path")
            .data(partition(root).descendants())
            .enter()
            .append("path")
            .attr("d", arc)
            .style("stroke", "#ffffff")
            .style("fill", d => {
                if (d.depth === 0) return "#ffffff";
                
                while (d.depth > 1) {
                    d = d.parent;
                }
                
                return color(d.data.name);
            })
            .on("click", click)
            .append("title")
            .text(d => `${d.data.name}: ${d.value.toLocaleString()}`);
    }
}

export default renderChart;