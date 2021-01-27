// code to initalize the belly button biodiversity html page
function initialize() {
    var d_selector = d3.select("#selDataset");
    var data = d3.json("/static/js/samples.json");
    d3.json("/static/js/samples.json").then(data=>console.log(data));
    //console.log(data);

// Use D3 fetch to read the JSON file    
    d3.json("/static/js/samples.json").then((data) => {
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

//code to pass selected sample ID to all functions in the html webpage upon selection from dropdown window
function optionChanged(newSample){ 
    buildPanel(newSample); 
    updatePlotly(newSample);
    bubblePlot(newSample);
};

// function to create demographics panel showing demographics of selected sample ID
function buildPanel(sample) {
    var demo_panel = d3.select("#sample-metadata");
    var data = d3.json("/static/js/samples.json");
    panel = [];

    d3.json("/static/js/samples.json").then((data) => {
        var metadata = data.metadata;
        //console.log(metadata);
        var results = metadata.filter(sampleObject => sampleObject.id == sample);
        //console.log(results);
        var result = results[0];
        //console.log(result);
        demo_panel.html(""); // clears out anything that's there inside of the panel
        Object.entries(result).forEach(([key, value]) => {
            demo_panel.append("h6").text(`${key}: ${value}`);
        });       
    });
};  

//function to create horizontal bar chart using data from samples.json for the selected sample ID
function updatePlotly(newSample) {
    //console.log(newSample);

    //d3.json("/static/js/samples.json").then(data=>console.log(data));
    //code to create horizontal bar chart using data from selected sample ID
    d3.json("/static/js/samples.json").then(function(data) {
        var barSamples = data.samples;
        //console.log(barSamples);

        //bar results in a list
        var barResults = barSamples.filter(sampleObject => sampleObject.id == newSample);
        //console.log(barResults);

        //bar results outside of list - the actual object
        var barResult = barResults[0];
        //console.log(barResult);

        //bar samples, otu_ids and otu_labels -- sliced to first 10 only
        var slicedResult = barResult.sample_values.slice(0, 10);
        var slicedResult2 = barResult.otu_ids.slice(0, 10);
        var slicedResult3 = barResult.otu_labels.slice(0, 10);
               
        //bar labels
        otu_labels = barResult.otu_labels.slice(0, 10)
        //console.log(otu_labels)

        //bar ids
        otu_ids = barResult.otu_ids.slice(0, 10);
       
        var trace = {
            y : slicedResult2.map(otu_ids => `OTU ${otu_ids}`).reverse(),
            x : slicedResult.reverse(),
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

// code to create horizontal bar chart using plot.ly   
Plotly.newPlot("bar", data2, layout);
            })};

// function to create bubble chart using data from selected sample ID 
function bubblePlot(sample) {

        // Use D3 fetch to read the JSON file 
        d3.json("/static/js/samples.json").then(function(data) {
         
        // code to isolate selected sample ID data from the JSON file    
        var bubbles = data.samples;
        var bubbleResultArray = bubbles.filter(sampleObject => sampleObject.id == sample);
        var bubbleResult = bubbleResultArray[0];
            console.log(bubbleResult);

        //code to designate the x and y axes for the bubble chart    
        var trace2 = {
            x : bubbleResult.otu_ids,
            y : bubbleResult.sample_values,
            mode : 'markers',
            marker : {
                size: bubbleResult.sample_values,
                color: bubbleResult.otu_ids
                },
            text: bubbleResult.otu_labels
                    }
                       
        var data3 = [trace2];
        
        // code to format the layout of the bubble chart
        var layout3 = {
            title: 'Bully Button Samples Bubble Chart',
            showlegend: false,
            height: 800
                    };
    
// code to create bubble chart using selected sample from external JSON file
Plotly.newPlot('bubble', data3, layout3);
})};