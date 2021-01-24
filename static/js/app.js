function initialize() {
    var d_selector = d3.select("#selDataset");
    var data = d3.json("samples.json");
    console.log(data);

// Use D3 fetch to read the JSON file    
    d3.json("samples.json").then((data) => {
        var names = data.names;
        //this return a list of names = ['940', '941',....]
        //console.log(names);

        names.forEach((sample) => {
            d_selector.append("option")
                        .text(sample)
                        .property("value", sample);
        });
        let firstsample = names[0]; //user pick 940
        buildPanel(firstsample);

    }); 
}
initialize();
function optionChanged(newSample){ 
    buildPanel(newSample); 
    updatePlotly(newSample);
    //bubblePlot(newSample);
};

function buildPanel(sample) {
    var demo_panel = d3.select("#sample-metadata");
    var data = d3.json("samples.json");
    panel = [];

    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        //console.log(metadata);
        var results = metadata.filter(sampleObject => sampleObject.id == sample);
        //console.log(results);
        var result = results[0];
        console.log(result);
        demo_panel.html(""); // clears out anything that's there inside of the panel
        Object.entries(result).forEach(([key, value]) => {
            demo_panel.append("h6").text(`${key}: ${value}`);
        });       
    });
};  

function updatePlotly(newSample) {
    //console.log(newSample);
    //d3.json("/static/js/samples.json").then(data=>console.log(data));
    d3.json("samples.json").then(function(data) {
        var barSamples = data.samples;
        //console.log(barSamples);
        //bar results in a list
        var barResults = barSamples.filter(sampleObject => sampleObject.id == newSample);
        //console.log(barResults);

        //bar results outside of list - the actual object
        var barResult = barResults[0];
        console.log(barResult);

        //bar samples
        var slicedResult = barResult.sample_values.slice(0, 10);
        var slicedResult2 = barResult.otu_ids.slice(0, 10);
        var slicedResult3 = barResult.otu_labels.slice(0, 10);
        //console.log(slicedResult);
        var reversedResult = slicedResult.reverse()
        //console.log(reversedResult)
        //var reversed = reversedResult[0];
       
        //bar labels
        otu_labels = barResult.otu_labels.slice(0, 10)
        //console.log(otu_labels)

        //bar ids
        otu_ids = barResult.otu_ids.slice(0, 10);
       
        var trace = {
            //y : otu_ids,
            y : slicedResult2.map(otu_ids => `OTU ${otu_ids}`).reverse(),
            x : slicedResult,
            text: otu_labels,
            type: "bar", 
            orientation : "h"
        }

    var data2 = [trace];

    var layout = {
        title : "OTU Bar Chart",
        xaxis : {
             autorange: true,
        },
        showlegend: false

                };        
   
Plotly.newPlot("bar", data2, layout);
            })};


/* function bubblePlot(newSample) {

    d3.json("samples.json").then(function(data) {
        var trace2 = {
            x : reversedResult.otu_ids,
            y: reversedResult,
            mode: 'markers',
            marker: {
            size: reversedResult,
            }
        };
        
        var data3 = [trace1];
        
        var layout3 = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 600
        };
    });
Plotly.newPlot('bubble', data3, layout3);
}; */