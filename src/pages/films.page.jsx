import { useState, useEffect } from "react";
import { filterFilmsByDirector } from "../helpers/film.helpers.js";
import { getUniqueListOf } from "../helpers/film.helpers.js";

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
      <ul>
        {/* Conditional Rendering */}
        {filmsByDirector.length > 0
          ? filmsByDirector.map((element) => {
              return (
                <li key={element.id}>
                  <p>
                    {element.title} ---- {element.rt_score}%
                  </p>
                  <img src={element.image} alt="Movie poster" />
                </li>
              );
            })
          : list.map((element) => {
              return (
                <li key={element.id}>
                  <p>
                    {element.title} ---- {element.rt_score}%
                  </p>
                  <img src={element.image} alt="Movie poster" />
                </li>
              );
            })}
      </ul>
    </div>
  );
}
