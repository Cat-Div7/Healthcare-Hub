const dataObject = {
  en: { language: "English", switch: "Arabic" },
  ar: { language: "العربية", switch: "الانجليزي" },
};

const dropDownList = document.querySelector(".language-dropdown"); // Parent
const currentLangEl = document.querySelector(".current-lang"); // Current language element
const nextLangEl = document.querySelector(".next-lang"); // Next language element
const languageIcon = document.querySelector(".fa-angle-down"); // Small arrow icon

let currentLang = "en"; // Default language

// Set initial language text
dropDownList.addEventListener("click", async function (ele) {
  // Toggle the active class to the language icon & dropdown list
  this.classList.toggle("active-dropdown");
  languageIcon.classList.toggle("rotate-icon");
  // Toggle the display of the nested language list
  document
    .querySelector(".options li.language-dropdown ul")
    .classList.toggle("d-block");
  // Chech if dropdown is open
  if (
    document
      .querySelector(".options li.language-dropdown ul")
      .classList.contains("d-block")
  ) {
    dropDownList.style.borderRadius = "8px 8px 0 0";
  } else {
    dropDownList.style.borderRadius = "8px";
  }

  // Check if the clicked element is the change language button
  if (ele.target.classList.contains("next-lang")) {
    // Fetch data from data.json
    let response = await fetch("../data.json");
    let data = await response.json();

    if (response.ok && response.status === 200) {
      // Toggle language
      currentLang = currentLang === "en" ? "ar" : "en";

      // Update the change language button text
      currentLangEl.textContent = dataObject[currentLang].language;
      nextLangEl.textContent = dataObject[currentLang].switch;
      // Update navbar links
      const links = document.querySelectorAll(".links li a");
      data[currentLang].navbar.links.forEach((element, index) => {
        links[index].textContent = element.name;
      });

      // Update navbar options
      const options = document.querySelectorAll(".options li a");
      data[currentLang].navbar.options.forEach((element, index) => {
        options[index].textContent = element.name;
      });

      // Update Direction
      document.documentElement.setAttribute(
        "dir",
        currentLang === "ar" ? "rtl" : "ltr"
      );

      // Update language list
      const title = document.querySelector(".logo h3");
      title.textContent = data[currentLang].headTitle;
    }
  }
});

// Change background color on button click
document.querySelector(".change-bg-c").onclick = () => {
  const body = document.querySelector("body");
  const currentBg = body.style.backgroundColor;

  // Toggle background color
  if (currentBg === "var(--bg-dark)" || currentBg === "") {
    // Change to light mode
    body.style.backgroundColor = "var(--bg-light)";
    body.style.color = "black";
    // Add light mode class
    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
    // Update button text
    document.querySelector(".change-bg-c").textContent = "Dark Mode";
    // Set Color For dropDownList on light mode
    dropDownList.style.color = "var(--bg-dark)";
    // Change Register Button Color
    const registerButton = document.querySelector(".register");
    registerButton.classList.add("light-register");
    registerButton.classList.remove("register");
  } else {
    // Change to dark mode
    body.style.backgroundColor = "var(--bg-dark)";
    body.style.color = "white";
    // Add dark mode class
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
    // Update button text
    document.querySelector(".change-bg-c").textContent = "Light Mode";
    // Set Back Color For dropDownList on dark mode
    dropDownList.style.color = "var(--bg-light)";
    // Change Register Button Color
    const registerButton = document.querySelector(".light-register");
    registerButton.classList.add("register");
    registerButton.classList.remove("light-register");
  }
};
