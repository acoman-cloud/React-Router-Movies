import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

import SavedList from './Movies/SavedList';
import Movie from './Movies/Movie';
import MovieList from './Movies/MovieList';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies') // Study this endpoint with Postman
        .then(esp => {
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
          setMovieList(esp.data);
          //console.log(esp.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    // This is stretch. Prevent the same movie from being "saved" more than once
  };

  return (
    <div>
      <SavedList list={[]} />
      <Switch>
        <Route path="/movie/:id">
          <Movie />
        </Route>
        <Route path='/'>
          <MovieList movies={movieList} history={history} />
        </Route>
      </Switch>
    </div>
  );
}
