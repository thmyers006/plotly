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
    bubblePlot();
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


function bubblePlot() {

        d3.json("samples.json").then(function(data) {

            /* var svg = d3.select("#bubble").append("svg").attr("width", 1000).attr("height", 600);
            var myColor = d3.scaleSequential().domain([1,10])
                    .interpolator(d3.interpolateViridis);
            svg.selectAll("#bubble").data(data)
                                    .enter()
                                    .append("circle")
                                    .attr("cx", function(d,i){return 30 + i*60})
                                    .attr("cy", 250).attr("r", 19)
                                    .attr("fill", function(d){return myColor(d) });
 */
        var bubbles = data.samples;

        var trace2 = {
            x : bubbles.otu_ids,
            y : bubbles.sample_values,
            type : "circle",
            mode : 'markers',
            marker : {
                size: bubbles.sample_values,
                color: bubbles.otu_ids
                },
            text: bubbles.otu_labels
                    }
                       
        var data3 = [trace2];
        
        var layout3 = {
            title: 'Bully Button Samples Bubble Chart',
            showlegend: false,
            //height: 600,
            //width: 1000
                    };
    

Plotly.newPlot('bubble', data3, layout3);
})};