# Movie Generator

A movie generator app that suggests a movie to watch using The Movie Database API (https://www.themoviedb.org/documentation/api).
Users can select a genre and/or a decade to choose from, and the results will be randomized.

### V3

* Added error message if user doesn't make a selection
* Added alt tags to images
* Implemented template literals

### V2

* Fixed mobile design. It is now more responsive
* Fixed navigation so it does not extend past screen in mobile
* Cleaned up CSS stylesheet
* Moved inline event handlers to script file
* Fixed image poster bug. Previously if a poster couldn't be retrieved from the movie data, it would not show up any posters thereafter and it would show up as an error on the console (image is null)
* Fixed navigation bug to clear dropdown selection after selecting search
* Fixed 0/10 bug on reviews. It used to show up as "0" if the movie had no data for the rating. Now, the rating won't be a part of the display if it does not exist
* Fixed undefined error if only one genre was selected instead of a genre and a decade
* Added genres to result
* Added image to start page with
* Added "All" for genre and year dropdowns
* Initially, the app would only pull from the 1st page of the results from the API, so many of the same movies would show up since there were only ~20 movie options to choose from. Now, the app fetches the results, randomizes the page number, then fetches a random movie from that random page number. 

### V1

* Created script, stylesheet, and index.html files
* Pulled from The Movie Database API to show a randomized movie result based on: decade and genre

#### To-do:

* Initialize web page with something better
* View more movie results (only displays first 10,000 results and first 500 pages for "All" selection)
* Add more intuitive UX to show that they can select genre OR decade. Currently, I can click on one versus the other and still have a result show up
