// Main JavaScript entry point
console.log("Umbraco Frontend assets loaded successfully!");

// Dynamic Navbar scroll animation (Demo replica)
const navbar = document.getElementById("main-navbar");
if (navbar) {
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("nav-stuck");
      navbar.classList.remove("nav-floating");
    } else {
      navbar.classList.add("nav-floating");
      navbar.classList.remove("nav-stuck");
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
