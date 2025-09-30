fetch("https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=Fullmetal&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "anime-db.p.rapidapi.com",
        "x-rapidapi-key": "6086c83303msha21ced5cae2b469p13aae7jsn8eac00c91c09" 
      }
    })
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("results");
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

            container.appendChild(card);
        });
    })

const boutonTheme = document.getElementById("toggle-theme");

if (localStorage.getItem("theme") === "sombre") {
  document.body.classList.add("themeSombre");
}

boutonTheme.addEventListener("click", () => {
  document.body.classList.toggle("themeSombre");
  const themeActuel = document.body.classList.contains("themeSombre") ? "sombre" : "clair";
  localStorage.setItem("theme", themeActuel);
});