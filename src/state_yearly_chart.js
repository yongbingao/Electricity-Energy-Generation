import {fuelList} from './data';

export const stateYearlyChart = (action, state) => {
    const dataset = usEEG.filter( el => typeof el.description === 'number');
    const keyList = fuelList.map(fuel => state.concat(" : ", fuel));
    keyList.push(state.concat(" : other renewables"));

    // Width and height of SVG
    const w = 450;
    const h = 225;
    const colorScheme = ["#d9d9d9", "#bc80bd", "#bebada", "#ffed6f", "#fb8072", "#fdb462", "#80b1d3", "#8dd3c7", "#ffffb3", "#b3de69"];


    // Get length of dataset
    const arrayLength = dataset.length; // length of dataset
    const maxValue = d3.max(dataset, d => d[state.concat(" : all fuels (utility-scale)")])
    const x_axisLength = 400; // length of x-axis in our layout
    const y_axisLength = 190; // length of y-axis in our layout

    const yScale = d3.scaleLinear()
                     .domain([0, maxValue])
                     .range([0, y_axisLength]);

    const stack = d3.stack()
                    .keys(keyList)
                    .order(d3.stackOrderNone)
                    .offset(d3.stackOffsetNone);
    
    if (action === "create"){
        const svg = d3.select(".detail-chart-container")
                      .append("svg")
                      .attr("class", "state-yearly-chart")
                      .attr("width", w)
                      .attr("height", h);

        const groups = svg.selectAll("g.year")
                          .data(stack(dataset))
                          .enter().append("g")
                          .attr("class", "year")
                          .style("fill", (d, i) => colorScheme[i] );
    
        drawAxis(svg);

        // Select and generate rectangle elements
        groups.selectAll("rect")
              .data(d => d.slice(0, arrayLength))
              .enter()
              .append("rect")
              .attr("x", (d, i) => i * x_axisLength / arrayLength + 50)
              .attr("width", (x_axisLength / arrayLength) - 2)
              .transition().duration(750)
              .attr("y", (d, i) => h - yScale(d[1]) - 35)
              .attr("height", d => (d[1] - d[0]) > 0 ? yScale((d[1] - d[0])) : 0 );

        const yearlyChart = Array.from(document.getElementsByClassName("year"));

        yearlyChart.forEach( el => {
            el.addEventListener("mouseover", e => {
                const key = e.currentTarget.__data__.key;
                const keyArr = key.split(" : ");
                const value = e.target.__data__.data[key];
                const totalVal = e.target.__data__.data[keyArr[0] + " : all fuels (utility-scale)"];
                const valPercent = (value/totalVal * 100).toFixed(2);
                const fullMessage = keyArr[1][0].toUpperCase().concat(keyArr[1].slice(1), "<br/>", (Math.round(value/1000)).toLocaleString(), " TWh", "<br/>", valPercent, "%");
                const domEle = document.getElementById("hover-tooltip");
                domEle.innerHTML = fullMessage;
                domEle.style.opacity = 1;
            })

            el.addEventListener("mouseleave", e => {
                document.getElementById("hover-tooltip").innerHTML = "";
                document.getElementById("hover-tooltip").style.opacity = 0;
            })
        })
    }

    if (action === "update") {
        const groups = d3.selectAll(".year")
                         .data(stack(dataset))
                         .style("fill", (d, i) => colorScheme[i]);

        groups.selectAll("rect")
              .data(d => d.slice(0, arrayLength))
              .attr("width", (x_axisLength / arrayLength) - 2)
              .attr("x", (d, i) => i * x_axisLength / arrayLength + 50)
              .transition().duration(750)
              .attr("y", (d, i) => h - yScale(d[1] ? d[1] : d[0]) - 35)
              .attr("height", d => (d[1] - d[0]) > 0 ? yScale((d[1] - d[0])) : 0);
        
        const yyScale = d3.scaleLinear()
                          .range([(h - 35), 0])
                          .domain([0, maxValue / 1000]);   
        const yAxis = d3.axisLeft(yyScale);      
        
        d3.select(".y-axis").call(yAxis.ticks(5));
    }

    function drawAxis(svg) {
        const xScale = d3.scaleLinear()
                         .range([50, w])
                         .domain([2000.5, 2018.5])
        const yyScale = d3.scaleLinear()
                          .range([(h-35), 0])
                          .domain([0, maxValue/1000]);
    
        const xAxis = d3.axisBottom(xScale).tickFormat( d => `${d}`);
        const yAxis = d3.axisLeft(yyScale);

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${y_axisLength})`)
            .call(xAxis.ticks(9));
    
        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", "translate(50, 0)")
            .call(yAxis.ticks(5));

        svg.append("text")
            .attr("class", "y-label")
            .attr("text-anchor", "end")
            .text("Energy Generation(TWh)")
            .attr("transform", "translate(0, 20) rotate(-90)");

        svg.append("text")
            .attr("class", "x-label")
            .attr("text-anchor", "start")
            .text("Year")
            .attr("transform", `translate(${w/2}, ${h})`);
    }
}