
//  Mobile menu 
var menuButton = document.querySelector(".menu-button");
var nav = document.querySelector("#site-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("open");
    document.body.classList.toggle("nav-open", isOpen);

    if (isOpen) {
      menuButton.setAttribute("aria-expanded", "true");
      menuButton.textContent = "Close";
    } else {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "Menu";
    }
  });
}

//  Menu category filters
var filterButtons = document.querySelectorAll(".filter-button");
var menuRows = document.querySelectorAll(".menu-card, .menu-row");
var galleryItems = document.querySelectorAll(".gallery-item");


function showCategory(category) {
  var i;

  for (i = 0; i < menuRows.length; i++) {
    if (category === "all" || menuRows[i].getAttribute("data-category") === category) {
      menuRows[i].classList.remove("is-hidden");
    } else {
      menuRows[i].classList.add("is-hidden");
    }
  }

  for (i = 0; i < galleryItems.length; i++) {
    if (category === "all" || galleryItems[i].getAttribute("data-category") === category) {
      galleryItems[i].classList.remove("is-hidden");
    } else {
      galleryItems[i].classList.add("is-hidden");
    }
  }
}

function setActiveButton(clicked) {
  var i;

  for (i = 0; i < filterButtons.length; i++) {
    filterButtons[i].classList.remove("is-active");
  }

  clicked.classList.add("is-active");
}

if (filterButtons.length > 0) {
  var b;

  for (b = 0; b < filterButtons.length; b++) {
    filterButtons[b].addEventListener("click", function () {
      var category = this.getAttribute("data-category");
      setActiveButton(this);
      showCategory(category);
    });
  }
}

//  Card view / table view toggle
var viewToggle = document.querySelector("#view-toggle");
var menuGrid = document.querySelector("#menu-grid");
var menuTable = document.querySelector(".menu-table-wrap");

if (viewToggle && menuGrid && menuTable) {
  viewToggle.addEventListener("click", function () {
    var showTable = menuTable.classList.contains("is-hidden");

    menuTable.classList.toggle("is-hidden", !showTable);
    menuGrid.classList.toggle("is-hidden", showTable);
    viewToggle.textContent = showTable ? "Card view" : "Table view";
  });
}

//  Contact form
var contactForm = document.querySelector("#contact-form");
var formMessage = document.querySelector("#form-message");


function isValidEmail(email) {
  var at = email.indexOf("@");
  var dot = email.lastIndexOf(".");
  return at > 0 && dot > at + 1 && dot < email.length - 1;
}

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.querySelector("#name").value.trim();
    var email = document.querySelector("#email").value.trim();
    var phone = document.querySelector("#phone").value.trim();
    var topic = document.querySelector("#topic").value;
    var note = document.querySelector("#message").value.trim();
    var reply = document.querySelector("input[name='reply']:checked");

    formMessage.className = "form-message error";

    if (name === "" || email === "" || topic === "" || note === "" || !reply) {
      formMessage.textContent = "Please fill in your name, email, topic, how we should reply, and a message.";
      return;
    }

    if (!isValidEmail(email)) {
      formMessage.textContent = "Please enter an email address like name@example.com.";
      return;
    }

    if (reply.value === "phone" && phone === "") {
      formMessage.textContent = "Please add a phone number so we can call you back.";
      return;
    }

    contactForm.classList.add("is-hidden");
    formMessage.className = "form-message";
    formMessage.textContent = "Thank you, " + name + ". We got your message and will reply soon.";
  });
}
