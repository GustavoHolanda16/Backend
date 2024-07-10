document.addEventListener('DOMContentLoaded', function() {
    function carregarFilmePadrao() {
        const apiKey = '790af7bc';
        const params = new URLSearchParams(window.location.search);
        const filmePadrao = params.get('input_text') || 'The Matrix';

        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${filmePadrao}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na solicitação. Código de status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.Response === 'True') {
                    exibirDetalhesDoFilme(data);
                } else {
                    exibirFilmeNaoEncontrado();
                }
            })
            .catch(error => console.error(`Erro na solicitação: ${error.message}`));
    }

    function exibirDetalhesDoFilme(data) {
        document.getElementById('poster').src = data.Poster;
        document.getElementById('titulo').textContent = data.Title;
        document.getElementById('sinopse').textContent = data.Plot;
        document.getElementById('genero').textContent = data.Genre;
        document.getElementById('duracao').textContent = data.Runtime;
        document.getElementById('lancamento').textContent = data.Year;
    }

    function exibirFilmeNaoEncontrado() {
        document.getElementById('poster').src = 'https://github.com/GustavoHolanda16/filmes/blob/main/img/image-removebg-preview.png?raw=true';
        document.getElementById('titulo').textContent = '';
        document.getElementById('sinopse').textContent = 'Filme não encontrado!';
        document.getElementById('genero').textContent = '';
        document.getElementById('duracao').textContent = '';
        document.getElementById('lancamento').textContent = '';
    }

    function buscar() {
        const apiKey = '790af7bc';
        const movieTitle = document.getElementById('movieTitle').value;

        if (!movieTitle) {
            alert('Por favor, insira o título do filme.');
            return;
        }

        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na solicitação. Código de status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.Response === 'True') {
                    exibirDetalhesDoFilme(data);
                } else {
                    exibirFilmeNaoEncontrado();
                }
            })
            .catch(error => console.error(`Erro na solicitação: ${error.message}`));
    }

    carregarFilmePadrao();
});
