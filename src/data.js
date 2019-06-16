export const fuelList = [
    "coal", 
    "petroleum liquids", 
    "petroleum coke",
    "natural gas",
    "other gases",
    "nuclear",
    "conventional hydroelectric",
    "hydro-electric pumped storage",
    "other"
]

export const organizeData = () => {
    const fullDataset = {};
    const renewableList = [
        "wind",
        "geothermal",
    ];
    const utilityScaleSolarList = [
        "utility-scale photovoltaic",
        "utility-scale thermal",
    ];
    const biomassList = [
        "wood and wood-derived fuels",
        "other biomass",
    ];
    const stateList = [];

    Object.keys(usEEG[0]).forEach(key => {
        const keyArr = key.split(" : ");
        if (keyArr.length > 1 && !stateList.includes(keyArr[0])) {
            stateList.push(keyArr[0]);
        }
    })

    usEEG.forEach(yearObj => {
        const description = yearObj.description;

        if(typeof description == "number"){
            const cleanYearObj = {};

            stateList.forEach(state => {
                const stateObj = {
                    "name": state, 
                    "children": [],
                };
                const biomassObj = {
                    "name": "biomass",
                    "children": [],
                };
                const utilitySolarObj = {
                    "name": "all utility-scale solar",
                    "children": [],
                };
                const renewableObj = {
                    "name": "other renewables",
                    "children": [],
                };

                biomassList.forEach(el => {
                    const biomassSourceObj = {
                        "name": el,
                        "output": yearObj[state.concat(" : ", el)],
                    }
                    biomassObj["children"].push(biomassSourceObj);
                })

                utilityScaleSolarList.forEach(el => {
                    const utilitySolarSourceObj = {
                        "name": el,
                        "output": yearObj[state.concat(" : ", el)],
                    }
                    utilitySolarObj["children"].push(utilitySolarSourceObj);
                })

                renewableList.forEach(el => {
                    const renewableSourceObj = {
                        "name": el,
                        "output": yearObj[state.concat(" : ", el)]
                    }
                    renewableObj["children"].push(renewableSourceObj);
                })
                
                fuelList.forEach(fuel => {
                    const fuelObj = {
                        "name": fuel,
                        "output": yearObj[state.concat(" : ", fuel)],
                    }
                    stateObj["children"].push(fuelObj);
                })

                renewableObj["children"].push(utilitySolarObj, biomassObj);
                stateObj["children"].push(renewableObj);
                cleanYearObj[state] = stateObj;
            })
            fullDataset[description] = cleanYearObj;
        }
    })
    return fullDataset;
}

// export default organizeData;