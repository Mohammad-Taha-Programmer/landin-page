// variables holding the DOM elements needed
const sections = document.querySelectorAll("section");
const navigationBarList = document.getElementById("navbar__list");

// Build the navigation menu
const buildNav = () => {
  const fragment = document.createDocumentFragment();
  sections.forEach(section => {
    const navItem = document.createElement("li");
    const navLink = document.createElement("a");

    // Set attributes and content
    navLink.href = `#${section.id}`;
    navLink.textContent = section.dataset.nav;
    navLink.setAttribute("data-nav", section.id);
    navLink.style.padding = "10px";
    navLink.style.margin = "5px";
    navLink.style.display = "inline-block";
    navLink.style.textDecoration = "none";
    navLink.style.color = "black";
    navLink.style.fontWeight = "bold";
    navLink.style.cursor = "pointer";
    navLink.style.transition = "background-color 0.3s, color 0.3s";

    navItem.appendChild(navLink);
    fragment.appendChild(navItem);
  });
  navigationBarList.appendChild(fragment);
};

window.addEventListener('DOMContentLoaded', buildNav);

// Add or remove 'active' styles for sections and navigation items
const setActiveSection = () => {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const navLink = document.querySelector(`a[data-nav="${section.id}"]`);
    if (rect.top >=0 && rect.top < window.innerHeight) {
      
      // Highlight the active section
      section.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      section.style.transition = "background-color 0.3s";

      // Highlight the active navigation link
      navLink.style.backgroundColor = "black";
      navLink.style.color = "white";
    } else {
      // Remove the highlight from the inactive section
      section.style.backgroundColor = "";
      navLink.style.backgroundColor = "";
      navLink.style.color = "black";
    }
  });
};

// Scroll to the section the user clicks
const scrollToSection = (event) => {
  if (event.target.tagName === "a") {
    const targetSection = document.querySelector(event.target.getAttribute("href")); // selecting the section the user clicks on using its href attribute
    targetSection.scrollIntoView();
  }
};

// Event listeners:
document.addEventListener("scroll", setActiveSection); // update the highlight status on scrolling
navigationBarList.addEventListener("click", scrollToSection); // scroll to the section upon clicking its link

