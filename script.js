let appId = 'e2a860a3a9584ef759207f1934070726'; 
//format is https://api.themoviedb.org/3/search/movie?api_key=e2a860a3a9584ef759207f1934070726&query=comedy
var genreSelected;

function searchMovie(genreSelected) {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${appId}&language=en-US&with_genres=${genreSelected}`).then(result => {
    return result.json();
  }).then(result => {
    init(result);
  })
};

var genres = {
  "28": "Action",
  "12": "Adventure",
  "16": "Animation",
  "35": "Comedy",
  "80": "Crime",
  "99": "Documentary",
  "18": "Drama",
  "10751": "Family",
  "14": "Fantasy",
  "36": "History",
  "27": "Horror",
  "10402": "Musical",
  "9648": "Mystery",
  "10749": "Romance",
  "878": "Science Fiction",
  "53": "Thriller"
};

//creates genre menu
Object.keys(genres).map(key => { 
  document.getElementById('genreSelect').innerHTML += '<a href="#" id="' + genres[key] + '">' + genres[key] + '</a>';
});

for (var i = 0, clicked = document.getElementById('genreSelect').children.length; i < clicked; i++)
{
    (function(clickGenre){
      document.getElementById('genreSelect').children[i].onclick = function(){
        //closes out the genre menu
        document.getElementById("genreSelect").classList.add("hide");
        //helps to retrieve genre key value from array
        genreSelected = Object.keys(genres)[clickGenre];
                  //sends information after the search button is clicked
                  document.getElementById('btn').addEventListener('click', () => {
                    parseInt(genreSelected);
                    if(genreSelected)
                      searchMovie(genreSelected);
                  });
          //console.log(genreSelected);
        }    
    })(i);
}

function init(movieResult) {
  console.log(movieResult);
  let randomMovie = movieResult.results[Math.floor(movieResult.results.length*Math.random())];
  //console.log(randomMovie);
  document.getElementById('mainMoviePoster').innerHTML = '<img src="https://image.tmdb.org/t/p/w500' + randomMovie.poster_path + '">';
  document.getElementById('mainMovieTitle').innerHTML = randomMovie.title;
  document.getElementById('mainMovieDate').innerHTML = randomMovie.release_date;
  document.getElementById('mainMovieRating').innerHTML = " | " + randomMovie.vote_average + "/10";
  document.getElementById('mainMovieDescription').innerHTML = randomMovie.overview;
}

function genreBtn() {
  document.getElementById("genreSelect").classList.remove("hide");
  document.getElementById("genreSelect").classList.toggle("show");
};