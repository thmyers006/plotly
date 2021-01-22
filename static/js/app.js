function initialize() {
    var d_selector = d3.select("#selDataset");
    var data = d3.json("samples.json");
    console.log(data);

// Use D3 fetch to read the JSON file    
    d3.json("samples.json").then((data) => {
        var names = data.names;
        //console.log(names);

        names.forEach((sample) => {
            d_selector.append("option")
                        .text(sample)
                        .property("value", sample);
        });
    }); 
}
initialize();

function unpack(rows, index) {
    return rows.map(function(row) {
        return row[index];
    });
}; 

/* d3.select("#selDataset").on("change", updateDemo);
                        function getID() {

                        var id_dropdown = [];
                        var ID_drop = []

                        d3.json("samples.json").then(function(data) {
                            // Use D3 to select the ID dropdown
                            //for (var i = 0; i < 153; i++) {
                                // var id_dropdown = d3.select("#selDataset");
                                var ID_drop = unpack(belly_data.names, [i]);
                                //console.log(ID_drop);

                            });
                        }; */

                        // getID();


/* d3.json("samples.json", function(data) {

                    // create the drop down menu of cities
                    var selector = d3.select("body")
                        .append("select")
                        .attr("id", "selDataset")
                        .selectAll("option")
                        .data(belly_data)
                        .enter().append("option")
                        .text(function(d) { return d.names; })
                        .attr("value", function (d, i) {
                            return i;
                        });

                    // generate a random index value and set the selector to the city
                    // at that index value in the data array
                    var index = Math.round(Math.random() * data.length);
                    d3.select("#selDataset").property("optionChanged", index);

                    // append a paragraph tag to the body that shows the city name and it's population
                    d3.select("body")
                                .append("p")
                                .data(data)
                                .text(function(d){ 
                                    return data[index]['city'] + " - population " + comma(data[index]['population']); 
                                });

                    // when the user selects a city, set the value of the index variable
                    // and call the updatePlotly(); function
                    d3.select("#selDataset")
                    .on("change", function(d) {
                        index = this.value;
                        updateDemo();
                    });
                });  */

function updateDemo() {
    // select dropdown element
    // Use D3 to select the Demographics panel
    var data = d3.json("samples.json"); // not sure why data on line 94 was not defined but copying line from 2nd line in code
    var DemoPanel = d3.select("panel-body");
    var id_dropdown = d3.select("#selDataset");
        //console.log(id_dropdown);
    id_dropdown.on("change", function() {
        // get the value property of the input
        var value = id_dropdown.property("value");
            //console.log(value);
        // use filter function to sort data down by ID selected
        var filteredID = data.filter(names => names.names === value);
            //console.log(filteredID); 
        filteredID.forEach(function(filteredID){
            console.log(filteredID);
            var row = DemoPanel.append("tr");
            Object.entries(filteredID.forEach(function([key, value]){
                console.log(key, value);
                //Append a cell to the row for each value in the filteredID object
                var cell = row.append("td");
                cell.text(value);
            }));
        }); 
    });
};

/* function updatePlotly() {
    d3.json("samples.json").then(function(data) {

    var trace = {
        sliced : filteredID(0, 10),
        y: sample_values,
        labels : otu_ids,
        text: otu_labels,
        name: "Belly Button Biodiversity",
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

        });
updatePlotly();
    
Plotly.newPlot("bar", data2, layout);
}; */
