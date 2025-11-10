// -------- Sidebar open and close ------------
const sidebar = document.getElementById("sidebar");
const toggleBtnOpen = document.getElementById("toggleBtnOpen");

document.getElementById("closeSidebar").addEventListener("click", () => {
  sidebar.classList.add("collapsed");
  toggleBtnOpen.classList.remove("d-none");
});

document.getElementById("openSidebar").addEventListener("click", () => {
  sidebar.classList.remove("collapsed");
  toggleBtnOpen.classList.add("d-none");
});

// -------- Timeline JS ------------
function toggleSubMenu(id, element) {
  document.querySelectorAll(".submenu").forEach((submenu) => {
    submenu.style.display = submenu.id === id && submenu.style.display !== "block" ? "block" : "none";
  });

  document.querySelectorAll(".menu-item").forEach((menuItem) => {
    menuItem.classList.toggle("active", menuItem === element);
  });
}

function activateTimeline(element) {
  document.querySelectorAll(".timeline li").forEach((el) => el.classList.remove("active"));
  element.classList.add("active");
}

// -------- Footer ------------
document.addEventListener("DOMContentLoaded", () => {
  const dynamicSidebar = document.getElementById("dynamicHeight");
  const footer = document.getElementById("footer");

  function checkFooterVisibility() {
    const footerRect = footer.getBoundingClientRect();
    dynamicSidebar.classList.toggle("sidebar-reduced", footerRect.top <= window.innerHeight);
  }

  window.addEventListener("scroll", checkFooterVisibility);
});

// -------- Navbar Dropdown ------------
document.addEventListener("DOMContentLoaded", () => {
  const navbarRight = document.querySelector(".navbar-right");
  const userDropdown = document.querySelector(".user-dropdown");

  const showDropdown = () => (userDropdown.style.display = "block");
  const hideDropdown = () => {
    setTimeout(() => {
      if (!userDropdown.matches(":hover") && !navbarRight.matches(":hover")) {
        userDropdown.style.display = "none";
      }
    }, 200);
  };

  navbarRight.addEventListener("mouseenter", showDropdown);
  userDropdown.addEventListener("mouseenter", showDropdown);
  navbarRight.addEventListener("mouseleave", hideDropdown);
  userDropdown.addEventListener("mouseleave", hideDropdown);
});

// -------- Tooltip ------------
document.addEventListener("DOMContentLoaded", () => {
  const tooltip = document.createElement("div");
  tooltip.className = "custom-tooltip";
  document.body.appendChild(tooltip);

  document.querySelectorAll("li[data-tooltip]").forEach((item) => {
    item.addEventListener("mouseenter", (event) => {
      const rect = item.getBoundingClientRect();
      tooltip.innerText = item.getAttribute("data-tooltip");
      tooltip.style.visibility = "visible";
      tooltip.style.opacity = "1";
      tooltip.style.left = `${rect.right + 10}px`;
      tooltip.style.top = `${rect.top + rect.height / 2 - tooltip.offsetHeight / 2}px`;
    });

    item.addEventListener("mouseleave", () => {
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = "0";
    });
  });
});