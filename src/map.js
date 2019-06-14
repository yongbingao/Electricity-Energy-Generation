const renderMap = () => {
    const width = 800;
    const height = 500;
    let yearDataset;
    const temp = [];

    usEEG.forEach(el => {
        if (el.description === 2018) yearDataset = el;
    })

    const svg = d3.select(".main-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const g = svg.append("g")
        .attr("class", "us-map");

    const projection = d3.geoAlbersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);

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
        .attr("class", "us-states")
        .attr("d", path)
        .attr("fill", d => {
            temp.push(yearDataset[d.properties.NAME.concat(" : all fuels (utility-scale)")]);
            return color(yearDataset[d.properties.NAME.concat(" : all fuels (utility-scale)")]);
        })

    document.onmousemove = (event) => {
        document.getElementById("hover-tooltip").style.left = event.pageX + "px";
        document.getElementById("hover-tooltip").style.top = event.pageY - 35 + "px";
    }

    const paths = document.getElementsByClassName("us-states")

    document.getElementsByClassName("us-map")[0]
        .addEventListener("mouseover", e => {
            const name = e.target.__data__.properties.NAME;
            const fullMessage = name.concat(": ", Number(yearDataset[name.concat(" : all fuels (utility-scale)")]).toLocaleString(), " thousand megawatthours");
            const domEle = document.getElementById("hover-tooltip");
            domEle.innerHTML = fullMessage;
            domEle.style.opacity = 1;
        });

    document.getElementsByClassName("us-map")[0]
        .addEventListener("mouseleave", e => {
            document.getElementById("hover-tooltip").innerHTML = "";
            document.getElementById("hover-tooltip").style.opacity = 0;
        })
    console.log(temp);
}

export default renderMap;