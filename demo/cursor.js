export default function(config) {
    let {
        color = 'red',
        top = 0,
        bottom = 200,
        position = 0,
        vertical = false
    } = config

    let n1, n2, m1, m2

    if (vertical) {
        n1 = 'x1'
        n2 = 'x2'

        m1 = 'y1'
        m2 = 'y2'
    } else {
        n1 = 'y1'
        n2 = 'y2'

        m1 = 'x1'
        m2 = 'x2'
    }
    
    let line = null

    function chart(selection) {
        line = selection.append('line')
            .attr(n1, position)
            .attr(m1, top)
            .attr(n2, position)
            .attr(m2, bottom)
            .attr('stroke', color)
    }

    chart.color = function(value) {
        if (!arguments.length) return color

        color = value
        line.attr('stroke', color)

        return chart
    }

    chart.position = function(value) {
        if (!arguments.length) return position

        position = value

        line
            .attr(n1, position)
            .attr(n2, position)

        return chart
    }

    return chart
}