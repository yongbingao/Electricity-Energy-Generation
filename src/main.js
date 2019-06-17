import renderMap from './map';
import renderChart from "./state_detail_chart";
import {organizeData} from "./data";
import {stateYearlyChart} from "./state_yearly_chart";

document.addEventListener("DOMContentLoaded", () => {
    const fullDataset = organizeData();
    renderMap(fullDataset);
    renderChart("create", fullDataset[2018]["United States"]);
    stateYearlyChart("create", "United States");
})