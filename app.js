$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText){
    // console.log(searchText)
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=6311057a&s=' + searchText)
    .then((response) => {
        // console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (home, movie) => {
            axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=6311057a&t=' + movie.Title)
            .then((response) => {
                console.log(response)
                let imdbRating = response.data.imdbRating;
                let description = response.data.Plot;
                output += `
                <div class = "card mb-3">
                    <div class = "well text-center">
                    <img src = "${movie.Poster}">
                    <h4>${movie.Title}</h4>
                    <h6>IMDb ⭐ ${imdbRating} <h6>
                    <h7>${description}</h7>
                    </div>
                    <a onclick = "movieSelected('${movie.Title}')" class = "btn btn-primary low-align" href = "https://www.imdb.com/title/${response.data.imdbID}/">Check IMDb</a>
                    
                </div>            
            `;

            $('#movies').html(output)
            })
        });
    })
    .catch((err) => {
        console.log(err);
    })
}

// function movieSelected(Title){
//     sessionStorage.setItem('Title', Title);
//     window.location = 'movie.html';
//     return false
// }

// function getMovie(){
//     let Title = sessionStorage.getItem('Title');
//     axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=6311057a&t=' + Title)
//     .then((response) => {
//         console.log(response);
//         let movie = response.data;
//         let output = `
//             <div class = "row">
//                 <div class = "col-md-1">
//                     <img src = "${movie.Poster}" class = "thumbnail">
//                 </div>
//                 <div class = "col-md-8">
//                 </div>
//             </div>
//         `;
//         $('#movie').html(output)

//         });

        
// }