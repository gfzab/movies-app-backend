const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");






Movie.belongsToMany(Genre, { through : "MoviesGenres"} );
Genre.belongsToMany(Movie, { through : "MoviesGenres"} );

Movie.belongsToMany(Actor, {  through : "MoviesActors" });
Actor.belongsToMany(Movie, {  through : "MoviesActors" });

Director.belongsToMany(Movie, { through : "MoviesDirectors" });
Movie.belongsToMany(Director, { through : "MoviesDirectors" });

