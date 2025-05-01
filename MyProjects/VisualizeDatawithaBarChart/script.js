

const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

Promise.all([d3.json(url)])
    .then(data => ready(data[0].data))
    .catch(err => console.log(err));



function ready(dataset) {
    const w = 900;
    const h = 460;
    const m = 60;
    const maxV = d3.max(dataset, (d) => d[1]);
    const cY = maxV / 400;
    const cX = 800 / 275;
    const cI = 800 / 279;
    const maxX = d3.max(dataset, (d) => d[0].slice(0, 4));
    const minX = d3.min(dataset, (d) => d[0].slice(0, 4));

    const svg = d3.select('#data')
        .append('svg')
        .attr('id', "graf").attr("width", w).attr("height", h);


    const xScale = d3.scaleTime().domain([new Date(d3.min(dataset, (d) => d[0])), new Date(d3.max(dataset, (d) => d[0]))]).rangeRound([0, w - m - 52]);



    const xAxis = d3.axisBottom(xScale);

    const yScale = d3.scaleLinear().domain([0, Number(maxV)]).range([h - m, 0]);


    const yAxis = d3.axisLeft(yScale);

    svg.append("g").attr('id', 'x-axis').attr('transform', `translate(60,${h - m})`).call(xAxis);

    svg.append("g").attr('id', 'y-axis').attr('transform', `translate(${m},0)`).call(yAxis);




    svg.selectAll("rect").data(dataset).enter().append('rect').attr('data-date', d => d[0]).attr("data-gdp", d => d[1]).attr("x", (d, i) => 60 + i * cI).attr("y", d => h - m - d[1] / cY).attr("width", cX).attr("height", d => d[1] / cY).attr("class", "bar").attr('fill', 'blue').attr('date', d => d[0]);






    const tooltip = d3.select('#main').append('div').attr('id', 'tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style('width', '150px')
        .style('height', '100px')
        .style('opacity', '0px');

    d3.select('#data').selectAll('rect')
        .on('mouseover', (event, d) => {
            tooltip.html('')
                .attr('data-date', d[0])
                .style('visibility', 'visible')
                .style('top', event.pageY + 'px')
                .style("left", (event.pageX) + "px");
            tooltip.append('h4').text(`${d[0].slice(0, 7)}`)
            tooltip.append('h4').text(`$${d[1]} Billion`);

        })
        .on('mouseout', () => { tooltip.style('visibility', 'hidden') })
}