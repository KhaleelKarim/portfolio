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
