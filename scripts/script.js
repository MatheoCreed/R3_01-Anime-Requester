// 6f464de156msh2e28f7c658a93c0p103939jsnb8535fa80c55
// 98737f8120msh98dc51e460a9eb4p1ea886jsnb5d61cf7a012

const boutonTheme = document.getElementById("toggle-theme");
const filterTypeSelect = document.getElementById("filterType");
const genreListDiv = document.getElementById("genreList");
const scrollBtn = document.getElementById("boutonHaut");
const searchBar = document.getElementById("search");
let allAnimes = [];
let cleapisaisie = "";


if (localStorage.getItem("theme") === "sombre") {
  document.body.classList.add("themeSombre");
}

    window.onload = function() {
  const sauvegardecle = localStorage.getItem("apiKey");
  if (sauvegardecle) {
    cleapisaisie = sauvegardecle;
    alert("Clé API chargée.");
  } else {
    const saisie = prompt("Veuillez entrer votre clé API :");
    if (saisie !== null && saisie.trim() !== "") {
      cleapisaisie = saisie.trim();
      localStorage.setItem("apiKey", cleapisaisie);
      alert("Clé API enregistrée.");
    } else {
      alert("Aucune clé API saisie.");
    }
  }
};

boutonTheme.addEventListener("click", () => {
  document.body.classList.add("fade-transition");

  document.body.classList.toggle("themeSombre");
  const themeActuel = document.body.classList.contains("themeSombre") ? "sombre" : "clair";
  localStorage.setItem("theme", themeActuel);

  setTimeout(() => {
    document.body.classList.remove("fade-transition");
  }, 500);
});

function loadAnimes(query = "", callback) {
  fetch(`https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${query}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "anime-db.p.rapidapi.com",
      "x-rapidapi-key": cleapisaisie
    }
  })
    .then(res => res.json())
    .then(data => {
      allAnimes = data.data || [];
      if (callback) callback(allAnimes);
      else displayAnimes(allAnimes);
    })
    .catch(err => console.error("Erreur API :", err));
}

function loadAnimesById(id = "", callback) {
  fetch(`https://anime-db.p.rapidapi.com/anime/by-id/${id}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "anime-db.p.rapidapi.com",
      "x-rapidapi-key": cleapisaisie
    }
  })
    .then(res => res.json())
    .then(data => {
      allAnimes = [data];
      if (callback) callback(allAnimes);
      else displayAnimes(allAnimes);
    })
    .catch(err => console.error("Erreur API :", err));
}

function loadAnimesByRanking(rank = "", callback) {
  fetch(`https://anime-db.p.rapidapi.com/anime/by-ranking/${rank}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "anime-db.p.rapidapi.com",
      "x-rapidapi-key": cleapisaisie
    }
  })
    .then(res => res.json())
    .then(data => {
    allAnimes = [data];
    allAnimes = [data];
      if (callback) callback(allAnimes);
      else displayAnimes(allAnimes);
    })
    .catch(err => console.error("Erreur API :", err));
}


filterTypeSelect.addEventListener("change", () => {
  if (filterTypeSelect.value === "genre") {
    searchBar.style.display = "none";
    genreCheckboxes(); 
  } else {
    searchBar.style.display = "inline-block"; 
    genreListDiv.style.display = "none";
  }
});


function displayAnimes(animes) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (!animes || animes.length === 0) {
    container.innerHTML = "<p>Aucun anime trouvé.</p>";
    return;
  }

  animes.forEach(anime => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${anime.title}</h3>
      <img src="${anime.image}" alt="${anime.title}">
      <p><i class="fa-solid fa-layer-group"></i> <u>Genre :</u> ${anime.genres?.join(", ") || "?"}</p>
      <p><i class="fa-solid fa-ranking-star"></i> <u>Classement :</u> ${anime.ranking || "?"}</p>
      <p><i class="fa-solid fa-film"></i> <u>Episodes :</u> ${anime.episodes || "?"}</p>
      <p><i class="fa-solid fa-book"></i> <u>Synopsis :</u> ${anime.synopsis || "Pas de synopsis disponible."}</p>
    `;
    container.appendChild(card);
  });
}

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

let genre;
function genreCheckboxes() {
  fetch(`https://anime-db.p.rapidapi.com/genre`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "anime-db.p.rapidapi.com",
      "x-rapidapi-key": cleapisaisie
    }
  })
    .then(res => res.json())
    .then(data => {
      genre = data;
      const genreListDiv = document.getElementById("genreList");
      genreListDiv.innerHTML = "";
      genreListDiv.style.display = "grid";
      genreListDiv.style.gridTemplateColumns = "repeat(auto-fill, minmax(150px, 1fr))";
      genreListDiv.style.gap = "10px";

      genre.forEach(g => {
        const container = document.createElement("div");
        container.className = "genreItem";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = g._id;
        checkbox.className = "genreCheckbox";

        const label = document.createElement("label");
        label.setAttribute("for", g._id);
        label.textContent = g._id;

        container.appendChild(checkbox);
        container.appendChild(label);
        genreListDiv.appendChild(container);
      });
    })
    .catch(err => console.error("Erreur API :", err));
}


function loadAnimesByGenre() {
  
  const selectedGenres = [];
  const checkedBoxes = document.querySelectorAll('#genreList input[type="checkbox"]:checked');
  checkedBoxes.forEach(cb => selectedGenres.push(cb.id));
  let selectedGenresString = selectedGenres.join("%2C");
  //console.log(selectedGenres);

    fetch(`https://anime-db.p.rapidapi.com/anime?page=1&size=10&genres=${selectedGenresString}`, {
      method: "GET",
      headers: {
      "x-rapidapi-host": "anime-db.p.rapidapi.com",
      "x-rapidapi-key": cleapisaisie
      }
    })
     .then(res => res.json())
    .then(data => {
    allAnimes = data.data;
    displayAnimes(allAnimes);
    })
    .catch(err => console.error("Erreur API :", err));
  }



document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("search").value.trim();
  const filterType = document.getElementById("filterType").value;

  if (filterType === "title") loadAnimes(query);
  else if (filterType === "id") loadAnimesById(query);
  else if (filterType === "ranking") loadAnimesByRanking(query);
  else if (filterType === "genre") loadAnimesByGenre();
});