export default function() {
    let format = d3.format(",d")
    let population, year
    let textPop = null
    let textYear = null

    function chart(selection) {
        let box = selection.append('text')
                    .style('font-family', 'Verdana')
                    .style('text-anchor', 'end')

        box.append('tspan')
            .text('Population:')

        textPop = box.append('tspan')
            .attr('x', '7em')
            .style('font-family', 'Courier New')

        box.append('tspan')
            .attr('dy', '1.2em')
            .attr('x', 0)
            .text('Year:')

        textYear = box.append('tspan')
            .attr('x', '7em')
            .style('font-family', 'Courier New')
    }

    chart.population = function(value) {
        if (!arguments.length) return text
        if (!textPop) return

        textPop
            .transition()
            .duration(700)
            .tween("text", function() {
                var that = d3.select(this),
                    i = d3.interpolateNumber([that.text().replace(/,/g, "")], value);
                return t => that.text(format(i(t)))
            })

        return chart
    }

    chart.year = function(value) {
        if (!arguments.length) return text
        if (!textYear) return

        textYear
            .transition()
            .duration(700)
            .tween("text", function() {
                var that = d3.select(this),
                    i = d3.interpolateNumber([that.text().replace(/,/g, "")], value.getFullYear());
                return t => that.text(Math.floor(i(t)))
            })
        return chart
    }

    return chart
}