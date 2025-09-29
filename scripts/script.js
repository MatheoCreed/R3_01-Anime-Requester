const url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=Fullmetal&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '6086c83303msha21ced5cae2b469p13aae7jsn8eac00c91c09',
		'x-rapidapi-host': 'anime-db.p.rapidapi.com'
	}
};




async function fetchAndDisplayAnime() {
    try {
        const response = await fetch(url, options);
        const data = await response.json(); 
        if (data.data && data.data.length > 0) {
            data.data.forEach(anime => {
                const Titre = anime.title;
                const Synopsis = anime.synopsis;
                const Genres = anime.genres;
                const Classement = anime.ranking;
                const Episodes = anime.episodes;
                console.log("Tire : " + Titre + 
                    "\nSynopsis : " + Synopsis + 
                    "\nGenres : " + Genres + 
                    "\nClassement : " + Classement + 
                    "\nNombre d'épisodes : " + Episodes + 
                    "\n-----------------------------");
            });
        } else {
            console.log('Aucun anime trouvé.');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
}

fetchAndDisplayAnime();