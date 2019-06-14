import renderMap from './map';
import renderChart from "./detail_chart";
import organizeData from "./data";

document.addEventListener("DOMContentLoaded", () => {
    const fullDataset = organizeData();
    renderMap(fullDataset);
    renderChart("create", fullDataset[2018]["United States"]);
})