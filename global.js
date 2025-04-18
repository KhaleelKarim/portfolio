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
console.log(`The base path rn is: ${BASE_PATH}`);
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
        console.log(`url for ${title} is ${url}`);
    }

    nav.insertAdjacentHTML('beforeend', `<a href="${url}">${title}</a>`);
}

 