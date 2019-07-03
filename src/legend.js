import {fuelList} from "./data";

export const renderLegend = () => {
    //create legend for us map chart
    const usMap = document.getElementsByClassName("us-map-container")[0];
    const mapLegend = document.createElement("div");
    const mapLegendColor = document.createElement("div");
    const mapLegendScale = document.createElement("ul");
    const mapLegendScaleUnit = document.createElement("span");

    mapLegend.setAttribute("class", "map-legend-container");
    mapLegend.innerHTML = "Legend";
    mapLegendColor.setAttribute("class", "map-legend-color");
    mapLegendScale.setAttribute("class", "map-legend-scale");
    mapLegendScaleUnit.setAttribute("class", "map-legend-scale-unit");
    mapLegendScaleUnit.innerHTML = "terawatthour (TWh) <br/>(1 TWh = 1000 GWh)";

    mapLegend.appendChild(mapLegendColor);
    mapLegend.appendChild(mapLegendScale);
    mapLegend.appendChild(mapLegendScaleUnit);
    usMap.appendChild(mapLegend);

    for(let i = 1; i < 10000; i*=10){
        const newListItem = document.createElement("li");
        newListItem.innerHTML = i;
        document.getElementsByClassName("map-legend-scale")[0].appendChild(newListItem);
    }

    //create legend for detail charts
    const colorScheme = ["#d9d9d9", "#bc80bd", "#bebada", "#ffed6f", "#fb8072", "#fdb462", "#80b1d3", "#8dd3c7", "#ffffb3", "#b3de69"];
    const keyList = fuelList.slice();
    keyList.push("other renewables");
    
    const unorderList = document.createElement('ul');
    unorderList.setAttribute("class", "legend-list")
    keyList.forEach((el, idx) => {
        const listItem = document.createElement("li");
        const listColor = document.createElement("div");
        const listLabel = document.createElement("span");

        listColor.setAttribute("style", `background-color: ${colorScheme[idx]}`);
        listLabel.innerHTML = el[0].toUpperCase() + el.slice(1);

        listItem.appendChild(listColor);
        listItem.appendChild(listLabel);
        unorderList.appendChild(listItem);
    })

    document.getElementsByClassName("charts-container")[0].append(unorderList);
}