
// Função para buscar filmes da API do OMDb
async function getTopMovies(year) {
    const apiKey = '790af7bc'; // Substitua por sua chave
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=movie&type=movie&y=${year}&page=1`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('API response:', data); 
        if (data.Response === "True" && data.Search) {
            const movies = data.Search;
            const detailedMovies = await Promise.all(movies.map(async (movie) => {
                const movieDetailsUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`;
                const movieDetailsResponse = await fetch(movieDetailsUrl);
                return movieDetailsResponse.json();
            }));
            const sortedMovies = detailedMovies
                .filter(movie => movie.imdbRating && movie.imdbRating !== "N/A")
                .sort((a, b) => b.imdbRating - a.imdbRating)
                .slice(0, 10); 
            return sortedMovies;
        } else {
            console.error('No movies found for the specified year or Search property is missing in the API response');
            return []; 
        }
    } catch (error) {
        console.error('Error fetching top movies:', error);
        return []; 
    }
}


async function createRanking(year) {
    const movies = await getTopMovies(year);
    const rankingContainer = document.getElementById('ranking-container');

    if (!rankingContainer) {
        console.error('Ranking container not found');
        return;
    }

    rankingContainer.innerHTML = ''; 

    if (movies.length === 0) {
        rankingContainer.innerHTML = '<p>No movies found for the specified year.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieElement = createMovieElement(movie);
        rankingContainer.appendChild(movieElement);
    });
}


function createMovieElement(movie) {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-item');

    const titleElement = document.createElement('h3');
    titleElement.textContent = movie.Title;
    movieElement.appendChild(titleElement);

    const yearElement = document.createElement('p');
    yearElement.textContent = `Ano: ${movie.Year}`;
    movieElement.appendChild(yearElement);

    const ratingElement = document.createElement('p');
    ratingElement.textContent = `IMDb: ${movie.imdbRating}`;
    movieElement.appendChild(ratingElement);

    const posterElement = document.createElement('img');
    posterElement.src = movie.Poster;
    posterElement.alt = `Pôster de ${movie.Title}`;
    movieElement.appendChild(posterElement);

    return movieElement;
}

createRanking(2004);
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const inputText = document.getElementById('btnhome').value;
    window.location.href = `/result?input_text=${encodeURIComponent(inputText)}`;
});