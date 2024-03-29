import renderChart from "./state_detail_chart";
import {stateYearlyChart} from "./state_yearly_chart";

function renderSlider() {
    const slider = document.createElement("div");
    slider.setAttribute("id", "slider-container");

    const sliderInput = document.createElement("input");
    sliderInput.setAttribute("id", "year-slider");
    sliderInput.setAttribute("type", "range");
    sliderInput.setAttribute("min", "2001");
    sliderInput.setAttribute("max", "2018");
    sliderInput.setAttribute("value", "2018");
    sliderInput.setAttribute("step", "1");

    const sliderLabel = document.createElement("span");
    sliderLabel.setAttribute("id", "slider-current-year");
    sliderLabel.innerHTML = 2018;
    
    slider.appendChild(sliderInput);
    slider.appendChild(sliderLabel);
    document.getElementsByClassName("us-map-container")[0].appendChild(slider);

    document.getElementById("slider-current-year").style.left = `calc( 100% - 12.5px - ${document.getElementById("slider-current-year").offsetWidth / 2}px)`;
}

function addUSMapHeader() {
    const usMapHeader = document.createElement("h2");
    usMapHeader.setAttribute("id", "us-map-header");
    usMapHeader.innerHTML = "State Net Electricity Generation (All fuels - utility scale)";
    document.getElementsByClassName("us-map-container")[0].appendChild(usMapHeader);
}

const renderMap = fullDataset => {
    // addUSMapHeader();

    const width = 720;
    const height = 450;
    let currentYearDataset;
    let currentYear = 2018;

    usEEG.forEach(el => {
        if (el.description === currentYear) currentYearDataset = el;
    })


    const svg = d3.select(".us-map-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "us-map");

    const g = svg.append("g")
        .attr("class", "us-states")

    const projection = d3.geoAlbersUsa()
        .scale(975)
        .translate([width / 2, height / 2 - 3]);

    const path = d3.geoPath()
        .projection(projection); 

    // const color = d3.scaleThreshold()
    //     .domain([50000, 100000, 150000, 200000, 250000, 450000])
    //     .range(["#add8e6", "#7da2cf", "#4361b3", "#283ea3", "#0b1291", "#000000"])

    const color = d3.scaleLog()
        .domain([1000, 10000, 100000, 1000000])
        .range(d3.schemeBlues[4]);

    g.selectAll("path")
        .data(topojson.feature(usStates5mTopo, usStates5mTopo.objects.cb_2018_us_state_5m).features)
        .enter()
        .append("path")
        .attr("class", "us-state")
        .attr("d", path)
        .attr("fill", d => {
            return color(currentYearDataset[d.properties.NAME.concat(" : all fuels (utility-scale)")]);
        })

    renderSlider();
    const usMap = document.getElementsByClassName("us-states")[0];

    document.onmousemove = (event) => {
        document.getElementById("hover-tooltip").style.left = event.pageX + 10 + "px";
        document.getElementById("hover-tooltip").style.top = event.pageY - 35 + "px";
    }

    document.getElementById("us-map-header").addEventListener("mouseover", e =>{
        const domEle = document.getElementById("hover-tooltip");
    domEle.innerHTML = `Utility scale refers to facilities<br/>
                        that have a total generation capacity <br/>
                        of one megawatt or greater.`;
        domEle.style.opacity = 1;
    })

    document.getElementById("us-map-header").addEventListener("mouseleave", e => {
        document.getElementById("hover-tooltip").innerHTML = "";
        document.getElementById("hover-tooltip").style.opacity = 0;
    })

    usMap.addEventListener("mouseover", e => {
        const name = e.target.__data__.properties.NAME;
        const fullMessage = name.concat(": ", Number(currentYearDataset[name.concat(" : all fuels (utility-scale)")]).toLocaleString(), " gigawatthours (GWh)");
        const domEle = document.getElementById("hover-tooltip");
        domEle.innerHTML = fullMessage;
        domEle.style.opacity = 1;
    });

    usMap.addEventListener("mouseleave", e => {
        document.getElementById("hover-tooltip").innerHTML = "";
        document.getElementById("hover-tooltip").style.opacity = 0;
    })
    
    usMap.addEventListener("click", e => {
        const name = e.target.__data__.properties.NAME;
        const usDataButton = document.getElementById("us-data");
        
        renderChart("update", fullDataset[currentYear][name]);
        stateYearlyChart("update", name);

        usDataButton.style.opacity = 1;
        usDataButton.style.visibility = "visible";
    })

    document.getElementById("us-data").addEventListener("click", e => {
        const usDataButton = document.getElementById("us-data");

        renderChart("update", fullDataset[currentYear]["United States"]);
        stateYearlyChart("update", "United States");
        usDataButton.style.opacity = 0;
        usDataButton.style.visibility = "hidden";
    })

    document.getElementById("year-slider")
            .addEventListener("input", e => {
                const sliderLabel = document.getElementById("slider-current-year");
                currentYear = Number(e.target.value);
                
                usEEG.forEach(el => { if(el.description === currentYear) currentYearDataset = el;});
                sliderLabel.innerHTML = currentYear;
                sliderLabel.style.left = `calc(${(currentYear - 2001) * 100 / 18}% + 12.5px - ${sliderLabel.offsetWidth / 2}px)`;
                
                d3.selectAll(".us-state")
                    .attr("fill", d => {
                        return color(currentYearDataset[d.properties.NAME.concat(" : all fuels (utility-scale)")])
                    })
            });
}

export default renderMap;