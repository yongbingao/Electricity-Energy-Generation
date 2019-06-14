import renderMap from './map';
import renderChart from "./detail_chart";
import organizeData from "./data";

document.addEventListener("DOMContentLoaded", () => {
    const fullDataset = organizeData();
    renderMap();
    renderChart(fullDataset[2018].Texas);
})