console.log("IT'S ALIVE!");


function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1") ? "/" : "/portfolio/";

// All relevant pages and links
let pages = [
    {url: '', title: 'Home'},
    {url: 'resume/', title: 'Resume'},
    {url: 'projects/', title: 'Projects'},
    {url: 'contact/', title: 'Contact'},
];

// Create a nav tag for the pages
let nav = document.createElement('nav');
document.body.prepend(nav);

// Add hyperlinks to the nav bar
for (let p of pages) {
    let url = p.url;
    let title = p.title;

    if (!url.startsWith('http')) {
        url = BASE_PATH + url;
    }

    let a = document.createElement("a")
    a.href = url;
    a.textContent = title;
    nav.append(a);


    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add("current");
    }

}

// Adding light/dark mode choice
document.body.insertAdjacentHTML(
    'afterbegin',
    `
      <label class="color-scheme">
          Theme:
          <select>
              <option value="light dark">Automatic</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
          </select>
      </label>`,
  );



let select = document.querySelector("select")
select.addEventListener('input', function (event) {
    console.log('color scheme changed to', event.target.value);
    document.documentElement.style.setProperty('color-scheme', event.target.value);
    localStorage.colorScheme = event.target.value;
});

if (localStorage.colorScheme) {
    document.documentElement.style.setProperty('color-scheme', localStorage.colorScheme);
    select.value = localStorage.colorScheme;
}

// Getting JSON for my projects page
export async function fetchJSON(url) {
    try {
        // Fetch the JSON file from the given URL
        const response = await fetch(url);

        // In case of a bad response
        if (!response.ok) {
            throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching or parsing JSON data:', error);
    }
}

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
    // Check for empty projects
    if (projects.length === 0) {
        console.log("Empty projects list!")
    }

    // Make sure the div is found
    if (!containerElement) {
        console.log("Could not find projects div")
    }

    // Dynamically add information to the article element
    containerElement.innerHTML = '';
    for (let project of projects) {
        const article = document.createElement('article');
        article.innerHTML = `
        <${headingLevel}>${project.title}</${headingLevel}>
        <img src="${project.image}" alt="${project.title}">
        <p>${project.description}</p>
        `
        containerElement.appendChild(article)
    }

    // Change the title
    const projectTitle = document.querySelector(".projects-title")
    projectTitle.innerHTML = `${projects.length} Projects`
    
}

const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');