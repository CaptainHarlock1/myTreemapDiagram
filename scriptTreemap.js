//--Fetching the movie dataset
let url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

//--

//--datasets
let movieData;
//--

//--canva's dimensions
let width = 1500;
let height = 500;

//--

//--setting canvas and tooltip d3 selection
let canvas = d3.select("#canvas")
let tooltip = d3.select("#tooltip")

canvas.attr("width", width)
canvas.attr("height", height)
//--


//--the function that actually draws the .
let drawTreeMap = () => {

        
    let hierarchy = d3.hierarchy(movieData, node => {
        return node.children
        })
        .sum( node => node.value)
        .sort((node1, node2) => {
            return (node2.value - node1.value)
        });
               
   
    let createTreeMap = d3.treemap()
                          .size([width, height])
                          
         
    createTreeMap(hierarchy)

    let movieTiles = hierarchy.leaves()
    

    let colorData = ['#00ff00', '#3399ff', '#ffff4d', '#ff471a', '#e68a00', '#ffb3ff', '#006699'];
    let categories = ['Action', 'Adventure', 'Comedy', 'Drama', 'Family', 'Animation', 'Biography'];

    
        
    let color = d3.scaleOrdinal()
                  .domain(['Action', 'Adventure', 'Comedy', 'Drama', 'Family', 'Animation', 'Biography'])
                  .range(['#00ff00', '#3399ff', '#ffff4d', '#ff471a', '#e68a00', '#ffb3ff', '#006699'])

    let block = canvas.selectAll('g')
                        .data(movieTiles)
                        .enter()
                        .append('g')
                        .attr('transform', d => {
                            return 'translate(' + d.x0 + ', ' + d.y0 +')'
                        })
                                                
    
    block.append('rect')
            .attr('class', 'tile')
            .style("stroke", "white")
            .style("fill", d => {
                return color(d.data.category)
            })
            .attr('width', d => {
                return d.x1 - d.x0 
            })
            .attr('height', d => { 
                return d.y1-d.y0 
            })
            .attr('data-name', d=> {
                return d.data.name
            })
            .attr('data-category', d => {
                return d.data.category
            })
            .attr('data-value', d => {
                return d.data.value
            })
            .on('mouseover', d => {
                tooltip.transition()
                       .style('visibility', 'visible')
                       
                       function numberWithCommas(x) {
                        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                       }

                let movieSales = numberWithCommas(d.data.value)
                
                tooltip.html(
                    movieSales + '$' + " - " + d.data.name
                )
                
                tooltip.attr('data-value', d.data.value)

            })
            .on('mouseout', d => {
                tooltip.transition()
                       .style('visibility', 'hidden')
            })





    block.append('text')
            .text(d => d.data.name)
            .attr('x', 2)
            .attr('y', 15)

    let g = d3.select("#legend")
              .attr('width', 700)
              .attr('height', 60)
              .append('g')
                            
            //   .attr('transform', 'translate(200, 520)');
              

    g.selectAll("rect")
      .data(colorData)
      .enter()
      .append('rect')
      .attr('class', 'legend-item')
      .attr('height', 30)
      .attr('width', 100)
      .attr('x', d => {
            if(d==='#00ff00'){
                return '0'
            }else if(d==='#3399ff'){
                return '100'
            }else if(d==='#ffff4d'){
                return '200'
            }else if(d==='#ff471a'){
                return '300'
            }else if(d==='#e68a00'){
                return '400'
            }else if(d==='#ffb3ff'){
                return '500'
            }else if(d==='#006699'){
                return '600'
            }
            })
        .attr('y', 10)
        .attr('fill', d=> d)
        
    g.selectAll('text')
            .data(categories)
            .enter()
            .append('text')
            .attr('x', d => {
                if(d==='Action'){
                    return '0'
                }else if(d==='Adventure'){
                    return '100'
                }else if(d==='Comedy'){
                    return '200'
                }else if(d==='Drama'){
                    return '300'
                }else if(d==='Family'){
                    return '400'
                }else if(d==='Animation'){
                    return '500'
                }else if(d==='Biography'){
                    return '600'
                }
                })
            .attr('y', 30)
            .attr('color', 'black')
            .text(d => d)
            .attr('font-size', 15)
            

            

       // g.call(d3.axisBottom)
            
    
}
//--


//--I fetch the datasets and instruct what to execute on load.
const req = new XMLHttpRequest();
req.open('GET', url, true);
req.onload = ()=> {
   
    let objmovieData = JSON.parse(req.responseText)
    movieData = objmovieData;
    
             
    drawTreeMap()
        
};
req.send();
//--
