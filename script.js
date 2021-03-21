let apiKey = 'e2a860a3a9584ef759207f1934070726';
let genreString = "";
let yearString = "";
let pageNumber = "";

//Retrieve genre clicked
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
  "53": "Thriller",
  "100000": "All"
};

Object.keys(genres).map(key => {
  document.getElementById('genreSelect').innerHTML += `<a href="#" id="${genres[key]}">${genres[key]}</a>`;
});

for (var i = 0; i < document.getElementById('genreSelect').children.length; i++) {
  (function (clickGenre) {
    let genreSelected;
    document.getElementById('genreSelect').children[i].onclick = function () {
      document.getElementById("genreSelect").classList.add("hide");
      if (Object.values(genres)[clickGenre] == "All") {
        document.getElementById('genreBtn').innerHTML = "All";
        genreString = "";
      } else {
        genreSelected = Object.keys(genres)[clickGenre];
        document.getElementById('genreBtn').innerHTML = Object.values(genres)[clickGenre];
        genreString = '&with_genres=' + parseInt(genreSelected);
      }
      document.getElementById('genreBtn').classList.remove('error');
      searchMovie(genreString);
    }
  })(i);
}

//Retrieve decade clicked
for (var i = 0; i < document.getElementById('yearSelect').children.length; i++) {
  (function (clickYear) {
    document.getElementById('yearSelect').children[i].onclick = function () {
      document.getElementById("yearSelect").classList.add("hide");
      decade = document.getElementById('yearSelect').children[clickYear].id;
      document.getElementById('yearBtn').innerHTML = decade;
      switch (decade) {
        case decade = "1950s":
          yearString = '&primary_release_year=' + (Math.floor(Math.random() * (1959 - 1950 + 1)) + 1950).toString();
          break;
        case decade = "1960s":
          yearString = '&primary_release_year=' + (Math.floor(Math.random() * (1969 - 1960 + 1)) + 1960).toString();
          break;
        case decade = "1970s":
          yearString = '&primary_release_year=' + (Math.floor(Math.random() * (1979 - 1970 + 1)) + 1970).toString();
          break;
        case decade = "1980s":
          yearString = '&primary_release_year=' + (Math.floor(Math.random() * (1989 - 1980 + 1)) + 1980).toString();
          break;
        case decade = "1990s":
          yearString = '&primary_release_year=' + (Math.floor(Math.random() * (1999 - 1990 + 1)) + 1990).toString();
          break;
        case decade = "2000s":
          yearString = '&primary_release_year=' + (Math.floor(Math.random() * (2009 - 2000 + 1)) + 2010).toString();
          break;
        case decade = "2010s":
          yearString = '&primary_release_year=' + (Math.floor(Math.random() * (2019 - 2010 + 1)) + 2010).toString();
          break;
        case decade = "2020s":
          yearString = '&primary_release_year=' + (Math.floor(Math.random() * (2021 - 2020 + 1)) + 2020).toString();
          break;
        case decade = "All":
          yearString = "";
          break;
      }
      document.getElementById('yearBtn').classList.remove('error');
      searchMovie(yearString);
    }
  })(i);
};

//Display results after clicking search

function emptySearch(event) {
  event.preventDefault();
  if (document.getElementById('genreBtn').innerHTML === "Genre") {
    document.getElementById('genreBtn').classList.add('error');
  }
  if (document.getElementById('yearBtn').innerHTML === "Year") {
    document.getElementById('yearBtn').classList.add('error');
  }
}

function searchMovie() {
  document.getElementById('btn').addEventListener('click', (event) => {
    if (document.getElementById('genreBtn').innerHTML === "Genre" || document.getElementById('yearBtn').innerHTML === "Year") {
      emptySearch(event);
    } else {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US${genreString}${yearString}`)
        .then((initialurl) => initialurl.json())
        .then(initialresult => {
          pageNumber = '&page=' + Math.floor(Math.random() * (initialresult.total_pages + 1));
          fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US${genreString}${yearString}${pageNumber}`)
            .then((completedurl) => completedurl.json())
            .then(completedresult => {
              document.getElementById('main-movie_default').style.display = "none";
              document.getElementById('genreBtn').innerHTML = "Genre";
              document.getElementById('yearBtn').innerHTML = "Year";
              displayMovie(completedresult);
            })
        })
    }
  });
};

document.getElementById('btn').addEventListener('click', (event) => {
  if (document.getElementById('genreBtn').innerHTML === "Genre" || document.getElementById('yearBtn').innerHTML === "Year") {
    emptySearch(event);
  }
});

function displayMovie(movieResult) {
  let randomMovie = movieResult.results[Math.floor(movieResult.results.length * Math.random())];
  if (randomMovie.poster_path !== null) {
    document.getElementById('main-movie_poster').style.display = 'block';
    document.getElementById('main-movie_poster').innerHTML = `<img src="https://image.tmdb.org/t/p/w500${randomMovie.poster_path}" alt="${randomMovie.title}" >`;
  }
  else {
    document.getElementById('main-movie_poster').style.display = 'none';
  }
  document.getElementById('main-movie_title').innerHTML = randomMovie.title;
  document.getElementById('main-movie_date').innerHTML = moment(randomMovie.release_date).format("MMM Do, YYYY");
  if (randomMovie.vote_average !== 0) {
    document.getElementById('main-movie_rating').innerHTML = ` | ${randomMovie.vote_average}/10`;
  } else {
    document.getElementById('main-movie_rating').innerHTML = "";
  }

  var allGenres = "";

  //Run nested map to produce list of genres for this movie
  Object.entries(genres).map(
    function ([id, genre]) {
      randomMovie.genre_ids.map(
        function (genre_id) {
          if (id == genre_id) {
            allGenres += '<span class="main-movie_genre">' + genre + '</span>';
            document.getElementById('main-movie_genres').innerHTML = allGenres;
          }
        });
    });

  document.getElementById('main-movie_description').innerHTML = randomMovie.overview;
}

//Navigation changes
document.getElementById('genreBtn').onclick = function genreBtn() {
  document.getElementById("genreSelect").classList.remove("hide");
  document.getElementById("genreSelect").classList.toggle("show");
};
document.getElementById('yearBtn').onclick = function yearBtn() {
  document.getElementById("yearSelect").classList.remove("hide");
  document.getElementById("yearSelect").classList.toggle("show");
};