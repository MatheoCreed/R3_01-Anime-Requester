fetch("../animes.json")
    .then(response => response.json())
    .then(data => {
        const animes = data.animes;

        animes.forEach(anime => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${anime.title}</h3>
                <img src="${anime.image}" alt="${anime.title}">
                <p>${anime.synopsis}</p>
            `;

            document.body.appendChild(card);
        });
    })