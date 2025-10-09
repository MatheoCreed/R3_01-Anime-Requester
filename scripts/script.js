// 6f464de156msh2e28f7c658a93c0p103939jsnb8535fa80c55
// 98737f8120msh98dc51e460a9eb4p1ea886jsnb5d61cf7a012

const boutonTheme = document.getElementById("toggle-theme");
const filterTypeSelect = document.getElementById("filterType");
const genreListDiv = document.getElementById("genreList");
if (localStorage.getItem("theme") === "sombre") {
  document.body.classList.add("themeSombre");
}

boutonTheme.addEventListener("click", () => {
  document.body.classList.toggle("themeSombre");
  const themeActuel = document.body.classList.contains("themeSombre") ? "sombre" : "clair";
  localStorage.setItem("theme", themeActuel);
});

let allAnimes = [];

function loadAnimes(query = "", callback) {
  fetch(`https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${query}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "anime-db.p.rapidapi.com",
      "x-rapidapi-key": "6f464de156msh2e28f7c658a93c0p103939jsnb8535fa80c55"
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
      "x-rapidapi-key": "6f464de156msh2e28f7c658a93c0p103939jsnb8535fa80c55"
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
      "x-rapidapi-key": "6f464de156msh2e28f7c658a93c0p103939jsnb8535fa80c55"
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
        genreListDiv.style.display = "block"; 
    } else {
        genreListDiv.style.display = "none"; 
    }
});

/*
function loadAnimesByGenres(genres = "", callback) {
  fetch(`https://anime-db.p.rapidapi.com/${genres}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "anime-db.p.rapidapi.com",
      "x-rapidapi-key": "98737f8120msh98dc51e460a9eb4p1ea886jsnb5d61cf7a012"
    }
  })
    .then(res => res.json())
    .then(data => {
      allAnimes = [data];
      if (callback) callback(allAnimes);
      else displayAnimes(allAnimes);
    })
    .catch(err => console.error("Erreur API :", err));
}*/

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


const scrollBtn = document.getElementById("boutonHaut");



// Clique pour remonter en haut
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("search").value.trim();
  const filterType = document.getElementById("filterType").value;

  if (filterType === "title") loadAnimes(query);
  else if (filterType === "id") loadAnimesById(query);
  else if (filterType === "ranking") loadAnimesByRanking(query);
});


