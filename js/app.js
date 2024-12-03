// variables holding the DOM elements needed
const sections = document.querySelectorAll("section");
const navigationBarList = document.getElementById("navbar__list");

// Build the navigation menu
const buildNav = () => {
  sections[0].className = "active";
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
    if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
      // Add 'active' class to the section and highlight nav link
      section.classList.add("active");
      // Highlight the active navigation link
      navLink.style.backgroundColor = "black";
      navLink.style.color = "white";
      // Highlight the active section
      section.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      section.style.transition = "background-color 0.3s";
    } else {
      // Remove the highlight from the inactive section
      section.classList.remove("active");
      navLink.style.backgroundColor = "white";
      navLink.style.color = "black";
    }
  });
};


const scrollToSection = (event) => {
  if (event.target.tagName === "A") {
    event.preventDefault(); // Prevent default anchor jump behavior

    // Extract the target section ID from the href attribute
    const targetId = event.target.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetId);

    // Check if the target section exists
    if (targetSection) {
      // Scroll into view with smooth behavior
      targetSection.scrollIntoView({
        behavior: "smooth", // Smooth scrolling effect
        block: "end",     // Align to the start of the section
      });
    }
  }
};


// Event listeners:
document.addEventListener("scroll", setActiveSection); // update the highlight status on scrolling
navigationBarList.addEventListener("click", scrollToSection); // scroll to the section upon clicking its link

