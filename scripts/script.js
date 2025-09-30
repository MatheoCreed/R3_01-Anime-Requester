// 6f464de156msh2e28f7c658a93c0p103939jsnb8535fa80c55

let allAnimes = [];

function loadAnimes(query = "", callback) {
  fetch(`https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${encodeURIComponent(query)}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "anime-db.p.rapidapi.com",
      "x-rapidapi-key": "98737f8120msh98dc51e460a9eb4p1ea886jsnb5d61cf7a012" // clé API
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

function displayAnimes(animes) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (animes.length === 0) {
    container.innerHTML = "<p>Aucun anime trouvé.</p>";
    return;
  }

  animes.forEach(anime => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${anime.image}" alt="${anime.title}">
      <div class="card-content">
        <h3>${anime.title}</h3>
        <p><strong>ID:</strong> ${anime._id || "N/A"} | <strong>Ranking:</strong> ${anime.ranking}</p>
        <p>${anime.synopsis}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("search").value.trim();
  const filterType = document.getElementById("filterType").value;

  if (filterType === "title") {
    loadAnimes(query);
  } else if (filterType === "id" || filterType === "ranking") {
    loadAnimes("", (results) => {
      const filtered = results.filter(anime => {
        if (filterType === "id") {
            console.log(anime._id.toString());
            console.log(query);
          return anime._id.toString() === query; 
        } else if (filterType === "ranking") {
          return anime.ranking.toString() === query;
        }
        return false;
      });
      displayAnimes(filtered);
    });
  }
});