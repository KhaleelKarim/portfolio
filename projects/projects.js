import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';
import { fetchJSON, renderProjects } from '../global.js';

// Get the projects
const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');



// Add search functionality
let query = '';

let searchInput = document.querySelector('.searchBar');


// Refactor all plotting into one function
function renderPieChart(projectsGiven) {

  let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
  // re-calculate rolled data
  let newRolledData = d3.rollups(
    projectsGiven,
    (v) => v.length,
    (d) => d.year,
  );
  // re-calculate data
  let newData = newRolledData.map(([year, count]) => {
    return { value: count, label: year };; // TODO
  });
  // re-calculate slice generator, arc data, arc, etc.
  let newSliceGenerator = d3.pie().value((d) => d.value);
  let newArcData = newSliceGenerator(newData);
  let newArcs = newArcData.map((d) => arcGenerator(d));
  // TODO: clear up paths and legends
  d3.select('.legend') // Select the <ul> element with the class "legend"
  .selectAll('li')   // Select all <li> elements inside it
  .remove();         // Remove all the selected <li> elements

  let newSVG = d3.select('svg');
  newSVG.selectAll('path').remove();;

  // update paths and legends, refer to steps 1.4 and 2.2
  let colors = d3.scaleOrdinal(d3.schemeTableau10);
  newArcs.forEach((arc, idx) => {
      d3.select('svg').append('path')
        .attr('d', arc).attr('fill', colors(idx));
  });

  // Create legend
  let newLegend = d3.select('.legend');
  newData.forEach((d, idx) => {
    newLegend
      .append('li')
      .attr('style', `--color:${colors(idx)}`) // set the style attribute while passing in parameters
      .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`); // set the inner html of <li>
  });

  
}

renderPieChart(projects);

searchInput.addEventListener('change', (event) => {
  // update query value
  query = event.target.value;

  // filter the projects
  let filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join('\n').toLowerCase();
    return values.includes(query.toLowerCase());
  });

  // TODO: render updated projects!
  renderProjects(filteredProjects, projectsContainer, 'h2');
  renderPieChart(filteredProjects);
  
});

// let selectedIndex = -1;

// let svg = d3.select('svg');
// svg.selectAll('path').remove();
// arcs.forEach((arc, i) => {
//   svg
//     .append('path')
//     .attr('d', arc)
//     .attr('fill', colors(i))
//     .on('click', () => {
//       // What should we do? (Keep scrolling to find out!)
//       selectedIndex = selectedIndex === i ? -1 : i;

//       svg
//         .selectAll('path')
//         .attr('class', (_, idx) => (
//           // TODO: filter idx to find correct pie slice and apply CSS from above
//           idx === selectedIndex ? 'highlighted' : ''
//         ));

//     });
    
// });
