let appId = 'APP_ID; 
let pageNumber;
let genreString;
let yearString;

function searchMovie() {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${appId}&language=en-US${genreString}${yearString}`).then(result => {
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

Object.keys(genres).map(key => { 
  document.getElementById('genreSelect').innerHTML += '<a href="#" id="' + genres[key] + '">' + genres[key] + '</a>';
});




for (var i = 0, clicked = document.getElementById('genreSelect').children.length; i < clicked; i++)
{
    (function(clickGenre){
      let genreSelected;
      document.getElementById('genreSelect').children[i].onclick = function(){
        document.getElementById("genreSelect").classList.add("hide");
        //helps to retrieve genre key value from array
        genreSelected = Object.keys(genres)[clickGenre];
        document.getElementById('genreBtn').innerHTML = Object.values(genres)[clickGenre] + ' &#8964;';

                  genreString = '&with_genres=' + parseInt(genreSelected);
                  searchMovie(genreString);
        }
    })(i);
}

for (var i = 0, clicked = document.getElementById('yearSelect').children.length; i < clicked; i++)
{
    (function(clickYear){
      document.getElementById('yearSelect').children[i].onclick = function(){
        document.getElementById("yearSelect").classList.add("hide");
        yearSelected = document.getElementById('yearSelect').children[clickYear].id;
        document.getElementById('yearBtn').innerHTML = yearSelected + ' &#8964;';
        let year;
        switch(yearSelected) {
            case yearSelected = "1950s":
            year = Math.floor(Math.random() * (1959 - 1950 + 1)) + 1950;
            break;
            case yearSelected = "1960s":
            year = Math.floor(Math.random() * (1969 - 1960 + 1)) + 1960;
            break;
            case yearSelected = "1970s":
            year = Math.floor(Math.random() * (1979 - 1970 + 1)) + 1970;
            break;
            case yearSelected = "1980s":
            year = Math.floor(Math.random() * (1989 - 1980 + 1)) + 1980;
            break;
            case yearSelected = "1990s":
            year = Math.floor(Math.random() * (1999 - 1990 + 1)) + 1990;
            break;
            case yearSelected = "2000s":
            year = Math.floor(Math.random() * (2009 - 2000 + 1)) + 2010;
            break;
            case yearSelected = "2010s":
            year = Math.floor(Math.random() * (2019 - 2010 + 1)) + 2010;
            break;
            case yearSelected = "2020s":
            year = 2020;
            break;
          }
          yearString = '&primary_release_year=' + year;
          searchMovie(yearString);
        }})(i);
};

function init(movieResult) {
  console.log(movieResult);
  let randomMovie = movieResult.results[Math.floor(movieResult.results.length*Math.random())];
  //console.log(randomMovie);
  document.getElementById('mainMoviePoster').innerHTML = '<img src="https://image.tmdb.org/t/p/w500' + randomMovie.poster_path + '" onError="noImg();">';
  document.getElementById('mainMovieTitle').innerHTML = randomMovie.title;
  document.getElementById('mainMovieDate').innerHTML = moment(randomMovie.release_date).format("MMM Do, YYYY");
  document.getElementById('mainMovieRating').innerHTML = " | " + randomMovie.vote_average + "/10";
  document.getElementById('mainMovieDescription').innerHTML = randomMovie.overview;
}

function genreBtn() {
  document.getElementById("genreSelect").classList.remove("hide");
  document.getElementById("genreSelect").classList.toggle("show");
};

function yearBtn() {
  document.getElementById("yearSelect").classList.remove("hide");
  document.getElementById("yearSelect").classList.toggle("show");
};

function noImg() {
  document.getElementById('mainMoviePoster').style.display = 'none';
};
