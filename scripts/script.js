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
        // Vérifie si des résultats existent
        if (data.data && data.data.length > 0) {
            data.data.forEach(anime => {
                console.log(`Titre : ${anime.title}`);
                console.log(`Synopsis : ${anime.synopsis}`);
                console.log(`catégories : ${anime.genres}`)
                console.log(`Classement : ${anime.ranking}`);
                console.log(`Nombre d'épisodes : ${anime.episodes}`);
                console.log('-----------------------------');
            });
        } else {
            console.log('Aucun anime trouvé.');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
}

fetchAndDisplayAnime();