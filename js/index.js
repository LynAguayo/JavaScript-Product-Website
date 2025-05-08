/* -------------------------------------------------------------------
   SELECTORES DEL DOM 
------------------------------------------------------------------- */
const body = document.body;
const menuIcon = document.querySelector("#menu-icon");
const slideMenu = document.querySelector(".slide-menu");
const closeMenuIcon = document.querySelector(".slide-menu .close-icon");
const slideMenuItems = document.querySelectorAll(".slide-menu a");
const themeToggleInputHorizontal = document.getElementById("theme-toggle-input-horizontal");
const header = document.querySelector(".header");

/* -------------------------------------------------------------------
   MANEJO DEL TEMA (DARK/LIGHT)
------------------------------------------------------------------- */
function setTheme(theme) {
    if (theme === "dark") {
        body.classList.add("dark-theme");
        body.classList.remove("light-theme");
        localStorage.setItem("theme", "dark");
        themeToggleInputHorizontal.checked = false;
    } else {
        body.classList.add("light-theme");
        body.classList.remove("dark-theme");
        localStorage.setItem("theme", "light");
        themeToggleInputHorizontal.checked = true;
    }
}

const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

themeToggleInputHorizontal.addEventListener("change", function() {
    setTheme(this.checked ? "light" : "dark");
});

/* -------------------------------------------------------------------
   MENÚ HAMBURGUESA 
------------------------------------------------------------------- */
menuIcon.addEventListener("click", () => {
    slideMenu.classList.add("open");
    menuIcon.style.display = "none";
});

closeMenuIcon.addEventListener("click", () => {
    slideMenu.classList.remove("open");
    menuIcon.style.display = "block";
});

slideMenuItems.forEach(item => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        slideMenu.classList.remove("open");
        menuIcon.style.display = "block";

        const targetId = item.getAttribute("href");
        const target = document.querySelector(targetId);
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: "smooth"
            });
        }
    });
});

/* -------------------------------------------------------------------
   SLIDER/CARRUSEL 
------------------------------------------------------------------- */
let items = document.querySelectorAll(".slider .list .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let thumbnails = document.querySelectorAll(".thumbnail .item");
let countItem = items.length;
let itemActive = 0;

next.onclick = function () {
  itemActive = itemActive + 1;
  if (itemActive >= countItem) {
    itemActive = 0;
  }
  showSlider();
};

prev.onclick = function () {
  itemActive = itemActive - 1;
  if (itemActive < 0) {
    itemActive = countItem - 1;
  }
  showSlider();
};

// Auto-avance del slider cada 5 segundos
let refreshInterval = setInterval(() => {
  next.click();
}, 5000);

function showSlider() {
  let itemActiveOld = document.querySelector(".slider .list .item.active");
  let thumbnailActiveOld = document.querySelector(".thumbnail .item.active");
  itemActiveOld.classList.remove("active");
  thumbnailActiveOld.classList.remove("active");

  items[itemActive].classList.add("active");
  thumbnails[itemActive].classList.add("active");
  setPositionThumbnail();

  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    next.click();
  }, 5000);
}

function setPositionThumbnail() {
  let thumbnailActive = document.querySelector(".thumbnail .item.active");
  let rect = thumbnailActive.getBoundingClientRect();
  if (rect.left < 0 || rect.right > window.innerWidth) {
    thumbnailActive.scrollIntoView({ behavior: "smooth", inline: "nearest" });
  }
}

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    itemActive = index;
    showSlider();
  });
});

/* -------------------------------------------------------------------
   MANEJO DE COOKIES
------------------------------------------------------------------- */
const cookiePopup = document.getElementById("cookiePopup");
const acceptBtn = document.getElementById("acceptCookie");
const rejectBtn = document.getElementById("rejectCookie");
const cookieInfo = document.querySelector(".cookie-info");

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function checkCookie() {
    return document.cookie.split(';').some(item => item.trim().startsWith('cookieAccepted='));
}

function showCookiePopup() {
    if (!checkCookie()) {
        cookiePopup.classList.remove("hide");
        cookiePopup.classList.add("show");
    }
}

// Aceptar cookies
acceptBtn.addEventListener("click", () => {
    setCookie("cookieAccepted", "true", 365);
    cookiePopup.classList.add("hide");
    cookiePopup.classList.remove("show");
});

// Rechazar cookies
rejectBtn.addEventListener("click", () => {
    cookieInfo.classList.remove("hide");
    cookieInfo.classList.add("show");
    
    document.querySelector('.cookie-buttons').style.display = 'none';
    
    setTimeout(() => {
        cookiePopup.classList.add("hide");
        cookiePopup.classList.remove("show");
        cookieInfo.classList.add("hide");
        cookieInfo.classList.remove("show");
        
        document.querySelector('.cookie-buttons').style.display = 'flex';
    }, 5000);
});

// Muestra el popup al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(showCookiePopup, 1000);
});

/* -------------------------------------------------------------------
   FORMULARIO Y API
------------------------------------------------------------------- */
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Limpia mensajes de error previos
  document.getElementById('email-error').textContent = '';
  document.getElementById('password-error').textContent = '';
  document.getElementById('form-error').textContent = '';
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // Validación de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      document.getElementById('email-error').textContent = 'Por favor, introduce un email válido';
      return;
  }
  
  // Validación de contraseña
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
      document.getElementById('password-error').textContent = 
          'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número';
      return;
  }
  
  // Credenciales de demo 
  const validCredentials = (
      email === "user@lasalle.com" && 
      password === "Hola1234"
  );
  
  if (validCredentials) {
      document.getElementById('form').scrollIntoView({ behavior: 'smooth' });
      document.getElementById('users').classList.remove('hidden');
      fetchUsers();
  } else {
      document.getElementById('form-error').textContent = 
          'Credenciales incorrectas. Usa "user@lasalle.com" y "Hola1234" para demo';
  }
});

// Get usuarios de la API
function fetchUsers() {
  const usersContainer = document.getElementById('users-container');
  usersContainer.innerHTML = '<p>Cargando usuarios...</p>';
  
  fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
          usersContainer.innerHTML = '';
          
          users.forEach(user => {
              const userCard = document.createElement('div');
              userCard.className = 'user-card';
              userCard.innerHTML = `
                  <h3>${user.name}</h3>
                  <p class="user-email">📧 ${user.email}</p>
                  <p>📱 ${user.phone}</p>
                  <p>🏢 ${user.company.name}</p>
                  <p>🌐 ${user.website}</p>
                  <p>📍 ${user.address.street}, ${user.address.city}</p>
              `;
              usersContainer.appendChild(userCard);
          });
      })
      .catch(error => {
          usersContainer.innerHTML = `
              <p class="error-message">Error al cargar los usuarios. Intenta nuevamente más tarde.</p>
              <p>${error.message}</p>
          `;
      });
}