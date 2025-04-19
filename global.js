console.log("IT'S ALIVE!");


function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

// // All links in <a> tags within a <nav> tag
// let navLinks = $$("nav a")

// // Finds the link of the current page by checking host and path
// let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname
// );

// // Add current class to this link being careful to avoid an error
// if (currentLink) {
//     currentLink.classList.add("current");
// }


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

 