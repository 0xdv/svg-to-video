import legend from '@root/legend.js'
import cursor from '@root/cursor.js'

export default config => selection => {
    let {
        width,
        height,

    } = config

    let graph = selection

    let data = selection.data()[0]

    let xScale = d3.scaleTime()
                    .domain([d3.min(data.map(d => d.date)), d3.max(data.map(d => d.date))])
                    .range([0, width])

    let yScale = d3.scaleLinear()
                    .domain([
                        0,
                        d3.max(data.map(d => d.population))
                    ])
                    .range([height, 0])

    graph
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.date))
        .attr('y', d => yScale(d.population))
        .attr('width', 3)
        .attr('height', d => height-yScale(d.population)-30)
        .attr('fill', '#ccc')
        .on('mouseover', d => {
            //console.log(d)
            legendChart
                .year(d.date)
                .population(d.population)

            let x = xScale(d.date)
            let y = yScale(d.population)
            drawVerticalCursor.position(x)
            drawHorizontalCursor.position(y)
        })

        let ax = d3.axisBottom()
                    .scale(xScale)
                    .tickFormat(d3.timeFormat('%Y'))

        let ay = d3.axisLeft()
                    .scale(yScale)

        graph.append('g')
            .attr('transform', `translate(0,${height-25})`)
            .call(ax)

        graph.append('g')
            .attr('transform', `translate(-5,0)`)
            .call(ay)

        let legendChart = legend()

        let l = graph.append('g')
                .attr('transform', `translate(100,100)`)
                .call(legendChart)

        legendChart
            .year(d3.min(data.map(d => d.date)))
            .population(d3.min(data.map(d => d.population)))

        let drawVerticalCursor = cursor({
            top: 0,
            bottom: height-10,
            color: 'green',
            vertical: true
        })

        graph.append('g')
            .call(drawVerticalCursor)


        let drawHorizontalCursor = cursor({
            top: -20,
            bottom: width,
            color: 'red',
        })

        graph.append('g')
            .call(drawHorizontalCursor)
    
}