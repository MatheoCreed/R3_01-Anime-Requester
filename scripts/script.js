fetch("https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=Fullmetal&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "anime-db.p.rapidapi.com",
        "x-rapidapi-key": "136c0c4dcdmsh920a3205050b6d3p164bb6jsn5e0e89c2aad1" // ⚠️ ta clé
      }
    })
    .then(response => response.json())
    .then(data => {

        data.data.forEach(anime => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${anime.title}</h3>
                <img src="${anime.image}" alt="${anime.title}">
                <p>${anime.synopsis}</p>
                <p>Genre : ${anime.genres.join(", ")}</p>
                <p>Classement : ${anime.ranking}</p>
                <p>Episodes : ${anime.episodes}</p>
            `;

            document.body.appendChild(card);
        });
    })