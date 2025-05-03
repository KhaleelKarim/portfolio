import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';
import { fetchJSON, renderProjects } from '../global.js';

// Get the projects
const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');

// Make pie chart
let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

let projectsJSON = await fetchJSON('../lib/projects.json'); // fetch your project data
let rolledData = d3.rollups(
  projectsJSON,
  (v) => v.length,
  (d) => d.year,
);

console.log(rolledData)

let data = rolledData.map(([year, count]) => {
    return { value: count, label: year };
});
let sliceGenerator = d3.pie().value((d) => d.value);
let arcData = sliceGenerator(data);
let arcs = arcData.map((d) => arcGenerator(d));

let colors = d3.scaleOrdinal(d3.schemeTableau10);

arcs.forEach((arc, idx) => {
    d3.select('svg').append('path')
      .attr('d', arc).attr('fill', colors(idx));
});

// Create legend
let legend = d3.select('.legend');
data.forEach((d, idx) => {
  legend
    .append('li')
    .attr('style', `--color:${colors(idx)}`) // set the style attribute while passing in parameters
    .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`); // set the inner html of <li>
});

// Add search functionality
let query = '';

let searchInput = document.querySelector('.searchBar');

searchInput.addEventListener('change', (event) => {
  // update query value
  query = event.target.value;
  // TODO: filter the projects

  // TODO: render updated projects!
});