import { useState, useEffect } from "react";
import {
  filterFilmsByDirector,
  getUniqueListOf,
  getFilmStats,
} from "../helpers/film.helpers.js";
import { Link } from "react-router-dom";

export default function FilmsPage(props) {
  //set up two variables, one called list, and the other called setList which is a function
  //and set list's initial value to be an empty array
  const [list, setList] = useState([]);
  const [searchDirector, setSearchDirector] = useState("");

  function getFilms() {
    //Consuming the promise
    //1.    .then()
    //or 2. async/await
    fetch("https://ghibliapi.herokuapp.com/films")
      .then((res) => {
        return res.json();
      })
      .then((films) => {
        console.log(films);
        //Update the state
        setList(films);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //Effectively componentDidMount
  //and it's all thanks to the dependency array []
  useEffect(() => {
    getFilms();
  }, []);

  //Derived state
  const filmsByDirector = filterFilmsByDirector(list, searchDirector);
  const directors = getUniqueListOf(list, "director");
  const { avg_score, total, latest } = getFilmStats(list);

  return (
    <div>
      <h1>Studio Ghibli Films</h1>
      <form>
        <div className="form-group">
          <label htmlFor="searchDirectorSelect">Select Directors: </label>
          <select
            name="searchDirectorSelect"
            id="searchDirectorSelect"
            value={searchDirector}
            onChange={(e) => {
              setSearchDirector(e.target.value);
            }}
          >
            <option value="">All</option>
            {/* Add options for each director */}
            {directors.map((directorName, index) => {
              return (
                <option key={`${directorName}${index}`} value={directorName}>
                  {directorName}
                </option>
              );
            })}
          </select>
        </div>
      </form>
      <div>
        <div>
          <span># Of Films: </span>
          <span>{total}</span>
        </div>
        <div>
          <span>Average Rating: </span>
          <span>{avg_score.toFixed(2)}</span>
        </div>
        <div>
          <span>Latest Film: </span>
          <span>{latest}</span>
        </div>
      </div>
      <ul>
        {/* Conditional Rendering */}
        {filmsByDirector.length > 0
          ? filmsByDirector.map((film) => {
              return (
                <li key={film.id}>
                  <Link to={`film/${film.id}`}>
                    {film.title} ---- {film.rt_score}%
                  </Link>
                  <img src={film.image} alt="Movie poster" />
                </li>
              );
            })
          : list.map((film) => {
              return (
                <li key={film.id}>
                  <Link to={`film/${film.id}`}>
                    {film.title} ---- {film.rt_score}%
                  </Link>
                  <img src={film.image} alt="Movie poster" />
                </li>
              );
            })}
      </ul>
    </div>
  );
}
