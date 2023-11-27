window.onload = function () {
    // Cookie Acceptance
    function setCookie(name, value, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
  
    function getCookie(name) {
      var nameEQ = name + "=";
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
          return cookie.substring(nameEQ.length, cookie.length);
        }
      }
      return null;
    }
  
    function eraseCookie(name) {
      document.cookie = name + "=; Max-Age=-99999999; path=/";
    }
  
    function hideCookieNotice() {
      var cookieNotice = document.getElementById("cookie-notice");
      cookieNotice.style.display = "none";
    }
  
    function showCookieNotice() {
      var cookieNotice = document.getElementById("cookie-notice");
      cookieNotice.style.display = "block";
    }
  
    function acceptCookies() {
      setCookie("cookieAccepted", "true", 30); // Set cookie for 30 days
      hideCookieNotice();
      initializeData();
    }
  
    function declineCookies() {
      eraseCookie("cookieAccepted");
      hideCookieNotice();
      initializeData();
    }
  
    function checkCookieAccepted() {
      var cookieAccepted = getCookie("cookieAccepted");
      if (!cookieAccepted) {
        showCookieNotice();
      } else {
        initializeData();
      }
    }
  
    // Event Listeners
    document.addEventListener("DOMContentLoaded", checkCookieAccepted);
  
    var acceptBtn = document.querySelector("#cookie-notice .btn-container button.accept");
    if (acceptBtn) {
      acceptBtn.addEventListener("click", acceptCookies);
    }
  
    var declineBtn = document.querySelector("#cookie-notice .btn-container button.decline");
    if (declineBtn) {
      declineBtn.addEventListener("click", declineCookies);
    }
  
    // Data Handling
    var adatok = [];
  
    var listaElem = document.getElementById("adatok-listaja");
  
    function adatKiirasa() {
      listaElem.innerHTML = "";
      for (var i = 0; i < adatok.length; i++) {
        let adatElem = document.createElement("li");
        adatElem.classList.add("lista-elem");
        adatElem.innerText = adatok[i];
  
        let torlesGomb = document.createElement("button");
        torlesGomb.innerText = "Delete";
        torlesGomb.dataset.index = i;
        torlesGomb.onclick = function () {
          var index = parseInt(this.dataset.index);
          adatok.splice(index, 1);
          adatKiirasa();
          adatokMentese();
        };
  
        adatElem.appendChild(torlesGomb);
        listaElem.appendChild(adatElem);
      }
    }
  
    function adatHozzaadasa(ujAdat) {
      adatok.push(ujAdat);
      adatKiirasa();
      adatokMentese();
    }
  
    function adatokMentese() {
      if (getCookie("cookieAccepted")) {
        localStorage.setItem("adatok", JSON.stringify(adatok));
      }
    }
  
    function initializeData() {
      if (getCookie("cookieAccepted")) {
        if (localStorage.getItem("adatok")) {
          adatok = JSON.parse(localStorage.getItem("adatok"));
        }
        adatKiirasa();
      }
    }
  
    // Load the saved data from localStorage if available
    initializeData();
  
    // Sortable List
    $(listaElem).sortable({
      containment: "parent",
      items: ".lista-elem",
      connectWith: "#adatok-listaja > li",
      tolerance: "pointer",
      delay: 100,
      update: adatokMentese,
    }).disableSelection();
  
    listaElem.addEventListener("touchmove", function (event) {
      $(listaElem).sortable("disable");
    });
  
    listaElem.addEventListener("touchend", function (event) {
      setTimeout(function () {
        $(listaElem).sortable("enable");
      }, 500);
    });
  
    // Add Button
    var hozzaadGomb = document.getElementById("hozzaad-gomb");
    hozzaadGomb.addEventListener("click", function () {
      var adatInput = document.getElementById("adat-input");
      var ujAdat = adatInput.value.trim();
      if (ujAdat !== "") {
        adatHozzaadasa(ujAdat);
        adatInput.value = "";
      }
    });
  
    // Input Field Enter Key
    var adatInput = document.getElementById("adat-input");
    adatInput.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        var ujAdat = adatInput.value.trim();
        if (ujAdat !== "") {
          adatHozzaadasa(ujAdat);
          adatInput.value = "";
        }
      }
    });
  
    // Clear All Button
    var torolGomb = document.getElementById("torol-gomb");
    torolGomb.addEventListener("click", function () {
      adatok = [];
      adatKiirasa();
      adatokMentese();
    });
  };
  