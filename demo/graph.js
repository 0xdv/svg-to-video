import population from '@root/population'

async function drawGraph() {
    let margin = {top: 5, bottom: 30, left: 120, right: 5}
    let width = 800 - margin.left - margin.right
    let height = 300 - margin.top - margin.bottom
    let fullWidth = width + margin.left + margin.right
    let fullHeight = height + margin.top + margin.bottom

    let svg = d3.select('svg#graph')
                  .attr('width', fullWidth)
                  .attr('height', fullHeight)

    let background = svg.append("rect")
                        .attr("width", fullWidth)
                        .attr("height", fullHeight)
                        .attr("fill", "#fff");

    let graph = svg.append('g')
                  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                  .attr('width', width)
                  .attr('height', height)

    let data = await d3.csv('./us-population-1990-to-2016.csv', 
                            ({year, population}) => ({date:new Date(year,0,1), population: +population}))
    
    graph.datum(data)
        .call(population({
            width,
            height
        }))
}

drawGraph()