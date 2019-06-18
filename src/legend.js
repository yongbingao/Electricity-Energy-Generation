import {fuelList} from "./data";

export const renderLegend = () => {
    const colorScheme = ["#d9d9d9", "#bc80bd", "#bebada", "#ffed6f", "#fb8072", "#fdb462", "#80b1d3", "#8dd3c7", "#ffffb3", "#b3de69"];
    const keyList = fuelList.slice();
    keyList.push("other renewables");

    const legendContainer = d3.select(".charts-container").append("svg").attr("class", "legend-container")

    const legend = legendContainer.selectAll(".legend")
        .data(colorScheme)
        .enter().append("rect")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return `translate(0, ${i*30})`; })
        .attr("x", 10)
        .attr("y", (d, i) => i * 10)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d, i) { return colorScheme[i]; });
    
    const unorderList = document.createElement('ul');
    unorderList.setAttribute("class", "legend-list")
    keyList.forEach( el => {
        const listItem = document.createElement("li");
        listItem.innerHTML = el[0].toUpperCase() + el.slice(1);
        unorderList.appendChild(listItem);
    })

    document.getElementsByClassName("charts-container")[0].append(unorderList);
}