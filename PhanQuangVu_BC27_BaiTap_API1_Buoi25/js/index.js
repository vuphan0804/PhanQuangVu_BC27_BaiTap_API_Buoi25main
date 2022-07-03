window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  header.classList.toggle("sticky-header", window.scrollY > 0);
});
